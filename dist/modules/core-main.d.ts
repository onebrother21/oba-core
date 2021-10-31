import { OBACoreType, OBACoreConfig } from "./core-types";
export interface OBACoreApi<EV> extends OBACoreType<EV> {
}
export declare class OBACoreApi<EV> {
    start: () => Promise<void>;
    constructor(config: OBACoreConfig);
}
export default OBACoreApi;
export * from "./core-types";
