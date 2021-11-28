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
    if(file && file.length){
      const firstTrans = file[0];
      const dirname = firstTrans?.dirname||null;
      firstTrans?this.makeDir(dirname):null;
      const logger = makeLogger(label,"file",file) as any;
      this.file = logger as WinstonLoggerFileType;
    }
    if(db && db.length){
      const logger = makeLogger(label,"db",db) as any;
      this.db = logger as WinstonLoggerDBType;
    }
  };
}
export default OBACoreLogger;