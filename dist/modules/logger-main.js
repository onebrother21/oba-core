"use strict";
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
//# sourceMappingURL=logger-main.js.map