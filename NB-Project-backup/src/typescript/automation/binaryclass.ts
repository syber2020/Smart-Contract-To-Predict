
// START COPYING HERE.
// Debugger
import debug from 'debug'
const myDebugger = debug('main')
myDebugger.enabled = true

import fs from 'fs'

// Extract Arguments
myDebugger('arguments %o', process.argv)

// @ts-ignore
// tslint:disable-next-line
const networkURL = process.argv[2] // e.g. your infura http url
// @ts-ignore
// tslint:disable-next-line
const mnemonic = process.argv[3] // e.g. your mnemonic
// @ts-ignore
// tslint:disable-next-line
const inputFile = process.argv[4]
// @ts-ignore
// tslint:disable-next-line

const outputFile = process.argv[5]

const gasUsageFile = process.argv[6]

const timeFile = process.argv[7]

myDebugger('through arg extraction')

// Universal Provider Wrapper Imports
import {
    DataEventTranslator,
    NotificationEventTranslator,
    ProviderWrapper,
    StandardProvider,
    SubscriptionIDEventTranslator,
    SubscriptionMethodEventTranslator
} from '@nsl/promised-web3-requestmanager'

// Underlying Provider Imports
// @ts-ignore
import HDWalletProvider from 'truffle-hdwallet-provider'
// @ts-ignore
// tslint:disable-next-line
const SubscriptionSubprovider = require('web3-provider-engine/subproviders/subscriptions.js')

// Create Underlying Provider
// @ts-ignore
const ethereumProvider = new HDWalletProvider(
  mnemonic,
  networkURL,
  0,
  1
)
myDebugger('through underlying provider creation')

// https://github.com/MetaMask/provider-engine/issues/248
// https://github.com/trufflesuite/truffle-hdwallet-provider/blob/master/index.js
// Add Subscriptions to Underlying Provider
// @ts-ignore
const subscriptionSubprovider = new SubscriptionSubprovider()
// @ts-ignore
subscriptionSubprovider.on('data', (err, notification) => {
  // @ts-ignore
  ethereumProvider.engine.emit('data', err, notification)
})
// @ts-ignore
ethereumProvider.engine.addProvider(subscriptionSubprovider)
myDebugger('through subscription edit')

// Reorder the Subproviders so that Subscriptions Come First
// (from index.js constructor code of HDWalletProvider - look for this.engine.addProvider calls)
// providers[0] is a hooked subprovider for the hdwallet stuff
// providers[1] is a subprovider for ensuring the nonces are in sync
// providers[2] is a filters subprovider (that does ?????)
// providers[3] is the actual HTTP provider
// providers[4] is the subscriptionsSubprovider you just added above.
// We need to make sure that the subscriptions subprovider goes before http one.
// @ts-ignore
const tmp = ethereumProvider.engine._providers[3]
// @ts-ignore
ethereumProvider.engine._providers[3] = ethereumProvider.engine._providers[4]
// @ts-ignore
ethereumProvider.engine._providers[4] = tmp
myDebugger('through provider swap')

// Create the Universal Provider Wrapper.
const ethereumRequestManager = new ProviderWrapper(ethereumProvider)
ethereumRequestManager.addRequestSendListener(
  new NotificationEventTranslator(ethereumRequestManager)
)
ethereumRequestManager.addRequestSendListener(
  new SubscriptionIDEventTranslator(ethereumRequestManager)
)
ethereumRequestManager.addRequestSendListener(
  new SubscriptionMethodEventTranslator(ethereumRequestManager)
)
ethereumRequestManager.addRequestSendListener(
  new DataEventTranslator(ethereumRequestManager)
)
myDebugger('through ethereumRequestManager')

// ContractCache class for managing contract instances.
import {
  ContractCache,
  ContractCreator,
  EthereumProviderProps
} from './ContractsCache'
myDebugger('through ContractsCache imports')
const ethOpts: EthereumProviderProps = {
  ethereumProvider,
  ethereumProviderName: 'hdwallet',
  ethereumRequestManager: ethereumRequestManager as StandardProvider
}
myDebugger('through ethOpts')
ContractCache.setProps(ethOpts)
myDebugger('through ContractCache setProps')
// END COPYING HERE

