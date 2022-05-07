
import fs from "fs";
import path from "path";
import OB,{ Keys,AnyObj } from "@onebro/oba-common";
import winston,{LogEntry,transports,format, loggers} from "winston";
import {MongoDB} from "winston-mongodb";
import {
  WinstonTransportFileConfig,
  WinstonTransportMongoDbConfig,
  WinstonLoggerLevel,
  WinstonLoggerLevels,
  WinstonLoggerTypes,
  OBACoreLoggerType
} from "./logger-types";

const {combine,label,timestamp,printf,errors,json} = format;
export const levels = {crit:0,error:1,warn:2,info:3,access:4,debug:5};
export const levelGuard = (level:string) => format(info => info.level === level?info:null)();
export const printMsg = (m:LogEntry) => {
  const {message,label,level,time,meta} = m;
  const msg:string|AnyObj = OB.parse(message);
  const filetrans = OB.obj(msg) && !meta;
  const dbtrans = OB.str(msg) && meta;
  return OB.stringify({
  time,label,level:m.level.toLocaleUpperCase(),
  ...filetrans?{meta:msg as AnyObj}:null,
  ...dbtrans?{message:msg as string,meta}:null,
});};
export const makeFormat = (name:string) => combine(label({label:name}),timestamp({"alias":"time"}),printf(printMsg));
export const makeFileTransport = (o:WinstonTransportFileConfig) => new transports.File({
  format:levelGuard(o.level),
  filename:path.join(o.dirname,`/${o.level}.log`),
  level:o.level,
  handleExceptions:o.level == "error"||o.level == "crit"
});
export const makeMongoDbTransport = (o:WinstonTransportMongoDbConfig) => new MongoDB(o);
export const makeWinstonLogger = <T extends "file"|"db">(
  label:string,
  type:T,
  o:(WinstonTransportFileConfig|WinstonTransportMongoDbConfig)[]) => winston.createLogger({
  levels,
  format:makeFormat(label),
  transports:o.map(t => type == "file"?makeFileTransport(t as any):makeMongoDbTransport({...t,label} as any)),
  exitOnError:false,
});
export const makeLocalDir = (path:string) => fs.existsSync(path)||fs.mkdirSync(path);
export const postLogMsg = async (logger:OBACoreLoggerType,k:WinstonLoggerLevel,str:string):Promise<any> => {
  const meta = JSON.parse(str);
  const flag = WinstonLoggerLevels[k];
  const {file,db,dbCustom} = logger;
  const priority:WinstonLoggerTypes = {dbCustom,db,file};
  try{
    for(const l in priority) if(priority[l as Keys<WinstonLoggerTypes>]) switch(l){
      case "dbCustom":{
        const func = dbCustom[k];
        return await func(meta);
      }
      case "db":{
        await OB.sleep(5);
        const func = db.info;
        return await func(flag,{meta} as any);
      }
      case "file":{
        const func = file[k].bind(file) as Function;
        return func(str);
      }
      default:return;
    }
  }
  catch(e_){throw e_;}
};