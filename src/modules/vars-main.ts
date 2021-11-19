import { OBACoreVarsType,OBACoreVarsConfig } from "./vars-types";

export interface OBACoreVars extends OBACoreVarsType {}
export class OBACoreVars {
  set(vars:OBACoreVarsConfig){Object.assign(this,vars);}
  constructor(config:OBACoreVarsConfig){this.set(config);}
}
export default OBACoreVars;