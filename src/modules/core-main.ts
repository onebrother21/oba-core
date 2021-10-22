import {OBACoreVars} from "./vars-main";
import {OBACoreErrorFactory} from "./error-factory-main";
import {OBACoreEmitter} from "./emitter-main";
import {OBACoreLogger} from "./logger-main";
import {OBACoreDB} from "./db-main";
import {OBACoreType,OBACoreConfig} from "./core-types";
import * as ob from "@onebro/oba-common";

export interface OBACoreApi<EV> extends OBACoreType<EV> {}
export class OBACoreApi<EV> {
  start = async():Promise<void> => await this.db.start();
  constructor(config:OBACoreConfig) {
    this.config = config;
    if(config.events) this.events = new OBACoreEmitter<EV>();
    if(config.errors) this.e = new OBACoreErrorFactory(config.errors);
    if(config.vars) this.vars = new OBACoreVars(config.vars);
    if(config.logger) this.logger = new OBACoreLogger(config.logger);
    if(config.db) this.db = new OBACoreDB(config.db);
    if(config.vars && config.vars.verbose) ob.ok(this.vars.name," Running @...",Date.now());
  }
}
export default OBACoreApi;
export * from "./core-types";