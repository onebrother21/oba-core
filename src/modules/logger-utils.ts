import fs from "fs";
import path from "path";
import winston,{LogEntry,transports,format} from "winston";
import {MongoDB} from "winston-mongodb";
import {
  WinstonTransportFileConfig,
  WinstonTransportMongoDbConfig,
} from "./logger-types";
import { AppError } from "@onebro/oba-common";

const {combine,label,timestamp,printf,errors,json} = format;
export const levels = {crit:0,error:1,warn:2,info:3,access:4,debug:5};
export const levelGuard = (level:string) => format(info => info.level === level?info:null)();
export const printMsg = (m:LogEntry) => JSON.stringify({
  time:m.timestamp,
  label:m.label,
  level:m.level,
  ...JSON.parse(m.message),
});
export const makeFormat = (name:string) => combine(label({label:name}),timestamp(),errors({stack:true}),printf(printMsg));
export const makeFileTransport = (o:WinstonTransportFileConfig) => new transports.File({
  format:levelGuard(o.level),
  filename:path.join(o.dirname,`/${o.level}.log`),
  level:o.level,
  handleExceptions:o.level == "error"||o.level == "critical"
});
export const makeMongoDbTransport = (o:WinstonTransportMongoDbConfig) => new MongoDB(o);
export const makeLogger = <T extends "file"|"db">(
  label:string,
  type:T,
  o:(WinstonTransportFileConfig|WinstonTransportMongoDbConfig)[]) => winston.createLogger({
  levels,
  format:makeFormat(label),
  transports:o.map(t => type == "file"?makeFileTransport(t as any):makeMongoDbTransport({...t,label} as any)),
  exitOnError:false,
});
export const makeDir = (path:string) => fs.existsSync(path)||fs.mkdirSync(path);
export const makeLogMsg = (e:AppError|any) => {
  switch(true){
    case e instanceof Error:{
      return JSON.stringify({
        name:e.name,
        message:e.message,
        warning:!!e.warning,
        status:e.status,
        code:e.code?e.code.toString():"-",
        info:e.info||{},
        errors:e.errors||{},
        stack:e.stack,
      });
    }
    default:return JSON.stringify(e);
  }
};