// BEGIN ADJUST TO TASTE COPYING HERE
// Declare variables to hold the instances of your contracts
// Example:
import {
  BinaryClass, ///from current folder of /src/typscript/contract
  BinaryClassTransactionReceipt  //classes from the generated typscript wrapper
} from '../contracts/BinaryClass'
import { Eth } from 'web3x-es/eth'   //for interacting blockchain
const binaryClassCreator: ContractCreator<BinaryClass> = (eth: Eth, address?: Address) => {
  try {
    return Promise.resolve(
      new BinaryClass(eth, address)
    )
  } catch (e) {
    return Promise.reject(e)
  }
}
const binaryClassCache: ContractCache<BinaryClass> = ContractCache.getInstance(
  'BinaryClass', binaryClassCreator
)
let inst: BinaryClass | undefined   ///What does this line mean
myDebugger('through BinaryClass')
// END ADJUST TO TASTE COPYING HERE

// BEGIN COPYING HERE
// functions for reading and writing files
function readFile(fileName: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf-8', (err: any, data: string) => {
        err ? reject(err) : resolve(data)
    });
  })
}
function writeFile(fileName: string, contents: string): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, contents, 'utf-8', (err: any) => {
      err ? reject(err) : resolve()
    })
  })
}
function appendFile(fileName: string, contents: string): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.appendFile(fileName, contents, 'utf-8', (err: any) => {
      err ? reject(err) : resolve()
    })
  })
}
myDebugger('through writeFile, readFile')
// END COPYING HERE

// BEGIN ADJUST TO TASTE COPYING HERE.
// For storing an address
import { Address } from 'web3x-es/address'
let sendingAddress: Address = Address.ZERO //calls a blank address () .zero is a static instance of address from address that contains all 0s

// For measuring time
import { getMostPreciseTimeInSecondsSinceUnixEpoch } from './utils/time'

// These may or may not apply to you.

let rows: string = ''
let splitRows: string[] = []
let splitCol0: string[] = []
let splitCol1: string[] = []
let splitCol2: string[] = []
let start =0
let end =0
let diff =0
// END ADJUST TO TASTE COPYING HERE

