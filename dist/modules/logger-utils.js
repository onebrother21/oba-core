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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postLogMsg = exports.makeDir = exports.makeLogger = exports.makeMongoDbTransport = exports.makeFileTransport = exports.makeFormat = exports.printMsg = exports.levelGuard = exports.levels = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const oba_common_1 = __importDefault(require("@onebro/oba-common"));
const winston_1 = __importStar(require("winston"));
const winston_mongodb_1 = require("winston-mongodb");
const logger_types_1 = require("./logger-types");
const { combine, label, timestamp, printf, errors, json } = winston_1.format;
exports.levels = { crit: 0, error: 1, warn: 2, info: 3, access: 4, debug: 5 };
const levelGuard = (level) => (0, winston_1.format)(info => info.level === level ? info : null)();
exports.levelGuard = levelGuard;
const printMsg = (m) => {
    const { message, label, level, time, meta } = m;
    let msg;
    try {
        msg = JSON.parse(message);
    }
    catch (e) {
        msg = message;
    }
    const filetrans = oba_common_1.default.obj(msg) && !meta;
    const dbtrans = oba_common_1.default.str(msg) && meta;
    return JSON.stringify(Object.assign(Object.assign({ time, label, level: m.level.toLocaleUpperCase() }, filetrans ? { meta: msg } : null), dbtrans ? { message: msg, meta } : null));
};
exports.printMsg = printMsg;
const makeFormat = (name) => combine(label({ label: name }), timestamp({ "alias": "time" }), printf(exports.printMsg));
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
const postLogMsg = (logger, k, str) => __awaiter(void 0, void 0, void 0, function* () {
    const meta = JSON.parse(str);
    const flag = logger_types_1.WinstonLoggerLevels[k];
    const { file, db, dbCustom } = logger;
    const priority = { dbCustom, db, file };
    try {
        for (const l in priority)
            if (priority[l])
                switch (l) {
                    case "dbCustom": {
                        const func = dbCustom[k];
                        return yield func(meta);
                    }
                    case "db": {
                        yield oba_common_1.default.sleep(5);
                        const func = db.info;
                        return yield func(flag, { meta });
                    }
                    case "file": {
                        const func = file[k].bind(file);
                        return func(str);
                    }
                    default: return;
                }
    }
    catch (e_) {
        throw e_;
    }
});
exports.postLogMsg = postLogMsg;
//# sourceMappingURL=logger-utils.js.map