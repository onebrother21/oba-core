import {OBACoreVars} from "./vars-main";
import {OBACoreErrorFactory} from "./error-factory-main";
import {OBACoreEmitter} from "./emitter-main";
import {OBACoreLogger} from "./logger-main";
import {OBACoreDB} from "./db-main";
import {OBACoreType,OBACoreConfig} from "./core-types";

export interface OBACoreApi<EV> extends OBACoreType<EV> {}
export class OBACoreApi<EV> {
  start = async():Promise<void> => await this.db.start();
  constructor(config:OBACoreConfig) {
    this.config = config;
    for(const k in this.config){
      switch(k){
        case "vars":this.vars = new OBACoreVars(config.vars);
        case "events":this.events = new OBACoreEmitter<EV>();break;
        case "errors":this.e = new OBACoreErrorFactory(config.errors);break;
        case "logger":this.logger = new OBACoreLogger(config.logger);break;
        case "db":this.db = new OBACoreDB(config.db);break;
        default:break;
      }
    }
  }
}
export default OBACoreApi;
export * from "./core-types";