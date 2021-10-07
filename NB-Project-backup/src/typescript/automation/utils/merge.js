"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multimaps_1 = require("@teppeis/multimaps");
var debug_1 = __importDefault(require("debug"));
var highland_1 = __importDefault(require("highland"));
var queue_1 = require("./queue");
function endContextIfAble(context) {
    queue_1.acquireLock(context.key).then(function (releaser) {
        if (context.isAborted) {
            context.mDebugger('endContextIfAble: already aborted');
            releaser();
            return;
        }
        if (!context.stubsEnded) {
            context.mDebugger('endContextIfAble: still input');
            releaser();
            return;
        }
        if (context.stubIDsToStubs.size) {
            context.mDebugger('endContextIfAble: still enqueued stubIDs size %o', context.stubIDsToStubs.size);
            releaser();
            return;
        }
        if (context.runningStubIDs.size) {
            context.mDebugger('endContextIfAble: still runningStubIDs size %o', context.runningStubIDs.size);
            releaser();
            return;
        }
        context.mDebugger('endContextIfAble: ending');
        context.stream.end();
        releaser();
    });
}
function runStubIfAble(stubID, context) {
    queue_1.acquireLock(context.key).then(function (releaser) {
        var stub = context.stubIDsToStubs.get(stubID);
        if (!stub) {
            releaser();
            return;
        }
        context.mDebugger('runStubIfAble: stubID: %s', stubID);
        var _loop_1 = function (idx) {
            var dependencyIDs = Array.from(context.stubIDsToPreExistingDependencyIDs[idx].get(stubID));
            context.mDebugger('runStubIfAble: stubID: %s, dependencyIDs: %o, idx: %d', stubID, dependencyIDs, idx);
            var allHere = dependencyIDs.every(function (dependencyID) {
                return context.preExistingDependencyIDsToBlockchainIDs[idx].has(dependencyID);
            });
            if (!allHere) {
                context.mDebugger('runStubIfAble: allHere fail: %s, idx: %d', stubID, idx);
                releaser();
                return { value: void 0 };
            }
        };
        for (var idx = 0; idx < context.dependenciesStreams.length; idx++) {
            var state_1 = _loop_1(idx);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        context.mDebugger('runStubIfAble: stubID: %s', stubID);
        context.runningStubIDs.add(stubID);
        var blockchainIDs = [];
        var _loop_2 = function (i) {
            var sourceDependencyIDs = context.stubDependencyIDExtractor(stub, i);
            var destDependencyIDs = sourceDependencyIDs.map(function (dependencyID) {
                var destID = context.preExistingDependencyIDsToBlockchainIDs[i].get(dependencyID);
                return destID || '';
            });
            blockchainIDs.push(destDependencyIDs);
        };
        for (var i = 0; i < context.dependenciesStreams.length; i++) {
            _loop_2(i);
        }
        context.stubIDsToStubs.delete(stubID);
        context.mDebugger('runStubIfAble: launching %s with args %o', stubID, blockchainIDs);
        releaser(); // it is ok at this point to release as the data structure mods will be done.
        context.executionFunction(stub, blockchainIDs).then((function (result) {
            context.mDebugger('runStubIfAble: stubID %s completed', stubID);
            return context.stream.write(result);
        }), (function (e) {
            context.mDebugger('runStubIfAble: stubID %s error %o', stubID, e);
            context.isAborted = true;
            context.stream.emit('error', e);
            return Promise.resolve();
        })).then(function () {
            context.runningStubIDs.delete(stubID);
            context.mDebugger('runStubIfAble: stubID %s removing from queue', stubID);
            endContextIfAble(context);
        }).catch(function (e) {
            context.runningStubIDs.delete(stubID);
            context.mDebugger('runStubIfAble: stubID %s wtf %o', stubID, e);
            endContextIfAble(context);
        });
    });
}
function onDependency(result, context, idx) {
    var dependencyID = result.id;
    var blockchainID = result.blockchainID;
    context.mDebugger('onDependency: dependencyID: %s, blockchainID: %s, idx: %d', dependencyID, blockchainID, idx);
    context.preExistingDependencyIDsToBlockchainIDs[idx].set(dependencyID, blockchainID);
    context.preExistingDependencyIDsToStubIDs[idx].forEach(function (stubID) {
        runStubIfAble(stubID, context);
    });
}
function onStub(input, context) {
    var stubID = input.id;
    context.mDebugger('onStub: stubID: %s', stubID);
    var _loop_3 = function (idx) {
        var dependencyIDs = context.stubDependencyIDExtractor(input, idx);
        dependencyIDs.forEach(function (dependencyID) {
            context.preExistingDependencyIDsToStubIDs[idx].put(dependencyID, stubID);
            context.stubIDsToPreExistingDependencyIDs[idx].put(stubID, dependencyID);
        });
    };
    for (var _i = 0, _a = context.stubIDsToPreExistingDependencyIDs.keys(); _i < _a.length; _i++) {
        var idx = _a[_i];
        _loop_3(idx);
    }
    context.stubIDsToStubs.set(stubID, input);
    runStubIfAble(stubID, context);
}
function onStubsEnd(context) {
    context.mDebugger('onStubsEnd');
    context.stubsEnded = true;
    endContextIfAble(context);
}
function onStubsError(context, e) {
    context.mDebugger('onStubsError: %o', e);
    context.stubsEnded = true;
    if (e) {
        context.isAborted = true;
        context.stream.emit('error', e);
    }
    else {
        endContextIfAble(context);
    }
}
function onDependenciesEnd(context, idx) {
    context.mDebugger('onDependenciesEnd');
    context.dependenciesEnded[idx] = true;
    endContextIfAble(context);
}
function onDependenciesError(context, e, idx) {
    context.mDebugger('onDependenciesError: %o', e);
    context.dependenciesEnded[idx] = true;
    if (e) {
        context.isAborted = true;
        context.stream.emit('error', e);
    }
    else {
        endContextIfAble(context);
    }
}
/**
 * Creates a context.
 * @param opts merge options
 * @return the context.
 */
function createContext(opts) {
    var key = 'merge:' + opts.stubTypeName +
        ':' + opts.dependencyTypeNames.join(',') +
        ':' + opts.outTypeName;
    return __assign(__assign({}, opts), { dependenciesEnded: new Array(opts.dependenciesStreams.length).fill(false), isAborted: false, key: key, mDebugger: debug_1.default(key), preExistingDependencyIDsToBlockchainIDs: new Array(opts.dependenciesStreams.length).fill(1).map(function (u) { return new Map(); }), preExistingDependencyIDsToStubIDs: new Array(opts.dependenciesStreams.length).fill(1).map(function (u) { return new multimaps_1.SetMultimap(); }), runningStubIDs: new Set(), stream: highland_1.default(), stubIDsToPreExistingDependencyIDs: new Array(opts.dependenciesStreams.length).fill(1).map(function (u) { return new multimaps_1.SetMultimap(); }), stubIDsToStubs: new Map(), stubsEnded: false });
}
exports.createContext = createContext;
/**
 * Adds a dependency to the context.
 * @param ctx the context to add to
 * @param addOpts the dependency to add
 * @return the modified context
 */
function addToContext(ctx, addOpts) {
    // add information from user
    ctx.dependenciesStreams.push(addOpts.dependencyStream);
    ctx.dependencyTypeNames.push(addOpts.dependencyTypeName);
    // increase size of internal arrays
    ctx.dependenciesEnded.push(false);
    ctx.preExistingDependencyIDsToBlockchainIDs.push(new Map());
    ctx.preExistingDependencyIDsToStubIDs.push(new multimaps_1.SetMultimap());
    ctx.stubIDsToPreExistingDependencyIDs.push(new multimaps_1.SetMultimap());
    // change debugger to reflect dependency inclusion
    ctx.mDebugger = debug_1.default('merge:' + ctx.stubTypeName +
        ':' + ctx.dependencyTypeNames.join(',') +
        ':' + ctx.outTypeName);
    // return
    return ctx;
}
exports.addToContext = addToContext;
/**
 * Does the actual merge work.
 */
function doTheMerging(context) {
    var _loop_4 = function (idx, dependencyStream) {
        dependencyStream.on('error', function (e) {
            onDependenciesError(context, e, idx);
        }).each(function (dependency) {
            onDependency(dependency, context, idx);
        }).done(function () {
            onDependenciesEnd(context, idx);
        });
    };
    for (var _i = 0, _a = context.dependenciesStreams.entries(); _i < _a.length; _i++) {
        var _b = _a[_i], idx = _b[0], dependencyStream = _b[1];
        _loop_4(idx, dependencyStream);
    }
    context.stubsStream.on('error', function (e) {
        onStubsError(context, e);
    }).each(function (stub) {
        onStub(stub, context);
    }).done(function () {
        onStubsEnd(context);
    });
    return context.stream;
}
exports.doTheMerging = doTheMerging;
/**
 * The all-in-one function for executing a batched merge.
 */
function merge(opts) {
    return doTheMerging(createContext(opts));
}
exports.merge = merge;
