"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var randomstring_1 = require("randomstring");
function getFakeIPFSHash() {
    return Promise.resolve(randomstring_1.generate({ length: 46 }));
}
exports.getFakeIPFSHash = getFakeIPFSHash;
