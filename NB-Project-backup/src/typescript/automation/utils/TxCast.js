"use strict";
// NOTE: delete this file when https://github.com/xf00f/web3x/issues/57 is fixed.
Object.defineProperty(exports, "__esModule", { value: true });
function isTxSend(t) {
    if (!t) {
        return false;
    }
    else if (typeof t.send !== 'function') {
        return false;
    }
    else if (typeof t.getSendRequestPayload !== 'function') {
        return false;
    }
    else if (typeof t.estimateGas !== 'function') {
        return false;
    }
    else if (typeof t.encodeABI !== 'function') {
        return false;
    }
    else {
        return true;
    }
}
exports.isTxSend = isTxSend;
function isTxCall(t) {
    if (!t) {
        return false;
    }
    else if (typeof t.call !== 'function') {
        return false;
    }
    else if (typeof t.getCallRequestPayload !== 'function') {
        return false;
    }
    else if (typeof t.estimateGas !== 'function') {
        return false;
    }
    else if (typeof t.encodeABI !== 'function') {
        return false;
    }
    else {
        return true;
    }
}
exports.isTxCall = isTxCall;
function isTxSendAndCall(t) {
    return isTxCall(t) && isTxSend(t);
}
exports.isTxSendAndCall = isTxSendAndCall;
function castToSendAndCall(t) {
    if (!isTxSendAndCall(t)) {
        throw new Error('cannot cast');
    }
    else {
        return t;
    }
}
exports.castToSendAndCall = castToSendAndCall;
