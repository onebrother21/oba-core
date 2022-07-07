import { OBACoreErrorFactory } from "./error-factory-main";
import { OBACoreType, OBACoreConfigType } from "./core-types";
import { Component, AnyBoolean } from "@onebro/oba-common";
export declare type OBACoreConfig = OBACoreConfigType & {
    e?: OBACoreConfigType["errors"];
};
export interface OBACore<Ev = undefined> extends Component<OBACoreConfig, Ev>, OBACoreType {
}
export declare class OBACore<Ev = undefined> extends Component<OBACoreConfig, Ev> {
    get e(): OBACoreErrorFactory;
    get v(): OBACore<Ev>["vars"];
    set v(vars: OBACore<Ev>["vars"]);
    init: (startDb?: AnyBoolean) => Promise<void>;
}
export default OBACore;
