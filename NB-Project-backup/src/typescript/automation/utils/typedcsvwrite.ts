import debug from 'debug'
import * as fs from 'fs'
import Highland from 'highland'

// @ts-ignore
import stringify, { StringifyOpts } from 'csv-stringify'
import { TransactionReceipt } from 'web3x-es/formatters'
import {parseArray} from './array'
import { WithBlockchainResults } from './typedcsvread'

function getSum (total: number, num: number): number {
  return total + num
}

function formatItem<R extends TransactionReceipt<any>, T extends WithBlockchainResults<R>> (value: T): object {
  const retObj: any = Object.assign({}, value)
  // suppress all txnReceipt except for approved things
  delete retObj.transactionReceipts
  if (value.transactionReceipts) {
    retObj.transactionHashes = value.transactionReceipts.map(
      rcpt => rcpt.transactionHash
    ).join(',')
    retObj.blockHashes = value.transactionReceipts.map(
      rcpt => rcpt.blockHash
    ).join(',')
    retObj.gasUsed = value.transactionReceipts.map(
      rcpt => rcpt.gasUsed
    ).reduce(getSum, 0)
    retObj.gasLimit = parseArray(value.gasLimits || '').map(
      limit => parseFloat(limit)
    ).reduce(getSum, 0)
  }
  retObj.startTimesInSecondsSinceUnixEpoch = value.startTimesInSecondsSinceUnixEpoch.map(
    tme => tme.toString()
  ).join(',')
  retObj.receiptTimesInSecondsSinceUnixEpoch = value.receiptTimesInSecondsSinceUnixEpoch.map(
    tme => tme.toString()
  ).join(',')
  return retObj
}

export function writeCSV<R extends TransactionReceipt<any>, T extends WithBlockchainResults<R>> (source: Highland.Stream<T>, fileName: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // Create logger
    const mDebug = debug('automation:typedcsvread:' + fileName)
    // Create destination stream
    const destStream = fs.createWriteStream(
      fileName,
      {
        encoding: 'utf8'
      }
    )
    // propagate events to promise
    destStream.on('finish', () => {
      resolve()
    })
    destStream.on('error', (error) => {
      mDebug('destStream onError %o', error)
      reject(error)
    })

    // create CSV stream
    const opts: StringifyOpts = {
      header: true,
      quoted: true,
      quotedEmpty: true
    }
    const csvStream = stringify(opts)
    // propagate CSV output to destination
    csvStream.pipe(destStream)
    // Propagate errors
    csvStream.on('error', (e: Error) => {
      mDebug('csvStream onError %o', e)
      destStream.emit('error', e)
      destStream.end()
    })

    // create highland wrapper
    const highlandNodeStream = source.map(
      formatItem
    ).toNodeStream({
      objectMode: true
    })
    // propagate to CSV stream
    highlandNodeStream.pipe(csvStream)
    // propagate errors
    highlandNodeStream.on('error', (e: Error) => {
      mDebug('highlandNodeStream onError %o', e)
      csvStream.emit('error', e)
      csvStream.end()
    })
  })
}
