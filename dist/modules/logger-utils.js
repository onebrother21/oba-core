"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLogMsg = exports.makeDir = exports.makeLogger = exports.makeMongoDbTransport = exports.makeFileTransport = exports.makeFormat = exports.printMsg = exports.levelGuard = exports.levels = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const winston_1 = __importStar(require("winston"));
const winston_mongodb_1 = require("winston-mongodb");
const { combine, label, timestamp, printf, errors, json } = winston_1.format;
exports.levels = { crit: 0, error: 1, warn: 2, info: 3, access: 4, debug: 5 };
const levelGuard = (level) => (0, winston_1.format)(info => info.level === level ? info : null)();
exports.levelGuard = levelGuard;
const printMsg = (m) => JSON.stringify(Object.assign({ time: m.timestamp, label: m.label, level: m.level }, JSON.parse(m.message)));
exports.printMsg = printMsg;
const makeFormat = (name) => combine(label({ label: name }), timestamp(), errors({ stack: true }), printf(exports.printMsg));
exports.makeFormat = makeFormat;
const makeFileTransport = (o) => new winston_1.transports.File({
    format: (0, exports.levelGuard)(o.level),
    filename: path_1.default.join(o.dirname, `/${o.level}.log`),
    level: o.level,
    handleExceptions: o.level == "error" || o.level == "crit"
});
exports.makeFileTransport = makeFileTransport;
const makeMongoDbTransport = (o) => new winston_mongodb_1.MongoDB(o);
exports.makeMongoDbTransport = makeMongoDbTransport;
const makeLogger = (label, type, o) => winston_1.default.createLogger({
    levels: exports.levels,
    format: (0, exports.makeFormat)(label),
    transports: o.map(t => type == "file" ? (0, exports.makeFileTransport)(t) : (0, exports.makeMongoDbTransport)(Object.assign(Object.assign({}, t), { label }))),
    exitOnError: false,
});
exports.makeLogger = makeLogger;
const makeDir = (path) => fs_1.default.existsSync(path) || fs_1.default.mkdirSync(path);
exports.makeDir = makeDir;
const makeLogMsg = (e) => {
    switch (true) {
        case e instanceof Error: {
            return JSON.stringify({
                name: e.name,
                message: e.message,
                warning: !!e.warning,
                status: e.status,
                code: e.code ? e.code.toString() : "-",
                info: e.info || {},
                errors: e.errors || {},
                stack: e.stack,
            });
        }
        default: return JSON.stringify(e);
    }
};
exports.makeLogMsg = makeLogMsg;
//# sourceMappingURL=logger-utils.js.map