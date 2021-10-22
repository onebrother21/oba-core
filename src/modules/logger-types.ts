import winston from "winston";
import { AppError } from "@onebro/oba-common";

export type WinstonQueryOpts = {};
export type WinstonQuery = (o:WinstonQueryOpts,cb:(e:Error,results:any) => void) => any;
export type WinstonLoggerLevels = {
  crit:number;
  error:number;
  warn:number;
  info:number;
  access:number;
  debug:number;};
export type WinstonLoggerConfig = {
  levels:string[];
  dirname?:string;
  label?:string;
  uri?:string;};
export type OBACoreLoggerConfig = WinstonLoggerConfig;
export type WinstonLoggerType = winston.Logger & Record<keyof WinstonLoggerLevels, winston.LeveledLogMethod>;
export type OBACoreLoggerType = WinstonLoggerType & {makeDir:(path:string) => true|void;getMsg:(e:AppError) => string;};