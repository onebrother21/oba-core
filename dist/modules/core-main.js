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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OBACoreApi = void 0;
const oba_core_base_api_1 = __importDefault(require("@onebro/oba-core-base-api"));
const logger_main_1 = require("./logger-main");
const db_main_1 = require("./db-main");
const oba_common_1 = require("@onebro/oba-common");
class OBACoreApi extends oba_common_1.Component {
    constructor() {
        super(...arguments);
        this.init = (startDb) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const _c = this, { ctrl } = _c, _d = _c.config, { db, logger } = _d, baseConfig = __rest(_d, ["db", "logger"]);
            const base = new oba_core_base_api_1.default(baseConfig, ctrl);
            yield base.init();
            const { errors, vars } = base;
            this.vars = vars;
            this.errors = errors;
            this.logger = logger ? new logger_main_1.OBACoreLogger(logger, ctrl) : null;
            this.db = db ? new db_main_1.OBACoreDB(db, ctrl) : null;
            yield ((_a = this.logger) === null || _a === void 0 ? void 0 : _a.init());
            startDb ? yield ((_b = this.db) === null || _b === void 0 ? void 0 : _b.init()) : null;
        });
    }
    get e() { return this.errors; }
    get v() { return this.vars; }
    set v(vars) { this.vars = vars; }
}
exports.OBACoreApi = OBACoreApi;
exports.default = OBACoreApi;
//# sourceMappingURL=core-main.js.map