import { SetMultimap } from '@teppeis/multimaps'
import debug, { IDebugger } from 'debug'
import Highland from 'highland'
import { acquireLock } from './queue'
import { WithBlockchainResults, WithIDs } from './typedcsvread'

/**
 * A type for extracting dependency IDs from the stub
 * @param stub the stub to extract dependency IDs from
 * @param idx the index of the dependency stream to extract the dependency IDs for.
 *        idx=0 means the first dependency stream, idx=1 means the second, etc.
 */
export type StubDependencyIDExtractor<StubType extends WithIDs> = (stub: StubType, idx: number) => string[]

/**
 * A type for executing the transaction for the stub.
 * @param stub the stub
 * @param dependencyBlockchainIDs an array of arrays
 *        such that dependencyBlockchainIDs[i] contains the "blockchain IDs"
 *        (the IDs returned from the blockchain transaction receipts)
 *        for the ith dependency stream.
 */
export type ExecutionFunction<StubType extends WithIDs,
  OutType extends WithBlockchainResults<any>> = (stub: StubType, dependencyBlockchainIDs: string[][]) => Promise<OutType>

/**
 * Interface for a merge context.
 * There are two scenarios that the code in this file can support:
 *   1. Batching
 *      - You have one "automation component" and input CSV file for each smart contract function.
 *      - You can batch together all calls to a smart contract function
 *        (assuming the dependent calls have already been done).
 *      - You can probably organize reports/papers describing your contracts
 *        as a series of logical phases that can be batched in the automation script.
 *        - Example:
 *          - Rows of CSV file X may depend on rows of CSV file Y
 *          - You could execute all rows of CSV file Y
 *            before executing a row of CSV file X.
 *      - In this case, use the merge method.
 *   2. Line By Line
 *      - You have one "automation component" and input CSV file for each smart contract function.
 *      - You cannot batch together all calls to a smart contract function
 *        (assuming the dependent calls have already been done).
 *        - Example:
 *          - Rows of CSV file X may depend on rows of CSV file Y
 *          - You need to execute the nth row of CSV file Y
 *            before executing the nth row of CSV file X.
 *          - You need to execute the nth row of CSV file X
 *            before executing the (n+1)th row of CSV file Y.
 *      - In this case:
 *        1. Number your stub IDs to start at 1
 *        2. In CSV File X in between your header and actual data:
 *           1. Make comment lines (start with #):
 *              - Explain that the first row is a "no-op row"
 *              - Add a "do not delete" warning (deleting no-op row = dead or live lock)
 *           2. Make a "no-op row" with all zeros.
 *           3. After the "no-op row" make a comment
 *              that indicates the actual data lines are about to begin.
 *        3. In CSV File Y:
 *           - First row depends on CSV File X no-op row
 *           - Subsequent rows depend on CSV File X actual data
 *        4. yContext = createContext for Y
 *           - Leave the following arrays empty:
 *             - dependencyTypeNames
 *             - dependenciesStreams
 *           - stubDependencyIDExtractor:
 *             - Add another conditional to handle the (to be added later) dependency on CSV File X
 *               to ensure that the nth row of X executes before the n+1th row of Y.
 *             - Example: if your conditionals just return one thing and don't check idx:
 *               - if(idx == 0) return what you did before
 *               - else return what you would for the dependency on CSV File X
 *             - Example: if your conditionals check multiple dependencies through an if elseif else:
 *               - if(idx == 0) return what you did before
 *               - else if (idx == 1) return what you did before
 *               - ...
 *               - else if (idx == k) return what you did before
 *               - else return what you would for the dependency on CSV File X.
 *        5. xStream = merge function with CSV File X
 *           - Pass yContext.stream in dependenciesStreams
 *           - Pass the result type for yContext in dependencyTypeNames
 *           - stubDependencyIDExtractor:
 *             - Program the function to handle the "no-op row" correctly:
 *               - If it extracts a dependency ID of 0, do not add anything to the returned array.
 *               - If it extracts a nonzero dependency ID, add the dependency ID to the returned array.
 *           - executionFunction:
 *             - Program the function to handle the "no-op row" correctly:
 *               - If the ID of the stub is 0:
 *                 - don't execute the contract call
 *                 - return something with everything set to 0 and no receipt
 *               - If the ID of the stub is nonzero do the normal work.
 *        6. Make copies of the xStream with tee
 *        7. Write the X Results CSV file with one of the tee outputs
 *        8. Use addToContext to add the relevant info from xContext to yContext:
 *           - use one of the tee outputs as the dependencyStream
 *        9. Call doTheMerging with yContext to get the yStream
 *        10. Write the Y Results CSV file with the yStream
 */
