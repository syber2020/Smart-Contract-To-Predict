"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var csv_parse_1 = __importDefault(require("csv-parse"));
var debug_1 = __importDefault(require("debug"));
var fs = __importStar(require("fs"));
var highland_1 = __importDefault(require("highland"));
/**
 * Reads data from a CSV file.
 * One of the columns MUST be "id"
 * The first row MUST be column names
 * The encoding MUST be utf-8
 * You are responsible for ensuring the columns actually conform to the expected type.
 * @param fileName
 */
function readCSV(fileName) {
    // Create logger
    var mDebug = debug_1.default('automation:typedcsvread:' + fileName);
    // Read file
    var srcStream = fs.createReadStream(fileName, {
        encoding: 'utf8'
    });
    // Transform file
    var csvStream = csv_parse_1.default({
        columns: true,
        comment: '#',
        skip_empty_lines: true
    });
    // Propagate errors
    srcStream.on('error', function (e) {
        mDebug('srcStream onError %o', e);
        csvStream.emit('error', e);
        csvStream.emit('end');
    });
    var highlandStream = highland_1.default(csvStream);
    // Return
    var retStream = highlandStream.map(function (item) {
        // initialize blockchainID to be the same as CSV file ID
        item.blockchainID = item.id;
        return item;
    });
    srcStream.pipe(csvStream);
    return retStream;
}
exports.readCSV = readCSV;
