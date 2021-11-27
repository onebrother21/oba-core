import OBACoreBaseApi from "@onebro/oba-core-base-api";
import {OBACoreLogger} from "./logger-main";
import {OBACoreDB} from "./db-main";
import {OBACoreType,OBACoreConfig} from "./core-types";
import {Component,AnyBoolean} from "@onebro/oba-common";

export interface OBACoreApi<Ev> extends Component<OBACoreConfig,Ev>,OBACoreType<Ev> {}
export class OBACoreApi<Ev> extends Component<OBACoreConfig,Ev> {
  get e(){return this.errors;}
  get v(){return this.vars;}
  set v(vars:OBACoreApi<Ev>["vars"]){this.vars = vars;}
  init = async (startDb?:AnyBoolean) => {
    const {ctrl,config:{db,logger,...baseConfig}} = this;
    const base = new OBACoreBaseApi<Ev>(baseConfig,ctrl);
    await base.init();
    const {errors,vars} = base;
    this.vars = vars;
    this.errors = errors;
    this.logger = logger?new OBACoreLogger<Ev>(logger,ctrl):null;
    this.db = db?new OBACoreDB<Ev>(db,ctrl):null;
    await this.logger?.init();
    startDb?await this.db?.init():null;
  };
}
export default OBACoreApi;