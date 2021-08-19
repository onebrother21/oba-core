import { OBACoreLoggerType, OBACoreLoggerConfig } from "./logger-types";
export interface OBACoreLogger extends OBACoreLoggerType {
}
export declare class OBACoreLogger {
    constructor(config: OBACoreLoggerConfig);
}
export default OBACoreLogger;
export * from "./logger-types";
