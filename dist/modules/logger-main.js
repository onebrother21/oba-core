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
const oba_common_1 = require("@onebro/oba-common");
const logger_utils_1 = require("./logger-utils");
const logger_db_custom_1 = require("./logger-db-custom");
class OBACoreLogger extends oba_common_1.Component {
    constructor() {
        super(...arguments);
        this.createFileLogger = () => __awaiter(this, void 0, void 0, function* () {
            const { label, file: opts } = this.config;
            if (opts && opts.length) {
                const firstTrans = opts[0];
                const dirname = (firstTrans === null || firstTrans === void 0 ? void 0 : firstTrans.dirname) || null;
                firstTrans ? this.makeDir(dirname) : null;
                const logger = (0, logger_utils_1.makeLogger)(label, "file", opts);
                this.file = logger;
            }
        });
        this.createDBLogger = (db) => __awaiter(this, void 0, void 0, function* () {
            const { label, db: opts } = this.config;
            if (opts && opts.length && db) {
                const promise = () => __awaiter(this, void 0, void 0, function* () { return db.connection.getClient(); });
                for (let i = 0, l = opts.length; i < l; i++)
                    opts[i].db = promise();
                const logger = (0, logger_utils_1.makeLogger)(label, "db", opts);
                this.db = logger;
            }
        });
        this.createDBCustomLogger = (db) => __awaiter(this, void 0, void 0, function* () {
            const { label, dbCustom: opts } = this.config;
            if (opts && opts.length && db) {
                const logger = new logger_db_custom_1.OBACoreLoggerDbCustomWrapper(label, opts);
                yield logger.init(db);
                this.dbCustom = logger;
            }
        });
        this.init = (db) => __awaiter(this, void 0, void 0, function* () {
            this.makeDir = logger_utils_1.makeDir;
            this.postLogMsg = logger_utils_1.postLogMsg.bind(null, this);
            yield this.createFileLogger();
            yield this.createDBLogger(db);
            yield this.createDBCustomLogger(db);
        });
    }
}
exports.OBACoreLogger = OBACoreLogger;
exports.default = OBACoreLogger;
//# sourceMappingURL=logger-main.js.map