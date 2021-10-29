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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OBACoreLogger = void 0;
const logger_utils_1 = require("./logger-utils");
class OBACoreLogger {
    constructor(config) {
        const winstonLogger = (0, logger_utils_1.makeLogger)(config);
        const logger = Object.create(winstonLogger);
        logger.getMsg = logger_utils_1.makeLogMsg;
        logger.makeDir = logger_utils_1.makeDir;
        logger.makeDir(config.dirname);
        return logger;
    }
}
exports.OBACoreLogger = OBACoreLogger;
exports.default = OBACoreLogger;
__exportStar(require("./logger-types"), exports);
//# sourceMappingURL=logger-main.js.map