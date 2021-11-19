"use strict";
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
        this.config = config;
        this.init = () => {
            this.config.vars ? this.vars = new vars_main_1.OBACoreVars(this.config.vars) : null;
            this.config.events ? this.events = new emitter_main_1.OBACoreEmitter(this.config.events) : null;
            this.config.e || this.config.errors ? this.e = new error_factory_main_1.OBACoreErrorFactory(this.config.e || this.config.errors) : null;
            this.config.logger ? this.logger = new logger_main_1.OBACoreLogger(this.config.logger) : null;
            this.config.db ? this.db = new db_main_1.OBACoreDB(this.config.db) : null;
        };
        this.start = () => __awaiter(this, void 0, void 0, function* () { return yield this.db.start(); });
    }
}
exports.OBACoreApi = OBACoreApi;
exports.default = OBACoreApi;
//# sourceMappingURL=core-main.js.map