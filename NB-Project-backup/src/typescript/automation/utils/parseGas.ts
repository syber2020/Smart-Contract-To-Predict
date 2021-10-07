import { parseArray } from './array'
import { WithIDs } from './typedcsvread'

import { debug } from 'debug'

// gasLimit is max gas for an actual txn
// gasPrice is the wei to pay per unit of gas for that txn

export interface ParseGasResult {
  gasLimits: number[],
  gasPrices: number[]
}

export interface SerializeGasResult {
  gasLimits: string,
  gasPrices: string
}

export interface ParseGasOptions {
  defaultGasLimit: number,
  defaultGasPrice: number
  numActualTxns: number
}

const mDebugger = debug('parseGas')
mDebugger.enabled = true

const DefaultParseGasOptions: ParseGasOptions = {
  defaultGasLimit: 1E6,
  defaultGasPrice: 1E9,
  numActualTxns: 1
}

function parseGasPrice (s: string, opts: ParseGasOptions = DefaultParseGasOptions): number {
  let res = ((s && Math.floor(parseFloat(s))) || opts.defaultGasPrice)
  if (res <= 0) {
    res = opts.defaultGasPrice
  }
  return res
}

function parseGasLimit (s: string, opts: ParseGasOptions = DefaultParseGasOptions): number {
  let res = ((s && Math.floor(parseFloat(s))) || opts.defaultGasLimit)
  if (res <= 0) {
    res = opts.defaultGasLimit
  }
  return res
}

function evenZip (res: ParseGasResult, opts: ParseGasOptions = DefaultParseGasOptions): ParseGasResult {
  if (res.gasPrices.length !== opts.numActualTxns) {
    const startInd = res.gasPrices.length
    res.gasPrices.length = opts.numActualTxns
    if (startInd < opts.numActualTxns) {
      res.gasPrices.fill(opts.defaultGasPrice, startInd, opts.numActualTxns)
    }
  }
  if (res.gasPrices.length !== opts.numActualTxns) {
    const startInd = res.gasLimits.length
    res.gasLimits.length = opts.numActualTxns
    if (startInd < opts.numActualTxns) {
      res.gasLimits.fill(opts.defaultGasLimit, startInd, opts.numActualTxns)
    }
  }
  return res
}

export function cloneResult (res: ParseGasResult): ParseGasResult {
  return {
    gasLimits: res.gasLimits.slice(0),
    gasPrices: res.gasPrices.slice(0)
  }
}

export function parseGas (stub: WithIDs, opts: ParseGasOptions = DefaultParseGasOptions): ParseGasResult {
  const ret: ParseGasResult = {
    gasLimits: [],
    gasPrices: []
  }
  if (!stub.gasLimits && !stub.gasPrices) {
    ret.gasLimits.push(opts.defaultGasLimit)
    ret.gasPrices.push(opts.defaultGasPrice)
  } else if (!stub.gasPrices && stub.gasLimits) {
    ret.gasLimits = parseArray(stub.gasLimits).map(s => parseGasLimit(s, opts))
    ret.gasPrices = new Array(ret.gasLimits.length)
    ret.gasPrices.fill(opts.defaultGasPrice)
  } else if (stub.gasPrices && !stub.gasLimits) {
    ret.gasPrices = parseArray(stub.gasPrices).map(s => parseGasPrice(s, opts))
    ret.gasLimits = new Array(ret.gasPrices.length)
    ret.gasLimits.fill(opts.defaultGasLimit)
  } else if (stub.gasLimits && stub.gasPrices) {
    ret.gasPrices = parseArray(stub.gasPrices).map(s => parseGasPrice(s, opts))
    ret.gasLimits = parseArray(stub.gasLimits).map(s => parseGasLimit(s, opts))
  }
  const res = evenZip(ret, opts)
  mDebugger('parseGas res: %o for stub %o', res, stub)
  return res
}

export function serializeGas (res: ParseGasResult): SerializeGasResult {
  const ret = {
    gasLimits: res.gasLimits.map(s => s.toString()).join(','),
    gasPrices: res.gasPrices.map(s => s.toString()).join(',')
  }
  mDebugger('serializeGas res: %o for input %o', ret, res)
  return ret
}
