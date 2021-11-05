import { OBACoreType, OBACoreConfig } from "./core-types";
export interface OBACoreApi<Ev> extends OBACoreType<Ev> {
}
export declare class OBACoreApi<Ev> {
    start: () => Promise<void>;
    constructor(config: OBACoreConfig<Ev>);
}
export default OBACoreApi;
export * from "./core-types";
