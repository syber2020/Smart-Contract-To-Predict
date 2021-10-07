"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = __importDefault(require("moment"));
function isAfterNow(currentDate, selectedDate) {
    if (!currentDate && !selectedDate) {
        return false;
    }
    var nowMoment = moment_1.default();
    if (currentDate) {
        var currMoment = moment_1.default(currentDate);
        if (!currMoment.isValid()) {
            return false;
        }
        if (!currMoment.isSameOrAfter(nowMoment)) {
            return false;
        }
    }
    if (selectedDate) {
        var selectedMoment = moment_1.default(selectedDate);
        if (!selectedMoment.isValid()) {
            return false;
        }
        if (!selectedMoment.isSameOrAfter(nowMoment)) {
            return false;
        }
    }
    return true;
}
exports.isAfterNow = isAfterNow;
function localToUTCUnixTimestamp(current) {
    return current.utc().unix();
}
exports.localToUTCUnixTimestamp = localToUTCUnixTimestamp;
function unixUTCTimestampToLocal(ts) {
    return moment_1.default.utc(ts, 'X').local();
}
exports.unixUTCTimestampToLocal = unixUTCTimestampToLocal;
