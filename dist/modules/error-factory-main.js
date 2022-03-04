"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OBACoreErrorFactory = void 0;
const mongodb_1 = require("mongodb");
const oba_common_1 = __importStar(require("@onebro/oba-common"));
class OBACoreErrorFactory extends oba_common_1.Component {
    constructor() {
        super(...arguments);
        this.init = () => __awaiter(this, void 0, void 0, function* () { this._ = {}; for (const k in this.config)
            this._[k] = this.make.bind(null, this.config[k], k); });
    }
    format(e) { return new oba_common_1.AppError(e); }
    make(e, k, status, data) {
        const errCode = k.toLocaleUpperCase();
        const errStatus = oba_common_1.default.num(status) ? status : e.status;
        const errData = oba_common_1.default.str(status) ? status : data;
        const errMsg = errData ? e.message.replace("%s", errData) : e.message;
        const modified = Object.assign({}, e, {
            status: errStatus,
            code: errCode,
            message: errMsg,
        });
        return new oba_common_1.AppError(modified);
    }
    mapKnownError(e) {
        switch (true) {
            case oba_common_1.default.match(/authorized/i, e.name, e.message):
            case oba_common_1.default.match(/jsonwebtoken/i, e.name, e.message):
            case oba_common_1.default.match(/jwt/i, e.name, e.message): return this._.unauthorized("user");
            case oba_common_1.default.match(/csrf/i, e.name, e.message): return this._.csrf();
            case oba_common_1.default.match(/cast/i, e.name, e.message): return this._.castError();
            case oba_common_1.default.match(/validation/i, e.name, e.message): return this._.validation();
            case e instanceof mongodb_1.MongoServerError || oba_common_1.default.match(/mongo/i, e.name, e.message): return this.format(e);
            default: return this._.someError();
        }
    }
    map(e) {
        const errTemplate = this.mapKnownError(e);
        const errObj = Object.assign(Object.assign({}, errTemplate.json()), { info: e.message, stack: e.stack });
        errObj.status = e.status || errObj.status;
        return new oba_common_1.AppError(errObj);
    }
}
exports.OBACoreErrorFactory = OBACoreErrorFactory;
exports.default = OBACoreErrorFactory;
//# sourceMappingURL=error-factory-main.js.map