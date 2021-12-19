import fs from "fs";
import { Component } from "@onebro/oba-common";
import { makeLogger } from "./logger-utils";
import {
  OBACoreLoggerType,
  OBACoreLoggerConfigType,
  WinstonLoggerFileType,
  WinstonLoggerDBType,
} from "./logger-types";
import {OBACoreDB} from "./db-main";
import { OBACoreLoggerDbCustomWrapper } from "./logger-db-custom";

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
      for(let i = 0,l = opts.length;i<l;i++) opts[i].db = promise();
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
    await this.createFileLogger();
    await this.createDBLogger(db);
    await this.createDBCustomLogger(db);
  };
  makeDir = (path:string) => fs.existsSync(path)||fs.mkdirSync(path);
}
export default OBACoreLogger;