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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OBACoreApi = void 0;
const vars_main_1 = require("./vars-main");
const error_factory_main_1 = require("./error-factory-main");
const emitter_main_1 = require("./emitter-main");
const logger_main_1 = require("./logger-main");
const db_main_1 = require("./db-main");
class OBACoreApi {
    constructor(config) {
        this.start = () => __awaiter(this, void 0, void 0, function* () { return yield this.db.start(); });
        this.config = config;
        for (const k in this.config) {
            switch (k) {
                case "vars": this.vars = new vars_main_1.OBACoreVars(config.vars);
                case "events":
                    this.events = new emitter_main_1.OBACoreEmitter();
                    break;
                case "errors":
                    this.e = new error_factory_main_1.OBACoreErrorFactory(config.errors);
                    break;
                case "logger":
                    this.logger = new logger_main_1.OBACoreLogger(config.logger);
                    break;
                case "db":
                    this.db = new db_main_1.OBACoreDB(config.db);
                    break;
                default: break;
            }
        }
    }
}
exports.OBACoreApi = OBACoreApi;
exports.default = OBACoreApi;
__exportStar(require("./core-types"), exports);
//# sourceMappingURL=core-main.js.map