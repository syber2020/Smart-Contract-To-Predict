"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var async_mutex_1 = require("async-mutex");
var sendersToMutexes = {};
function acquireLock(sender) {
    if (sender) {
        sender = sender.trim().toLowerCase();
    }
    else {
        throw new Error('Null Sender!');
    }
    if (sender) {
        if (!sendersToMutexes[sender]) {
            sendersToMutexes[sender] = new async_mutex_1.Mutex();
        }
        return sendersToMutexes[sender].acquire();
    }
    else {
        throw new Error('Empty Sender After Trim/Lowercase!');
    }
}
exports.acquireLock = acquireLock;
