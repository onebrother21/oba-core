import { OBACoreType, OBACoreConfig } from "./core-types";
export interface OBACoreApi<Ev> extends OBACoreType<Ev> {
}
export declare class OBACoreApi<Ev> {
    config: OBACoreConfig<Ev>;
    constructor(config: OBACoreConfig<Ev>);
    init: () => void;
    start: () => Promise<void>;
}
export default OBACoreApi;
export * from "./core-types";
