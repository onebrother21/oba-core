import { OBACoreErrorFactory } from "./error-factory-main";
import { OBACoreType, OBACoreConfigType } from "./core-types";
import { Component, AnyBoolean } from "@onebro/oba-common";
export declare type OBACoreConfig = Partial<OBACoreConfigType>;
export interface OBACoreApi<Ev = undefined> extends Component<OBACoreConfig, Ev>, OBACoreType {
}
export declare class OBACoreApi<Ev = undefined> extends Component<OBACoreConfig, Ev> {
    get e(): OBACoreErrorFactory;
    get v(): OBACoreApi<Ev>["vars"];
    set v(vars: OBACoreApi<Ev>["vars"]);
    init: (startDb?: AnyBoolean) => Promise<void>;
}
export default OBACoreApi;
