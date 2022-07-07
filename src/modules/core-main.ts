import {OBACoreLogger} from "./logger-main";
import {OBACoreDB} from "./db-main";
import {OBACoreErrorFactory} from "./error-factory-main";
import {OBACoreType,OBACoreConfigType} from "./core-types";
import {Component,AnyBoolean} from "@onebro/oba-common";

export type OBACoreConfig = OBACoreConfigType & {e?:OBACoreConfigType["errors"]};
export interface OBACore<Ev = undefined> extends Component<OBACoreConfig,Ev>,OBACoreType {}
export class OBACore<Ev = undefined> extends Component<OBACoreConfig,Ev> {
  get e(){return this.errors;}
  get v(){return this.vars;}
  set v(vars:OBACore<Ev>["vars"]){this.vars = vars;}
  init = async (startDb?:AnyBoolean) => {
    const {config:{db,logger,e,errors,vars}} = this;
    this.vars = vars || null;
    this.errors = new OBACoreErrorFactory(e||errors||{});
    this.db = db?new OBACoreDB(db):null;
    this.logger = logger?new OBACoreLogger(logger):null;
    await this.e.init();
    await this.db?.init(startDb);
    await this.logger?.init(this.db);
  };
}
export default OBACore;