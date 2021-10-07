"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var array_1 = require("./array");
var debug_1 = require("debug");
var mDebugger = debug_1.debug('parseGas');
mDebugger.enabled = true;
var DefaultParseGasOptions = {
    defaultGasLimit: 1E6,
    defaultGasPrice: 1E9,
    numActualTxns: 1
};
function parseGasPrice(s, opts) {
    if (opts === void 0) { opts = DefaultParseGasOptions; }
    var res = ((s && Math.floor(parseFloat(s))) || opts.defaultGasPrice);
    if (res <= 0) {
        res = opts.defaultGasPrice;
    }
    return res;
}
function parseGasLimit(s, opts) {
    if (opts === void 0) { opts = DefaultParseGasOptions; }
    var res = ((s && Math.floor(parseFloat(s))) || opts.defaultGasLimit);
    if (res <= 0) {
        res = opts.defaultGasLimit;
    }
    return res;
}
function evenZip(res, opts) {
    if (opts === void 0) { opts = DefaultParseGasOptions; }
    if (res.gasPrices.length !== opts.numActualTxns) {
        var startInd = res.gasPrices.length;
        res.gasPrices.length = opts.numActualTxns;
        if (startInd < opts.numActualTxns) {
            res.gasPrices.fill(opts.defaultGasPrice, startInd, opts.numActualTxns);
        }
    }
    if (res.gasPrices.length !== opts.numActualTxns) {
        var startInd = res.gasLimits.length;
        res.gasLimits.length = opts.numActualTxns;
        if (startInd < opts.numActualTxns) {
            res.gasLimits.fill(opts.defaultGasLimit, startInd, opts.numActualTxns);
        }
    }
    return res;
}
function cloneResult(res) {
    return {
        gasLimits: res.gasLimits.slice(0),
        gasPrices: res.gasPrices.slice(0)
    };
}
exports.cloneResult = cloneResult;
function parseGas(stub, opts) {
    if (opts === void 0) { opts = DefaultParseGasOptions; }
    var ret = {
        gasLimits: [],
        gasPrices: []
    };
    if (!stub.gasLimits && !stub.gasPrices) {
        ret.gasLimits.push(opts.defaultGasLimit);
        ret.gasPrices.push(opts.defaultGasPrice);
    }
    else if (!stub.gasPrices && stub.gasLimits) {
        ret.gasLimits = array_1.parseArray(stub.gasLimits).map(function (s) { return parseGasLimit(s, opts); });
        ret.gasPrices = new Array(ret.gasLimits.length);
        ret.gasPrices.fill(opts.defaultGasPrice);
    }
    else if (stub.gasPrices && !stub.gasLimits) {
        ret.gasPrices = array_1.parseArray(stub.gasPrices).map(function (s) { return parseGasPrice(s, opts); });
        ret.gasLimits = new Array(ret.gasPrices.length);
        ret.gasLimits.fill(opts.defaultGasLimit);
    }
    else if (stub.gasLimits && stub.gasPrices) {
        ret.gasPrices = array_1.parseArray(stub.gasPrices).map(function (s) { return parseGasPrice(s, opts); });
        ret.gasLimits = array_1.parseArray(stub.gasLimits).map(function (s) { return parseGasLimit(s, opts); });
    }
    var res = evenZip(ret, opts);
    mDebugger('parseGas res: %o for stub %o', res, stub);
    return res;
}
exports.parseGas = parseGas;
function serializeGas(res) {
    var ret = {
        gasLimits: res.gasLimits.map(function (s) { return s.toString(); }).join(','),
        gasPrices: res.gasPrices.map(function (s) { return s.toString(); }).join(',')
    };
    mDebugger('serializeGas res: %o for input %o', ret, res);
    return ret;
}
exports.serializeGas = serializeGas;
