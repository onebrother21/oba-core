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
exports.OBACore = void 0;
const logger_main_1 = require("./logger-main");
const db_main_1 = require("./db-main");
const error_factory_main_1 = require("./error-factory-main");
const oba_common_1 = require("@onebro/oba-common");
class OBACore extends oba_common_1.Component {
    constructor() {
        super(...arguments);
        this.init = (startDb) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const { config: { db, logger, e, errors, vars } } = this;
            this.vars = vars || null;
            this.errors = e || errors ? new error_factory_main_1.OBACoreErrorFactory(e || errors) : null;
            this.db = db ? new db_main_1.OBACoreDB(db) : null;
            this.logger = logger ? new logger_main_1.OBACoreLogger(logger) : null;
            yield ((_a = this.e) === null || _a === void 0 ? void 0 : _a.init());
            yield ((_b = this.db) === null || _b === void 0 ? void 0 : _b.init(startDb));
            yield ((_c = this.logger) === null || _c === void 0 ? void 0 : _c.init(this.db));
        });
    }
    get e() { return this.errors; }
    get v() { return this.vars; }
    set v(vars) { this.vars = vars; }
}
exports.OBACore = OBACore;
exports.default = OBACore;
//# sourceMappingURL=core-main.js.map