import {OBACoreVars} from "./vars-main";
import {OBACoreErrorFactory} from "./error-factory-main";
import {OBACoreEmitter} from "./emitter-main";
import {OBACoreLogger} from "./logger-main";
import {OBACoreDB} from "./db-main";
import {OBACoreType,OBACoreConfig} from "./core-types";

export interface OBACoreApi<Ev> extends OBACoreType<Ev> {}
export class OBACoreApi<Ev> {
  constructor(public config:OBACoreConfig<Ev>){}
  init = () => {
    this.config.vars?this.vars = new OBACoreVars(this.config.vars):null;
    this.config.events?this.events = new OBACoreEmitter<Ev>(this.config.events):null;
    this.config.e||this.config.errors?this.e = new OBACoreErrorFactory(this.config.e||this.config.errors):null;
    this.config.logger?this.logger = new OBACoreLogger(this.config.logger):null;
    this.config.db?this.db = new OBACoreDB(this.config.db):null;
  };
  start = async():Promise<void> => await this.db.start();
}
export default OBACoreApi;
export * from "./core-types";