export interface Context<StubType extends WithIDs,
  DependencyType extends WithIDs,
  OutType extends WithBlockchainResults<any>> extends MergeOptions<StubType, DependencyType, OutType> {
  /**
   * The debugger
   */
  mDebugger: IDebugger,

  key: string,

  /**
   * stubIDsToPreExistingDependencyIDs[i] is a Multimap<string, string>
   *  - Key: ID from the stub
   *  - Value: IDs from dependenciesStreams[i] that must be executed already.
   */
  stubIDsToPreExistingDependencyIDs: Array<SetMultimap<string, string>>,

  /**
   * preExistingDependencyIDsToStubIDs[i] is a Multimap<string, string>
   * that is the reverse direction of stubIDsToPreExistingDependencyIDs[i]
   *  - Key: ID from the dependency
   *  - Value: IDs from the stubs that depend on the key
   */
  preExistingDependencyIDsToStubIDs: Array<SetMultimap<string, string>>,

  /**
   * preExistingDependencyIDsToBlockchainIDs[i] is a Map<string, string>
   *  - Key: The ID from the dependency
   *  - Value: The ID that the blockchain returned after executing the dependency
   */
  preExistingDependencyIDsToBlockchainIDs: Array<Map<string, string>>,

  /**
   * Key: ID of the stub to be executed
   * Value: The stub to be executed
   */
  stubIDsToStubs: Map<string, StubType>,

  /**
   * The stream on which the output will be returned.
   */
  stream: Highland.Stream<OutType>,

  /**
   * The set of stubs currently running
   */
  runningStubIDs: Set<string>,

  /**
   * Tells whether the stubs have ended
   */
  stubsEnded: boolean,

  /**
   * Tells whether the dependency streams have ended
   */
  dependenciesEnded: boolean[],

  /**
   * If true, the stream had an error and needed to abort.
   */
  isAborted: boolean
}

/**
 * Interface for the initial options for populating a Context.
 */
export interface MergeOptions<StubType extends WithIDs,
  DependencyType extends WithIDs,
  OutType extends WithBlockchainResults<any>> {
  /**
   * The name of the stub type
   */
  stubTypeName: string,

  /**
   * The names of the dependency types
   */
  dependencyTypeNames: string[],

  /**
   * The name of the output type
   */
  outTypeName: string,

  /**
   * The function that does the work
   */
  executionFunction: ExecutionFunction<StubType, OutType>,

  /**
   * Extracts dependency IDs from the stub.
   */
  stubDependencyIDExtractor: StubDependencyIDExtractor<StubType>,

  /**
   * The stream of stubs
   */
  stubsStream: Highland.Stream<StubType>,

  /**
   * The streams of dependencies.
   */
  dependenciesStreams: Array<Highland.Stream<DependencyType>>
}

/**
 * Interface for adding an additional dependency stream to the context later.
 * It is assumed that the functions that operate on stubs in the context
 * (e.g. executionFunction, stubDependencyIDExtractor)
 * already know of the to-be-added dependency's existence.
 */
export interface AddOptions<DependencyType extends WithIDs> {
  dependencyTypeName: string,
  dependencyStream: Highland.Stream<DependencyType>
}

function endContextIfAble<
  StubType extends WithIDs,
  DependencyType extends WithIDs,
  OutType extends WithBlockchainResults<any>
  > (context: Context<StubType, DependencyType, OutType>): void {
  acquireLock(context.key).then((releaser) => {
    if (context.isAborted) {
      context.mDebugger('endContextIfAble: already aborted')
      releaser()
      return
    }
    if (!context.stubsEnded) {
      context.mDebugger('endContextIfAble: still input')
      releaser()
      return
    }
    if (context.stubIDsToStubs.size) {
      context.mDebugger('endContextIfAble: still enqueued stubIDs size %o', context.stubIDsToStubs.size)
      releaser()
      return
    }
    if (context.runningStubIDs.size) {
      context.mDebugger('endContextIfAble: still runningStubIDs size %o', context.runningStubIDs.size)
      releaser()
      return
    }
    context.mDebugger('endContextIfAble: ending')
    context.stream.end()
    releaser()
  })
}

