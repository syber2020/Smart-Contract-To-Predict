"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var perf_hooks_1 = require("perf_hooks");
var offsetInitialized = false;
var firstHighPerformanceTimeInSeconds = 0;
var firstTimeSinceUnixEpochInSeconds = 0;
function getHighPerformanceTimeInSeconds() {
    return perf_hooks_1.performance.now() / 1000.0;
}
function getTimeSinceUnixEpochInSeconds() {
    return Date.now() / 1000.0;
}
function initializeOffset() {
    if (!offsetInitialized) {
        firstHighPerformanceTimeInSeconds = getHighPerformanceTimeInSeconds();
        firstTimeSinceUnixEpochInSeconds = getTimeSinceUnixEpochInSeconds();
        offsetInitialized = true;
    }
}
function getMostPreciseTimeInSecondsSinceUnixEpoch() {
    initializeOffset();
    var currentHighPerfTime = getHighPerformanceTimeInSeconds();
    var taredHighPerfTime = currentHighPerfTime - firstHighPerformanceTimeInSeconds;
    var timeSinceUnixEpochInSeconds = taredHighPerfTime + firstTimeSinceUnixEpochInSeconds;
    return timeSinceUnixEpochInSeconds;
}
exports.getMostPreciseTimeInSecondsSinceUnixEpoch = getMostPreciseTimeInSecondsSinceUnixEpoch;
