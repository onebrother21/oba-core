import { Component } from "@onebro/oba-common";
import { OBACoreLoggerType, OBACoreLoggerConfigType } from "./logger-types";
import { OBACoreDB } from "./db-main";
export declare type OBACoreLoggerConfig = OBACoreLoggerConfigType;
export interface OBACoreLogger extends Component<OBACoreLoggerConfig>, OBACoreLoggerType {
}
export declare class OBACoreLogger extends Component<OBACoreLoggerConfig> {
    private createFileLogger;
    private createDBLogger;
    private createDBCustomLogger;
    init: (db?: OBACoreDB) => Promise<void>;
}
export default OBACoreLogger;
