import OB, { AnyObj } from "@onebro/oba-common";
import path from "path";
import winston,{LogEntry,transports,format} from "winston";
import {MongoDB} from "winston-mongodb";
import {
  WinstonTransportFileConfig,
  WinstonTransportMongoDbConfig,
} from "./logger-types";

const {combine,label,timestamp,printf,errors,json} = format;
export const levels = {crit:0,error:1,warn:2,info:3,access:4,debug:5};
export const levelGuard = (level:string) => format(info => info.level === level?info:null)();
export const printMsg = (m:LogEntry) => {
  let msg:string|AnyObj ;
  try{msg = JSON.parse(m.message);}
  catch(e){msg = m.message;}
  const filetrans = OB.obj(msg) && !m.meta;
  const dbtrans = OB.str(msg) && m.meta;
  return JSON.stringify({
  time:m.timestamp,
  label:m.label,
  level:m.level.toLocaleUpperCase(),
  ...filetrans?{meta:msg as AnyObj}:null,
  ...dbtrans?{message:msg as string}:null,
});};
export const makeFormat = (name:string) => combine(label({label:name}),timestamp(),errors({stack:true}),printf(printMsg));
export const makeFileTransport = (o:WinstonTransportFileConfig) => new transports.File({
  format:levelGuard(o.level),
  filename:path.join(o.dirname,`/${o.level}.log`),
  level:o.level,
  handleExceptions:o.level == "error"||o.level == "crit"
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