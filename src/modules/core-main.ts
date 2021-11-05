import {OBACoreVars} from "./vars-main";
import {OBACoreErrorFactory} from "./error-factory-main";
import {OBACoreEmitter} from "./emitter-main";
import {OBACoreLogger} from "./logger-main";
import {OBACoreDB} from "./db-main";
import {OBACoreType,OBACoreConfig} from "./core-types";
import { Keys } from "@onebro/oba-common";

export interface OBACoreApi<Ev> extends OBACoreType<Ev> {}
export class OBACoreApi<Ev> {
  start = async():Promise<void> => await this.db.start();
  constructor(config:OBACoreConfig<Ev>) {
    this.config = config;
    const components:{[k in Keys<OBACoreConfig<Ev>>]:() => void;} = {
      vars:() => this.vars = new OBACoreVars(this.config.vars),
      events:() => this.events = new OBACoreEmitter<Ev>(this.config.events),
      errors:() => this.e = new OBACoreErrorFactory(this.config.errors),
      logger:() => this.logger = new OBACoreLogger(this.config.logger),
      db:() => this.db = new OBACoreDB(this.config.db),
    };
    for(const k in components) if(this.config[k as Keys<OBACoreConfig<Ev>>]) components[k as Keys<OBACoreConfig<Ev>>]();
  }
}
export default OBACoreApi;
export * from "./core-types";