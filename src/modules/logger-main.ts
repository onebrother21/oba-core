import { makeDir,makeLogMsg,makeLogger } from "./logger-utils";
import {
  OBACoreLoggerType,
  OBACoreLoggerConfig,
  WinstonLoggerFileType,
  WinstonLoggerDBType,
} from "./logger-types";
import { Component } from "@onebro/oba-common";

export interface OBACoreLogger<Ev> extends Component<OBACoreLoggerConfig,Ev>,OBACoreLoggerType {}
export class OBACoreLogger<Ev> extends Component<OBACoreLoggerConfig,Ev> {
  init = async () => {
    const {label,file,db} = this.config;
    this.getMsg = makeLogMsg;
    this.makeDir = makeDir;
    switch(true){
      case file && file.length && true:{
        const firstTrans = file[0];
        const dirname = firstTrans?.dirname||null;
        firstTrans?this.makeDir(dirname):null;
        const logger = makeLogger(label,"file",file) ;
        this.file = logger as WinstonLoggerFileType;
        break;
      }
      case db && db.length && true:{
        const logger = makeLogger(label,"db",db);
        this.db = logger as WinstonLoggerDBType;
        break;
      }
      default:break;
    }
  };
}
export default OBACoreLogger;