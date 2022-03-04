import { Component } from "@onebro/oba-common";
import {
  OBACoreLoggerType,
  OBACoreLoggerConfigType,
  WinstonLoggerFileType,
  WinstonLoggerDBType,
} from "./logger-types";
import { makeLogger,makeDir,postLogMsg } from "./logger-utils";
import { OBACoreLoggerDbCustomWrapper } from "./logger-db-custom";
import { OBACoreDB } from "./db-main";

export type OBACoreLoggerConfig = OBACoreLoggerConfigType;
export interface OBACoreLogger extends Component<OBACoreLoggerConfig>,OBACoreLoggerType {}
export class OBACoreLogger extends Component<OBACoreLoggerConfig> {
  private createFileLogger = async () => {
    const {label,file:opts} = this.config;
    if(opts && opts.length){
      const firstTrans = opts[0];
      const dirname = firstTrans?.dirname||null;
      firstTrans?this.makeDir(dirname):null;
      const logger = makeLogger(label,"file",opts) as any;
      this.file = logger as WinstonLoggerFileType;
    }
  };
  private createDBLogger = async (db?:OBACoreDB) => {
    const {label,db:opts} = this.config;
    if(opts && opts.length && db){
      const promise = async () => db.connection.getClient();
      for(let i = 0,l = opts.length;i<l;i++) opts[i].db = promise() as any;
      const logger = makeLogger(label,"db",opts) as any;
      this.db = logger as WinstonLoggerDBType;
    }
  };
  private createDBCustomLogger = async (db?:OBACoreDB) => {
    const {label,dbCustom:opts} = this.config;
    if(opts && opts.length && db){
      const logger = new OBACoreLoggerDbCustomWrapper(label,opts);
      await logger.init(db);
      this.dbCustom = logger;
    }
  }
  init = async (db?:OBACoreDB) => {
    this.makeDir = makeDir;
    this.postLogMsg = postLogMsg.bind(null,this);
    await this.createFileLogger();
    await this.createDBLogger(db);
    await this.createDBCustomLogger(db);
  };
}
export default OBACoreLogger;