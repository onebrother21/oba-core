"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OBACoreVars = void 0;
class OBACoreVars {
    set(vars) { Object.assign(this, vars); }
    constructor(config) {
        this.name = config.name;
        this.host = process.env.HOST || config.host;
        this.port = Number(process.env.PORT) || config.port;
        this.env = process.env.NODE_ENV;
        this.entry = config.entry;
    }
}
exports.OBACoreVars = OBACoreVars;
exports.default = OBACoreVars;
__exportStar(require("./vars-types"), exports);
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
//# sourceMappingURL=vars-main.js.map