
import { TransactionReceipt } from 'web3x-es/formatters'
import parse from 'csv-parse'
import debug from 'debug'
import * as fs from 'fs'
import Highland from 'highland'

// These are arrays in case a logical transaction
// had to be split across multiple functions because of solidity limitations.
export interface WithTimes {
  startTimesInSecondsSinceUnixEpoch: number[],
  receiptTimesInSecondsSinceUnixEpoch: number[]
}

// These are arrays in case a logical transaction
// had to be split across multiple functions because of solidity limitations.
export interface WithBlockchainResults<T extends TransactionReceipt<any>> extends WithIDs, WithTimes {
  transactionReceipts?: T[]
}

export interface WithIDs {
  /**
   * The ID from the CSV file
   */
  id: string,

  /**
   * The ID from the blockchain. May or may not have special meaning.
   */
  blockchainID: string,

  /**
   * The index of the address of the entity to run the transaction as
   * This is assumed to be the same for all actual txns inside this logical txn.
   */
  runAsAddressIndex: string,

  /**
   * The gas prices.
   * Array in case logical txn split into multiple functions due to solidity limits.
   */
  gasPrices?: string,

  /**
   * The max gas allowed
   * Array in case logical txn split into multiple functions due to solidity limits.
   */
  gasLimits?: string
}

/**
 * Reads data from a CSV file.
 * One of the columns MUST be "id"
 * The first row MUST be column names
 * The encoding MUST be utf-8
 * You are responsible for ensuring the columns actually conform to the expected type.
 * @param fileName
 */
export function readCSV<T extends WithIDs> (fileName: string): Highland.Stream<T> {
  // Create logger
  const mDebug = debug('automation:typedcsvread:' + fileName)
  // Read file
  const srcStream = fs.createReadStream(
    fileName,
    {
      encoding: 'utf8'
    }
  )
  // Transform file
  const csvStream = parse({
    columns: true,
    comment: '#',
    skip_empty_lines: true
  })
  // Propagate errors
  srcStream.on('error', (e: Error) => {
    mDebug('srcStream onError %o', e)
    csvStream.emit('error', e)
    csvStream.emit('end')
  })
  const highlandStream = Highland<T>(csvStream)
  // Return
  const retStream = highlandStream.map((item: T) => {
    // initialize blockchainID to be the same as CSV file ID
    item.blockchainID = item.id
    return item
  })
  srcStream.pipe(csvStream)
  return retStream
}
