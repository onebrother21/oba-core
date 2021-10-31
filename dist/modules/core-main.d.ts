import { OBACoreType, OBACoreConfig } from "./core-types";
import { Enum } from "@onebro/oba-common";
export declare type OBACoreEvents<EV> = EV & Enum<boolean, "init" | "shutdown">;
export interface OBACoreApi<EV> extends OBACoreType<OBACoreEvents<EV>> {
}
export declare class OBACoreApi<EV> {
    start: () => Promise<void>;
    constructor(config: OBACoreConfig);
}
export default OBACoreApi;
export * from "./core-types";