// BEGIN COPYING HERE
// Detect how to talk to the truffle hdwallet-provider
myDebugger('discovering send method')
// tslint:disable-next-line
ethereumRequestManager.discoverCorrectSendMethod().then(() => { // method to keep poking hdwallet to find out what is the send method and with promise
  myDebugger.enabled = true
  myDebugger('discovered correct send method')
  return Promise.resolve()
}).then(() => {
  // END COPYING HERE
  return readFile(inputFile)
}).then((_rows: string) => {
  myDebugger('got rows %o', _rows)
  rows = _rows
  splitRows = rows.split('\r\n')
  return binaryClassCache.getSendingAddress()
}).then((_addr: Address) => {
  myDebugger('got address %o', _addr)
  sendingAddress = _addr
  return binaryClassCache.getOrCreateContractForCurrentNetwork()
}).then((_inst: BinaryClass) => {
  // do something with instance of contract
  myDebugger('got BinaryClass instance')
  inst = _inst
  splitCol0 = splitRows[0].split(',')

  return Promise.resolve()
}).then(() => {
  // get latencies
  const x1 = splitCol0[0]
  const x2 = splitCol0[1]
  const x3 = splitCol0[2]
  const x4 = splitCol0[3]
  const v1 = splitCol0[4]
  const v2 = splitCol0[5]
  const v3 = splitCol0[6]
  const v4 = splitCol0[7]
  const m1 = splitCol0[8]
  const m2 = splitCol0[9]
  const m3 = splitCol0[10]
  const m4 = splitCol0[11]

  // send
  myDebugger('send1 time %o', getMostPreciseTimeInSecondsSinceUnixEpoch())
  start = getMostPreciseTimeInSecondsSinceUnixEpoch()
  return inst.methods.a_getparameters1(
    x1,x2,x3,x4,v1,v2,v3,v4,m1,m2,m3,m4
  ).send({
    from: sendingAddress,
    gas: 1000000
  }).getReceipt()
}).then((rcpt: BinaryClassTransactionReceipt) => {
  // print output
  myDebugger('recv1 time %o', getMostPreciseTimeInSecondsSinceUnixEpoch())
  end = getMostPreciseTimeInSecondsSinceUnixEpoch()
  diff = end - start
  //myDebugger('recv1 rcpt %o', rcpt)
  appendFile(timeFile, String(diff))
  appendFile(timeFile, '\n')
  appendFile(gasUsageFile, String(rcpt.gasUsed))
  appendFile(gasUsageFile, '\n')
  // get latencies
  splitCol1 = splitRows[1].split(',')
  const x1 = splitCol1[0]
  const x2 = splitCol1[1]
  const x3 = splitCol1[2]
  const x4 = splitCol1[3]
  const v1 = splitCol1[4]
  const v2 = splitCol1[5]
  const v3 = splitCol1[6]
  const v4 = splitCol1[7]
  const m1 = splitCol1[8]
  const m2 = splitCol1[9]
  const m3 = splitCol1[10]
  const m4 = splitCol1[11]

  // send
  myDebugger('send2 time %o', getMostPreciseTimeInSecondsSinceUnixEpoch())
  start = getMostPreciseTimeInSecondsSinceUnixEpoch()

  return inst.methods.b_getparameters2(
    x1,x2,x3,x4,v1,v2,v3,v4,m1,m2,m3,m4
  ).send({
    from: sendingAddress,
    gas: 1000000
  }).getReceipt()
}).then((rcpt: BinaryClassTransactionReceipt) => {
  // print output
  end = getMostPreciseTimeInSecondsSinceUnixEpoch()
  diff = end - start

  myDebugger('recv2 time %o', getMostPreciseTimeInSecondsSinceUnixEpoch())
 // myDebugger('recv2 rcpt %o', rcpt)
  appendFile(timeFile, String(diff))
  appendFile(timeFile, '\n')
  appendFile(gasUsageFile, String(rcpt.gasUsed))
  appendFile(gasUsageFile, '\n')
  // get latencies
  splitCol2 = splitRows[2].split(',')
  const prior0 = splitCol2[0]
  const prior1 = splitCol2[1]

  // send
  myDebugger('send3 time %o', getMostPreciseTimeInSecondsSinceUnixEpoch())
  start = getMostPreciseTimeInSecondsSinceUnixEpoch()

  return inst.methods.e_exponent(
    prior0,prior1
  ).send({
    from: sendingAddress,
    gas: 1000000
  }).getReceipt()
}).then((rcpt: BinaryClassTransactionReceipt) => {
  // print output
  end = getMostPreciseTimeInSecondsSinceUnixEpoch()
  diff = end - start
  //myDebugger('recv1 rcpt %o', rcpt)
  appendFile(timeFile, String(diff))
  appendFile(timeFile, '\n')
  myDebugger('recv3 time %o', getMostPreciseTimeInSecondsSinceUnixEpoch())
  //myDebugger('recv3 rcpt %o', rcpt)
  appendFile(gasUsageFile, String(rcpt.gasUsed))
  appendFile(gasUsageFile, '\n')
  // perform call
  return inst.methods.f_compare().call()
}).then((bestPath: string) => {
  myDebugger('best path %o', bestPath)
  appendFile(outputFile,',')
  return  appendFile(outputFile, bestPath)
  // START COPYING HERE.
}).then(() => {
  myDebugger('all done')
  process.exit(0)
}).catch((e) => {
  myDebugger.enabled = true
  myDebugger('something bad happened %o', e)
  process.exit(1)
})
// END COPYING HERE.
