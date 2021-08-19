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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OBACoreErrors = void 0;
const mongodb_1 = require("mongodb");
const oba_common_1 = require("@onebro/oba-common");
const ob = __importStar(require("@onebro/oba-common"));
class OBACoreErrors {
    format(e) { return new oba_common_1.AppError(e); }
    make(e, k, status, data) {
        const errCode = k.toLocaleUpperCase();
        const errStatus = ob.num(status) ? status : e.status;
        const errData = ob.str(status) ? status : data;
        const errMsg = errData ? e.message.replace("%s", errData) : e.message;
        const modified = Object.assign({}, e, {
            status: errStatus,
            code: errCode,
            message: errMsg
        });
        return new oba_common_1.AppError(modified);
    }
    map(e) {
        const mapError = (e) => {
            switch (true) {
                case ob.match(/authorized/i, e.name, e.message): return this.unauthorized("user");
                case ob.match(/jsonwebtoken/i, e.name, e.message): return this.unauthorized("user");
                case ob.match(/jwt/i, e.name, e.message): return this.unauthorized("user");
                case ob.match(/csrf/i, e.name, e.message): return this.csrf();
                case ob.match(/cast/i, e.name, e.message): return this.castError();
                case ob.match(/validation/i, e.name, e.message): return this.validation();
                case e instanceof mongodb_1.MongoError || ob.match(/mongo/i, e.name, e.message): return this.format(e);
                default: return this.someError();
            }
        };
        const errTemplate = mapError(e);
        const errObj = Object.assign(Object.assign({}, errTemplate.json()), { info: e.message, stack: e.stack });
        errObj.status = e.status || errObj.status;
        return new oba_common_1.AppError(errObj);
    }
    constructor(config) { for (const k in config)
        this[k] = this.make.bind(null, config[k], k); }
}
exports.OBACoreErrors = OBACoreErrors;
exports.default = OBACoreErrors;
__exportStar(require("./error-factory-types"), exports);
//# sourceMappingURL=error-factory-main.js.map