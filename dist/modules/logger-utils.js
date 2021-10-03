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
exports.makeLogger = exports.makeLogMsg = exports.makeTransport = exports.makeDir = exports.makeFormat = exports.printMsg = exports.levelGuard = exports.levels = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const winston_1 = __importStar(require("winston"));
const oba_common_1 = require("@onebro/oba-common");
const { combine, label, timestamp, printf } = winston_1.format;
exports.levels = { crit: 0, error: 1, warn: 2, info: 3, access: 4, debug: 5 };
const levelGuard = (level) => winston_1.format(info => info.level === level ? info : null)();
exports.levelGuard = levelGuard;
const printMsg = (m) => `${m.timestamp} [${m.label}] ${m.level}:${m.message}`;
exports.printMsg = printMsg;
const makeFormat = (name) => combine(label({ label: name }), timestamp(), printf(exports.printMsg));
exports.makeFormat = makeFormat;
const makeDir = (path) => fs_1.default.existsSync(path) || fs_1.default.mkdirSync(path);
exports.makeDir = makeDir;
const makeTransport = (level, dirname) => new (winston_1.transports.File)({
    format: exports.levelGuard(level),
    filename: path_1.default.join(dirname, `/${level}.log`),
    level,
    handleExceptions: level == "error" || level == "critical"
});
exports.makeTransport = makeTransport;
const makeLogMsg = (e) => {
    switch (true) {
        case e instanceof Error: {
            return `{
        time:${new Date().toLocaleString("en-US", oba_common_1.appLocals.dateFormat)},
        name:${e.name},
        message:"${e.message}",
        warning:${!!e.warning},
        status:${e.status},
        code:${e.code ? e.code.toString() : "-"},
        info:"${e.info ? JSON.stringify(e.info) : null}",
        errors":${e.errors ? JSON.stringify(e.errors) : "-"}",
        stack:${e.stack},
      }`;
        }
        default: {
            return `{
        time:${new Date().toLocaleString("en-US", oba_common_1.appLocals.dateFormat)},
      }`;
        }
    }
};
exports.makeLogMsg = makeLogMsg;
//create access msg
const makeLogger = (c) => winston_1.default.createLogger({
    levels: exports.levels,
    format: exports.makeFormat(c.label),
    transports: c.levels.map(l => exports.makeTransport(l, c.dirname)),
    exitOnError: false
});
exports.makeLogger = makeLogger;
//# sourceMappingURL=logger-utils.js.map