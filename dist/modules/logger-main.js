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
exports.OBACoreLogger = void 0;
const logger_utils_1 = require("./logger-utils");
const oba_common_1 = require("@onebro/oba-common");
class OBACoreLogger extends oba_common_1.Component {
    constructor() {
        super(...arguments);
        this.init = () => __awaiter(this, void 0, void 0, function* () {
            const { label, file, db } = this.config;
            this.getMsg = logger_utils_1.makeLogMsg;
            this.makeDir = logger_utils_1.makeDir;
            if (file && file.length) {
                const firstTrans = file[0];
                const dirname = (firstTrans === null || firstTrans === void 0 ? void 0 : firstTrans.dirname) || null;
                firstTrans ? this.makeDir(dirname) : null;
                const logger = (0, logger_utils_1.makeLogger)(label, "file", file);
                this.file = logger;
            }
            if (db && db.length) {
                const logger = (0, logger_utils_1.makeLogger)(label, "db", db);
                this.db = logger;
            }
        });
    }
}
exports.OBACoreLogger = OBACoreLogger;
exports.default = OBACoreLogger;
//# sourceMappingURL=logger-main.js.map