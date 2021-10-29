"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
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
exports.OBACoreApi = void 0;
const vars_main_1 = require("./vars-main");
const error_factory_main_1 = require("./error-factory-main");
const emitter_main_1 = require("./emitter-main");
const logger_main_1 = require("./logger-main");
const db_main_1 = require("./db-main");
const oba_common_1 = __importDefault(require("@onebro/oba-common"));
class OBACoreApi {
    constructor(config) {
        this.start = () => __awaiter(this, void 0, void 0, function* () { return yield this.db.start(); });
        this.config = config;
        if (config.events)
            this.events = new emitter_main_1.OBACoreEmitter();
        if (config.errors)
            this.e = new error_factory_main_1.OBACoreErrorFactory(config.errors);
        if (config.vars)
            this.vars = new vars_main_1.OBACoreVars(config.vars);
        if (config.logger)
            this.logger = new logger_main_1.OBACoreLogger(config.logger);
        if (config.db)
            this.db = new db_main_1.OBACoreDB(config.db);
        if (config.vars && config.vars.verbose)
            oba_common_1.default.ok(this.vars.name, " Running @...", Date.now());
    }
}
exports.OBACoreApi = OBACoreApi;
exports.default = OBACoreApi;
__exportStar(require("./core-types"), exports);
//# sourceMappingURL=core-main.js.map