import { OBACoreType, OBACoreConfig } from "./core-types";
import { Component, AnyBoolean } from "@onebro/oba-common";
export interface OBACoreApi<Ev> extends Component<OBACoreConfig, Ev>, OBACoreType<Ev> {
}
export declare class OBACoreApi<Ev> extends Component<OBACoreConfig, Ev> {
    get e(): import("@onebro/oba-core-base-api").OBACoreBaseErrorFactory<Ev>;
    get v(): OBACoreApi<Ev>["vars"];
    set v(vars: OBACoreApi<Ev>["vars"]);
    init: (startDb?: AnyBoolean) => Promise<void>;
}
export default OBACoreApi;
