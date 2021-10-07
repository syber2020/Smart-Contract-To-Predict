"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// START COPYING HERE.
// Debugger
var debug_1 = __importDefault(require("debug"));
var myDebugger = debug_1.default('main');
myDebugger.enabled = true;
var fs_1 = __importDefault(require("fs"));
// Extract Arguments
myDebugger('arguments %o', process.argv);
// @ts-ignore
// tslint:disable-next-line
var networkURL = process.argv[2]; // e.g. your infura http url
// @ts-ignore
// tslint:disable-next-line
var mnemonic = process.argv[3]; // e.g. your mnemonic
// @ts-ignore
// tslint:disable-next-line
var inputFile = process.argv[4];
// @ts-ignore
// tslint:disable-next-line
var outputFile = process.argv[5];
myDebugger('through arg extraction');
// Universal Provider Wrapper Imports
var promised_web3_requestmanager_1 = require("@nsl/promised-web3-requestmanager");
// Underlying Provider Imports
// @ts-ignore
var truffle_hdwallet_provider_1 = __importDefault(require("truffle-hdwallet-provider"));
// @ts-ignore
// tslint:disable-next-line
var SubscriptionSubprovider = require('web3-provider-engine/subproviders/subscriptions.js');
// Create Underlying Provider
// @ts-ignore
var ethereumProvider = new truffle_hdwallet_provider_1.default(mnemonic, networkURL, 0, 1);
myDebugger('through underlying provider creation');
// https://github.com/MetaMask/provider-engine/issues/248
// https://github.com/trufflesuite/truffle-hdwallet-provider/blob/master/index.js
// Add Subscriptions to Underlying Provider
// @ts-ignore
var subscriptionSubprovider = new SubscriptionSubprovider();
// @ts-ignore
subscriptionSubprovider.on('data', function (err, notification) {
    // @ts-ignore
    ethereumProvider.engine.emit('data', err, notification);
});
// @ts-ignore
ethereumProvider.engine.addProvider(subscriptionSubprovider);
myDebugger('through subscription edit');
// Reorder the Subproviders so that Subscriptions Come First
// (from index.js constructor code of HDWalletProvider - look for this.engine.addProvider calls)
// providers[0] is a hooked subprovider for the hdwallet stuff
// providers[1] is a subprovider for ensuring the nonces are in sync
// providers[2] is a filters subprovider (that does ?????)
// providers[3] is the actual HTTP provider
// providers[4] is the subscriptionsSubprovider you just added above.
// We need to make sure that the subscriptions subprovider goes before http one.
// @ts-ignore
var tmp = ethereumProvider.engine._providers[3];
// @ts-ignore
ethereumProvider.engine._providers[3] = ethereumProvider.engine._providers[4];
// @ts-ignore
ethereumProvider.engine._providers[4] = tmp;
myDebugger('through provider swap');
// Create the Universal Provider Wrapper.
var ethereumRequestManager = new promised_web3_requestmanager_1.ProviderWrapper(ethereumProvider);
ethereumRequestManager.addRequestSendListener(new promised_web3_requestmanager_1.NotificationEventTranslator(ethereumRequestManager));
ethereumRequestManager.addRequestSendListener(new promised_web3_requestmanager_1.SubscriptionIDEventTranslator(ethereumRequestManager));
ethereumRequestManager.addRequestSendListener(new promised_web3_requestmanager_1.SubscriptionMethodEventTranslator(ethereumRequestManager));
ethereumRequestManager.addRequestSendListener(new promised_web3_requestmanager_1.DataEventTranslator(ethereumRequestManager));
myDebugger('through ethereumRequestManager');
// ContractCache class for managing contract instances.
var ContractsCache_1 = require("./ContractsCache");
myDebugger('through ContractsCache imports');
var ethOpts = {
    ethereumProvider: ethereumProvider,
    ethereumProviderName: 'hdwallet',
    ethereumRequestManager: ethereumRequestManager
};
myDebugger('through ethOpts');
ContractsCache_1.ContractCache.setProps(ethOpts);
myDebugger('through ContractCache setProps');
// END COPYING HERE
// BEGIN ADJUST TO TASTE COPYING HERE
// Declare variables to hold the instances of your contracts
// Example:
var TrafficPerformance_1 = require("../contracts/TrafficPerformance");
var trafficPerformanceCreator = function (eth, address) {
    try {
        return Promise.resolve(new TrafficPerformance_1.TrafficPerformance(eth, address));
    }
    catch (e) {
        return Promise.reject(e);
    }
};
var trafficPerformanceCache = ContractsCache_1.ContractCache.getInstance('TrafficPerformance', trafficPerformanceCreator);
var inst; ///What does this line mean
myDebugger('through TrafficPerformance');
// END ADJUST TO TASTE COPYING HERE
// BEGIN COPYING HERE
// functions for reading and writing files
function readFile(fileName) {
    return new Promise(function (resolve, reject) {
        fs_1.default.readFile(fileName, 'utf-8', function (err, data) {
            err ? reject(err) : resolve(data);
        });
    });
}
function writeFile(fileName, contents) {
    return new Promise(function (resolve, reject) {
        fs_1.default.writeFile(fileName, contents, 'utf-8', function (err) {
            err ? reject(err) : resolve();
        });
    });
}
myDebugger('through writeFile, readFile');
// END COPYING HERE
// BEGIN ADJUST TO TASTE COPYING HERE.
// For storing an address
var address_1 = require("web3x-es/address");
var sendingAddress = address_1.Address.ZERO; //calls a blank address () .zero is a static instance of address from address that contains all 0s
// For measuring time
var time_1 = require("./utils/time");
// These may or may not apply to you.
var rows = '';
var splitRows = [];
// END ADJUST TO TASTE COPYING HERE
// BEGIN COPYING HERE
// Detect how to talk to the truffle hdwallet-provider
myDebugger('discovering send method');
// tslint:disable-next-line
ethereumRequestManager.discoverCorrectSendMethod().then(function () {
    myDebugger.enabled = true;
    myDebugger('discovered correct send method');
    return Promise.resolve();
}).then(function () {
    // END COPYING HERE
    return readFile(inputFile);
}).then(function (_rows) {
    myDebugger('got rows %o', _rows);
    rows = _rows;
    splitRows = rows.split('\n');
    return trafficPerformanceCache.getSendingAddress();
}).then(function (_addr) {
    myDebugger('got address %o', _addr);
    sendingAddress = _addr;
    return trafficPerformanceCache.getOrCreateContractForCurrentNetwork();
}).then(function (_inst) {
    // do something with instance of contract
    myDebugger('got TrafficPerformance instance');
    inst = _inst;
    return Promise.resolve();
}).then(function () {
    // get latencies
    var latencies = splitRows[0].split(',');
    // send
    myDebugger('send1 time %o', time_1.getMostPreciseTimeInSecondsSinceUnixEpoch());
    return inst.methods.sum_lat_path1(latencies).send({
        from: sendingAddress,
        gas: 1000000
    }).getReceipt();
}).then(function (rcpt) {
    // print output
    myDebugger('recv1 time %o', time_1.getMostPreciseTimeInSecondsSinceUnixEpoch());
    myDebugger('recv1 rcpt %o', rcpt);
    // get latencies
    var latencies = splitRows[1].split(',');
    // send
    myDebugger('send2 time %o', time_1.getMostPreciseTimeInSecondsSinceUnixEpoch());
    return inst.methods.sum_lat_path2(latencies).send({
        from: sendingAddress,
        gas: 1000000
    }).getReceipt();
}).then(function (rcpt) {
    // print output
    myDebugger('recv2 time %o', time_1.getMostPreciseTimeInSecondsSinceUnixEpoch());
    myDebugger('recv2 rcpt %o', rcpt);
    // get latencies
    var latencies = splitRows[2].split(',');
    // send
    myDebugger('send3 time %o', time_1.getMostPreciseTimeInSecondsSinceUnixEpoch());
    return inst.methods.sum_lat_path3(latencies).send({
        from: sendingAddress,
        gas: 1000000
    }).getReceipt();
}).then(function (rcpt) {
    // print output
    myDebugger('recv3 time %o', time_1.getMostPreciseTimeInSecondsSinceUnixEpoch());
    myDebugger('recv3 rcpt %o', rcpt);
    // get latencies
    var latencies = splitRows[3].split(',');
    // send
    myDebugger('send4 time %o', time_1.getMostPreciseTimeInSecondsSinceUnixEpoch());
    return inst.methods.sum_lat_path4(latencies).send({
        from: sendingAddress,
        gas: 1000000
    }).getReceipt();
}).then(function (rcpt) {
    // print output
    myDebugger('recv4 time %o', time_1.getMostPreciseTimeInSecondsSinceUnixEpoch());
    myDebugger('recv4 rcpt %o', rcpt);
    // get latencies
    var latencies = splitRows[4].split(',');
    // send
    myDebugger('send5 time %o', time_1.getMostPreciseTimeInSecondsSinceUnixEpoch());
    return inst.methods.sum_lat_path5(latencies).send({
        from: sendingAddress,
        gas: 1000000
    }).getReceipt();
}).then(function (rcpt) {
    // print output
    myDebugger('recv5 time %o', time_1.getMostPreciseTimeInSecondsSinceUnixEpoch());
    myDebugger('recv5 rcpt %o', rcpt);
    // get latencies
    var latencies = splitRows[5].split(',');
    // send
    myDebugger('send6 time %o', time_1.getMostPreciseTimeInSecondsSinceUnixEpoch());
    return inst.methods.sum_lat_path6(latencies).send({
        from: sendingAddress,
        gas: 1000000
    }).getReceipt();
}).then(function (rcpt) {
    // print output
    myDebugger('recv6 time %o', time_1.getMostPreciseTimeInSecondsSinceUnixEpoch());
    myDebugger('recv6 rcpt %o', rcpt);
    // perform call
    return inst.methods.Set_Route_Path().call();
}).then(function (bestPath) {
    myDebugger('best path %o', bestPath);
    return writeFile(outputFile, bestPath);
    // START COPYING HERE.
}).then(function () {
    myDebugger('all done');
    process.exit(0);
}).catch(function (e) {
    myDebugger.enabled = true;
    myDebugger('something bad happened %o', e);
    process.exit(1);
});
// END COPYING HERE.
