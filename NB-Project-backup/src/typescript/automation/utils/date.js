"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = __importDefault(require("moment"));
var startMoment;
var callIndex = 0;
function getFakeDate() {
    if (!startMoment) {
        startMoment = moment_1.default();
        startMoment = startMoment.add(1, 'months');
    }
    callIndex++;
    return Promise.resolve(moment_1.default(startMoment).add(callIndex, 'seconds'));
}
exports.getFakeDate = getFakeDate;
