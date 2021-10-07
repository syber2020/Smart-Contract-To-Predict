"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parseBool(s) {
    var res = JSON.parse(s);
    if (res) {
        return true;
    }
    else {
        return false;
    }
}
exports.parseBool = parseBool;