function runStubIfAble<
  StubType extends WithIDs,
  DependencyType extends WithIDs,
  OutType extends WithBlockchainResults<any>
  > (stubID: string, context: Context<StubType, DependencyType, OutType>) {
  acquireLock(context.key).then((releaser) => {
    const stub = context.stubIDsToStubs.get(stubID)
    if (!stub) {
      releaser()
      return
    }

    context.mDebugger('runStubIfAble: stubID: %s', stubID)
    for (let idx = 0; idx < context.dependenciesStreams.length; idx++) {
      const dependencyIDs = Array.from(
        context.stubIDsToPreExistingDependencyIDs[idx].get(stubID)
      )
      context.mDebugger('runStubIfAble: stubID: %s, dependencyIDs: %o, idx: %d', stubID, dependencyIDs, idx)
      const allHere = dependencyIDs.every((dependencyID) => {
        return context.preExistingDependencyIDsToBlockchainIDs[idx].has(dependencyID)
      })
      if (!allHere) {
        context.mDebugger('runStubIfAble: allHere fail: %s, idx: %d', stubID, idx)
        releaser()
        return
      }
    }

    context.mDebugger('runStubIfAble: stubID: %s', stubID)
    context.runningStubIDs.add(stubID)
    const blockchainIDs: string[][] = []

    for (let i = 0; i < context.dependenciesStreams.length; i++) {
      const sourceDependencyIDs: string[] = context.stubDependencyIDExtractor(
        stub, i
      )
      const destDependencyIDs: string[] = sourceDependencyIDs.map((dependencyID) => {
        const destID = context.preExistingDependencyIDsToBlockchainIDs[i].get(dependencyID)
        return destID || ''
      })
      blockchainIDs.push(destDependencyIDs)
    }
    context.stubIDsToStubs.delete(stubID)
    context.mDebugger('runStubIfAble: launching %s with args %o', stubID, blockchainIDs)
    releaser() // it is ok at this point to release as the data structure mods will be done.
    context.executionFunction(
      stub, blockchainIDs
    ).then(
      ((result) => {
        context.mDebugger('runStubIfAble: stubID %s completed', stubID)
        return context.stream.write(result)
      }),
      ((e) => {
        context.mDebugger('runStubIfAble: stubID %s error %o', stubID, e)
        context.isAborted = true
        context.stream.emit('error', e)
        return Promise.resolve()
      })
    ).then(() => {
      context.runningStubIDs.delete(stubID)
      context.mDebugger('runStubIfAble: stubID %s removing from queue', stubID)
      endContextIfAble(context)
    }).catch((e) => {
      context.runningStubIDs.delete(stubID)
      context.mDebugger('runStubIfAble: stubID %s wtf %o', stubID, e)
      endContextIfAble(context)
    })
  })
}

function onDependency<
  StubType extends WithIDs,
  DependencyType extends WithIDs,
  OutType extends WithBlockchainResults<any>
  > (
  result: DependencyType,
  context: Context<StubType,
    DependencyType, OutType>,
  idx: number
) {
  const dependencyID = result.id
  const blockchainID = result.blockchainID
  context.mDebugger(
    'onDependency: dependencyID: %s, blockchainID: %s, idx: %d',
    dependencyID, blockchainID, idx
  )
  context.preExistingDependencyIDsToBlockchainIDs[idx].set(dependencyID, blockchainID)
  context.preExistingDependencyIDsToStubIDs[idx].forEach((stubID) => {
    runStubIfAble(stubID, context)
  })
}

function onStub<
  StubType extends WithIDs,
  DependencyType extends WithIDs,
  OutType extends WithBlockchainResults<any>
  > (input: StubType, context: Context<StubType, DependencyType, OutType>) {
  const stubID = input.id
  context.mDebugger(
    'onStub: stubID: %s', stubID
  )
  for (const idx of context.stubIDsToPreExistingDependencyIDs.keys()) {
    const dependencyIDs: string[] = context.stubDependencyIDExtractor(input, idx)
    dependencyIDs.forEach((dependencyID) => {
      context.preExistingDependencyIDsToStubIDs[idx].put(dependencyID, stubID)
      context.stubIDsToPreExistingDependencyIDs[idx].put(stubID, dependencyID)
    })
  }
  context.stubIDsToStubs.set(stubID, input)
  runStubIfAble(stubID, context)
}

function onStubsEnd<
  StubType extends WithIDs,
  DependencyType extends WithIDs,
  OutType extends WithBlockchainResults<any>
  > (context: Context<StubType, DependencyType, OutType>) {
  context.mDebugger('onStubsEnd')
  context.stubsEnded = true
  endContextIfAble(context)
}

function onStubsError<
  StubType extends WithIDs,
  DependencyType extends WithIDs,
  OutType extends WithBlockchainResults<any>
  > (context: Context<StubType, DependencyType, OutType>, e: Error) {
  context.mDebugger('onStubsError: %o', e)
  context.stubsEnded = true
  if (e) {
    context.isAborted = true
    context.stream.emit('error', e)
  } else {
    endContextIfAble(context)
  }
}

