import {OBACoreVars} from "./vars-main";
import {OBACoreErrorFactory} from "./error-factory-main";
import {OBACoreEmitter} from "./emitter-main";
import {OBACoreLogger} from "./logger-main";
import {OBACoreDB} from "./db-main";
import {OBACoreType,OBACoreConfig} from "./core-types";
import OBA,{Enum} from "@onebro/oba-common";

export type OBACoreEvents<EV> = EV & Enum<boolean,"init"|"shutdown">;
export interface OBACoreApi<EV> extends OBACoreType<OBACoreEvents<EV>> {}
export class OBACoreApi<EV> {
  start = async():Promise<void> => await this.db.start();
  constructor(config:OBACoreConfig) {
    this.config = config;
    for(const k in this.config){
      switch(k){
        case "vars":this.vars = new OBACoreVars(config.vars);
        case "events":this.events = new OBACoreEmitter<OBACoreEvents<EV>>();break;
        case "errors":this.e = new OBACoreErrorFactory(config.errors);break;
        case "logger":this.logger = new OBACoreLogger(config.logger);break;
        case "db":this.db = new OBACoreDB(config.db);break;
        default:break;
      }
    }
    if(this.events){
      const badsignals = ["SIGUSR2","SIGINT","SIGTERM","exit"];
      for(const i of badsignals) process.on(i,() => OBA.warn("SYSTEM TERMINATING ::",i) && this.events.emit("shutdown",true as any));
      this.events.on("init",() => OBA.ok(this.vars.name," Running @...",Date.now()));
    }
    if(this.vars && this.vars.verbose) this.events.emit("init",true as any);
  }
}
export default OBACoreApi;
export * from "./core-types";