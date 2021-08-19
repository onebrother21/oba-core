import { OBACoreVarsType,OBACoreVarsConfig } from "./vars-types";

export interface OBACoreVars extends OBACoreVarsType {}
export class OBACoreVars {
  set(vars:OBACoreVars){Object.assign(this,vars);}
  constructor(config:OBACoreVarsConfig){
    this.name = config.name;
    this.host = process.env.HOST||config.host;
    this.port = Number(process.env.PORT)||config.port;
    this.env = process.env.NODE_ENV;
    this.entry = config.entry;
  }
}
export default OBACoreVars;
export * from "./vars-types";
/*
export interface OBACoreVarsExt extends OBACoreVars {}
export class OBACoreVarsExt extends OBACoreVars{
  constructor(config:OBACoreVarsConfig){
    super(config);
    this.settings = config.settings;
    this.providers = config.providers||{};
    this.consumers = config.consumers||{};
    this.whitelist = config.whitelist||[];}}
export default OBACoreVarsExt;
*/