import { makeDir,makeLogMsg,makeLogger } from "./logger-utils";
import { OBACoreLoggerType,OBACoreLoggerConfig } from "./logger-types";

export interface OBACoreLogger extends OBACoreLoggerType {}
export class OBACoreLogger {
  constructor(config:OBACoreLoggerConfig){
    const winstonLogger = makeLogger(config);
    const logger:OBACoreLogger = Object.create(winstonLogger);
    logger.getMsg = makeLogMsg;
    logger.makeDir = makeDir;
    logger.makeDir(config.dirname);
    return logger as OBACoreLogger;}}
export default OBACoreLogger;
export * from "./logger-types";