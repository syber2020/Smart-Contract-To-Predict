"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var highland_1 = __importDefault(require("highland"));
function tee(readable, numDestinations) {
    if (numDestinations === void 0) { numDestinations = 2; }
    var destStreams = [];
    if (numDestinations <= 0) {
        return destStreams;
    }
    // extend isn't working.
    // Create destination streams
    for (var i = 0; i < numDestinations; i++) {
        var destStream = highland_1.default();
        // Open issue: should destination failures propagate to parent??
        destStreams.push(destStream);
    }
    // create parent stream that will feed all children
    var parentStream = highland_1.default();
    readable.pipe(parentStream);
    parentStream.each(
    // reader: Gets the written values. Pass them down to all destinations.
    // @ts-ignore
    (function (value) {
        destStreams.forEach(function (destStream) {
            destStream.write(value);
        });
    })).done((function () {
        destStreams.forEach(function (destStream) {
            destStream.end();
        });
    }));
    return destStreams.slice();
}
exports.tee = tee;