function onDependenciesEnd<
  StubType extends WithIDs,
  DependencyType extends WithIDs,
  OutType extends WithBlockchainResults<any>
  > (context: Context<StubType, DependencyType, OutType>, idx: number) {
  context.mDebugger('onDependenciesEnd')
  context.dependenciesEnded[idx] = true
  endContextIfAble(context)
}

function onDependenciesError<
  StubType extends WithIDs,
  DependencyType extends WithIDs,
  OutType extends WithBlockchainResults<any>
  > (context: Context<StubType, DependencyType, OutType>, e: Error, idx: number) {
  context.mDebugger('onDependenciesError: %o', e)
  context.dependenciesEnded[idx] = true
  if (e) {
    context.isAborted = true
    context.stream.emit('error', e)
  } else {
    endContextIfAble(context)
  }
}

/**
 * Creates a context.
 * @param opts merge options
 * @return the context.
 */
export function createContext<
  StubType extends WithIDs,
  DependencyType extends WithIDs,
  OutType extends WithBlockchainResults<any>
  > (
  opts: MergeOptions<StubType, DependencyType, OutType>
): Context<StubType, DependencyType, OutType> {
  const key = 'merge:' + opts.stubTypeName +
    ':' + opts.dependencyTypeNames.join(',') +
    ':' + opts.outTypeName
  return {
    ...opts,
    dependenciesEnded: new Array(
      opts.dependenciesStreams.length
    ).fill(false),
    isAborted: false,
    key,
    mDebugger: debug(key),
    preExistingDependencyIDsToBlockchainIDs: new Array(
      opts.dependenciesStreams.length
    ).fill(1).map(u => new Map()),
    preExistingDependencyIDsToStubIDs: new Array(
      opts.dependenciesStreams.length
    ).fill(1).map(u => new SetMultimap()),
    runningStubIDs: new Set(),
    stream: Highland<OutType>(),
    stubIDsToPreExistingDependencyIDs: new Array(
      opts.dependenciesStreams.length
    ).fill(1).map(u => new SetMultimap()),
    stubIDsToStubs: new Map(),
    stubsEnded: false
  }
}

/**
 * Adds a dependency to the context.
 * @param ctx the context to add to
 * @param addOpts the dependency to add
 * @return the modified context
 */
export function addToContext<
  StubType extends WithIDs,
  DependencyType extends WithIDs,
  OutType extends WithBlockchainResults<any>
  > (
  ctx: Context<StubType, DependencyType, OutType>,
  addOpts: AddOptions<DependencyType>
): Context<StubType, DependencyType, OutType> {
  // add information from user
  ctx.dependenciesStreams.push(addOpts.dependencyStream)
  ctx.dependencyTypeNames.push(addOpts.dependencyTypeName)

  // increase size of internal arrays
  ctx.dependenciesEnded.push(false)
  ctx.preExistingDependencyIDsToBlockchainIDs.push(new Map())
  ctx.preExistingDependencyIDsToStubIDs.push(new SetMultimap())
  ctx.stubIDsToPreExistingDependencyIDs.push(new SetMultimap())

  // change debugger to reflect dependency inclusion
  ctx.mDebugger = debug(
    'merge:' + ctx.stubTypeName +
    ':' + ctx.dependencyTypeNames.join(',') +
    ':' + ctx.outTypeName
  )

  // return
  return ctx
}

/**
 * Does the actual merge work.
 */
export function doTheMerging<
  StubType extends WithIDs,
  DependencyType extends WithIDs,
  OutType extends WithBlockchainResults<any>
  > (context: Context<StubType, DependencyType, OutType>): Highland.Stream<OutType> {
  for (const [idx, dependencyStream] of context.dependenciesStreams.entries()) {
    dependencyStream.on('error', (e: Error) => {
      onDependenciesError(context, e, idx)
    }).each((dependency: DependencyType) => {
      onDependency(dependency, context, idx)
    }).done(() => {
      onDependenciesEnd(context, idx)
    })
  }
  context.stubsStream.on('error', (e: Error) => {
    onStubsError(context, e)
  }).each((stub) => {
    onStub(stub, context)
  }).done(() => {
    onStubsEnd(context)
  })
  return context.stream
}

/**
 * The all-in-one function for executing a batched merge.
 */
export function merge<
  StubType extends WithIDs,
  DependencyType extends WithIDs,
  OutType extends WithBlockchainResults<any>
  > (opts: MergeOptions<StubType, DependencyType, OutType>): Highland.Stream<OutType> {
  return doTheMerging(createContext(opts))
}
