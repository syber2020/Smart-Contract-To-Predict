"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var debug_1 = __importDefault(require("debug"));
var fs = __importStar(require("fs"));
// @ts-ignore
var csv_stringify_1 = __importDefault(require("csv-stringify"));
var array_1 = require("./array");
function getSum(total, num) {
    return total + num;
}
function formatItem(value) {
    var retObj = Object.assign({}, value);
    // suppress all txnReceipt except for approved things
    delete retObj.transactionReceipts;
    if (value.transactionReceipts) {
        retObj.transactionHashes = value.transactionReceipts.map(function (rcpt) { return rcpt.transactionHash; }).join(',');
        retObj.blockHashes = value.transactionReceipts.map(function (rcpt) { return rcpt.blockHash; }).join(',');
        retObj.gasUsed = value.transactionReceipts.map(function (rcpt) { return rcpt.gasUsed; }).reduce(getSum, 0);
        retObj.gasLimit = array_1.parseArray(value.gasLimits || '').map(function (limit) { return parseFloat(limit); }).reduce(getSum, 0);
    }
    retObj.startTimesInSecondsSinceUnixEpoch = value.startTimesInSecondsSinceUnixEpoch.map(function (tme) { return tme.toString(); }).join(',');
    retObj.receiptTimesInSecondsSinceUnixEpoch = value.receiptTimesInSecondsSinceUnixEpoch.map(function (tme) { return tme.toString(); }).join(',');
    return retObj;
}
function writeCSV(source, fileName) {
    return new Promise(function (resolve, reject) {
        // Create logger
        var mDebug = debug_1.default('automation:typedcsvread:' + fileName);
        // Create destination stream
        var destStream = fs.createWriteStream(fileName, {
            encoding: 'utf8'
        });
        // propagate events to promise
        destStream.on('finish', function () {
            resolve();
        });
        destStream.on('error', function (error) {
            mDebug('destStream onError %o', error);
            reject(error);
        });
        // create CSV stream
        var opts = {
            header: true,
            quoted: true,
            quotedEmpty: true
        };
        var csvStream = csv_stringify_1.default(opts);
        // propagate CSV output to destination
        csvStream.pipe(destStream);
        // Propagate errors
        csvStream.on('error', function (e) {
            mDebug('csvStream onError %o', e);
            destStream.emit('error', e);
            destStream.end();
        });
        // create highland wrapper
        var highlandNodeStream = source.map(formatItem).toNodeStream({
            objectMode: true
        });
        // propagate to CSV stream
        highlandNodeStream.pipe(csvStream);
        // propagate errors
        highlandNodeStream.on('error', function (e) {
            mDebug('highlandNodeStream onError %o', e);
            csvStream.emit('error', e);
            csvStream.end();
        });
    });
}
exports.writeCSV = writeCSV;
