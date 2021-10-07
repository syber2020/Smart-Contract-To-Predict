"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parseArray(s) {
    if (!s) {
        return [];
    }
    else {
        return s.split(',');
    }
}
exports.parseArray = parseArray;
function multiSwap(thiz, beforeIdxs, afterIdxs) {
    if (beforeIdxs.length !== afterIdxs.length) {
        return;
    }
    var beforeArr = [];
    for (var i = 0; i < beforeIdxs.length; i++) {
        var beforeIdx = beforeIdxs[i];
        var afterIdx = afterIdxs[i];
        if (beforeIdx < 0 || beforeIdx > thiz.length) {
            return;
        }
        if (afterIdx < 0 || afterIdx > thiz.length) {
            return;
        }
        beforeArr.push(thiz[beforeIdx]);
    }
    for (var i = 0; i < afterIdxs.length; i++) {
        var afterIdx = afterIdxs[i];
        var afterElem = beforeArr[i];
        thiz[afterIdx] = afterElem;
    }
}
exports.multiSwap = multiSwap;
function swap(thiz, a, b) {
    multiSwap(thiz, [a, b], [b, a]);
}
exports.swap = swap;
