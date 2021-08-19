import {OBACoreVars} from "./vars-main";
import {OBACoreErrors} from "./error-factory-main";
import {OBACoreEmitter} from "./emitter-main";
import {OBACoreLogger} from "./logger-main";
import {OBACoreDB} from "./db-main";
import {OBACoreType,OBACoreConfig} from "./core-types";
import * as ob from "@onebro/oba-common";

export interface OBACore<EV> extends OBACoreType<EV> {}
export class OBACore<EV> {
  start = async():Promise<void> => await this.db.start();
  constructor(config:OBACoreConfig) {
    this.config = config;
    if(config.events) this.events = new OBACoreEmitter<EV>(config.events);
    if(config.errors) this.e = new OBACoreErrors(config.errors);
    if(config.vars) this.vars = new OBACoreVars(config.vars);
    if(config.logger) this.logger = new OBACoreLogger(config.logger);
    if(config.db) this.db = new OBACoreDB(config.db);
    if(config.vars && config.vars.verbose) ob.ok("OBA Core Api configuration done...");
  }
}
export default OBACore;
export * from "./core-types";