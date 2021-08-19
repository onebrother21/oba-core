import { OBACoreVarsType, OBACoreVarsConfig } from "./vars-types";
export interface OBACoreVars extends OBACoreVarsType {
}
export declare class OBACoreVars {
    set(vars: OBACoreVars): void;
    constructor(config: OBACoreVarsConfig);
}
export default OBACoreVars;
export * from "./vars-types";
