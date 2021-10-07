
// NOTE: delete this file when https://github.com/xf00f/web3x/issues/57 is fixed.

import { TxCall, TxSend } from 'web3x-es/contract'
import { TransactionReceipt } from 'web3x-es/formatters'

export interface TxSendAndCall<TxReceipt = TransactionReceipt> extends TxSend<TxReceipt>, TxCall<TxReceipt> {

}

export function isTxSend<TxReceipt = TransactionReceipt> (t: any): t is TxSend<TxReceipt> {
  if (!t) {
    return false
  } else if (typeof t.send !== 'function') {
    return false
  } else if (typeof t.getSendRequestPayload !== 'function') {
    return false
  } else if (typeof t.estimateGas !== 'function') {
    return false
  } else if (typeof t.encodeABI !== 'function') {
    return false
  } else {
    return true
  }
}

export function isTxCall<Ret = any> (t: any): t is TxCall<Ret> {
  if (!t) {
    return false
  } else if (typeof t.call !== 'function') {
    return false
  } else if (typeof t.getCallRequestPayload !== 'function') {
    return false
  } else if (typeof t.estimateGas !== 'function') {
    return false
  } else if (typeof t.encodeABI !== 'function') {
    return false
  } else {
    return true
  }
}

export function isTxSendAndCall<TxReceipt = TransactionReceipt> (t: any): t is TxSendAndCall<TxReceipt> {
  return isTxCall<TxReceipt>(t) && isTxSend<TxReceipt>(t)
}

export function castToSendAndCall <TxReceipt = TransactionReceipt> (t: TxSend<TxReceipt>): TxSendAndCall<TxReceipt> {
  if (!isTxSendAndCall<TxReceipt>(t)) {
    throw new Error('cannot cast')
  } else {
    return t
  }
}
