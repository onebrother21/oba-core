import { OBACoreLoggerType, OBACoreLoggerConfig } from "./logger-types";
import { Component } from "@onebro/oba-common";
export interface OBACoreLogger<Ev> extends Component<OBACoreLoggerConfig, Ev>, OBACoreLoggerType {
}
export declare class OBACoreLogger<Ev> extends Component<OBACoreLoggerConfig, Ev> {
    init: () => Promise<void>;
}
export default OBACoreLogger;
