import { OBACoreType, OBACoreConfig } from "./core-types";
export interface OBACore<EV> extends OBACoreType<EV> {
}
export declare class OBACore<EV> {
    start: () => Promise<void>;
    constructor(config: OBACoreConfig);
}
export default OBACore;
export * from "./core-types";
