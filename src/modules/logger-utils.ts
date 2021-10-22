import fs from "fs";
import path from "path";
import winston,{LogEntry,transports,format} from "winston";
import { WinstonLoggerType,WinstonLoggerConfig,} from "./logger-types";
import { AppError,appLocals as locals} from "@onebro/oba-common";

const {combine,label,timestamp,printf} = format;
export const levels = {crit:0,error:1,warn:2,info:3,access:4,debug:5};
export const levelGuard = (level:string) => format(info => info.level === level?info:null)();
export const printMsg = (m:LogEntry) => `${m.timestamp} [${m.label}] ${m.level}:${m.message}`;
export const makeFormat = (name:string) => combine(label({label:name}),timestamp(),printf(printMsg));
export const makeDir = (path:string) => fs.existsSync(path)||fs.mkdirSync(path);
export const makeTransport = (level:string,dirname:string) => new (transports.File)({
  format:levelGuard(level),
  filename:path.join(dirname,`/${level}.log`),
  level,
  handleExceptions:level == "error"||level == "critical"});
export const makeLogMsg = (e:AppError|any) => {
  switch(true){
    case e instanceof Error:{
      return `{
        time:${new Date().toLocaleString("en-US",locals.dateFormat as any)},
        name:${e.name},
        message:"${e.message}",
        warning:${!!e.warning},
        status:${e.status},
        code:${e.code?e.code.toString():"-"},
        info:"${e.info?JSON.stringify(e.info):null}",
        errors":${e.errors?JSON.stringify(e.errors):"-"}",
        stack:${e.stack},
      }`;
    }
    default:{
      return `{
        time:${new Date().toLocaleString("en-US",locals.dateFormat as any)},
      }`;
    }
  }
};
//create access msg
export const makeLogger = (c:WinstonLoggerConfig) => winston.createLogger({
  levels,
  format:makeFormat(c.label),
  transports:c.levels.map(l => makeTransport(l,c.dirname)),
  exitOnError:false
}) as WinstonLoggerType;