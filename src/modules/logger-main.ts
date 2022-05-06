import { Component } from "@onebro/oba-common";
import {
  OBACoreLoggerType,
  OBACoreLoggerConfigType,
  WinstonLoggerFileType,
  WinstonLoggerDBType,
} from "./logger-types";
import { makeWinstonLogger,makeLocalDir,postLogMsg } from "./logger-utils";
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
      firstTrans?this.makeLocalDir(dirname):null;
      const logger = makeWinstonLogger(label,"file",opts) as any;
      this.file = logger as WinstonLoggerFileType;
    }
  };
  private createDBLogger = async (db?:OBACoreDB) => {
    const {label,db:opts} = this.config;
    if(opts && opts.length && db){
      const promise = async () => db.connection.getClient();
      for(let i = 0,l = opts.length;i<l;i++) opts[i].db = promise() as any;
      const logger = makeWinstonLogger(label,"db",opts) as any;
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
    this.makeLocalDir = makeLocalDir;
    this.postLogMsg = postLogMsg.bind(null,this);
    const {config} = this;
    if(db && config.dbCustom) await this.createDBCustomLogger(db);
    else if(db && config.db) this.createDBLogger(db);
    else if(config.file) await this.createFileLogger();
    else return;
  };
}
export default OBACoreLogger;