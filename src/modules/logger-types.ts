import winston from "winston";
import { MongoClient } from "mongodb";
import { Enum,Info,Keys,Values } from "@onebro/oba-common";
import { ConnectionOpts } from "./db-types";
import { OBACoreLoggerDbCustomWrapper } from "./logger-db-custom";

export type WinstonQueryOpts = winston.QueryOptions;
export type WinstonQuery = (o:WinstonQueryOpts,cb:(e:Error,results:any) => void) => any;
export type WinstonLoggerLevels = {
  crit:"CRIT";
  error:"ERROR";
  warn:"WARNING";
  info:"INFO";
  access:"ACCESS";
  debug:"DEBUG";
};
export const WinstonLoggerLevels:WinstonLoggerLevels = {
  crit:"CRIT",
  error:"ERROR",
  warn:"WARNING",
  info:"INFO",
  access:"ACCESS",
  debug:"DEBUG",
};
export type WinstonLoggerLevel = Keys<WinstonLoggerLevels>;
export type WinstonLoggerLevelFlag = Values<WinstonLoggerLevels>;
export type WinstonTransportConfig = {level:WinstonLoggerLevel;};
export type WinstonTransportFileConfig = WinstonTransportConfig & {dirname:string;};
export type WinstonTransportMongoDbConfig = WinstonTransportConfig & {
  label:string;
  db:string|Promise<MongoClient>;
  silent?:boolean;
  options?:ConnectionOpts;
  collection?:string;
  decolorize?:boolean;
  tryReconnect?:boolean;
  metaKey?:string;
  name?:string;
  expireAfterSeconds?:number;
};
export type WinstonTransportCustomDbConfig = WinstonTransportConfig & {
  name:string;
  dateStub?:string;
  capSize:number;
};
export type WinstonLoggerConfigs = {
  file?:WinstonTransportFileConfig[];
  db?:WinstonTransportMongoDbConfig[];
  dbCustom?:WinstonTransportCustomDbConfig[];
};
export type LogLevelDbMethod = (s:WinstonLoggerLevelFlag,meta?:Info<"meta">) => Promise<LogLevelDbMethod>;
export type WinstonLoggerNoMethods = Omit<winston.Logger,WinstonLoggerLevel>;

export type WinstonLoggerFileType =  WinstonLoggerNoMethods & Enum<winston.LeveledLogMethod,WinstonLoggerLevel>;
export type WinstonLoggerDBType =  WinstonLoggerNoMethods & Enum<LogLevelDbMethod,WinstonLoggerLevel>;
export type WinstonLoggerTypes = {
  file?:WinstonLoggerFileType;
  db?:WinstonLoggerDBType;
  dbCustom?:OBACoreLoggerDbCustomWrapper;
};

export type OBACoreLoggerConfigType = WinstonLoggerConfigs & {label:string;};
export type OBACoreLoggerType =  WinstonLoggerTypes & {
  makeLocalDir:(path:string) => true|void;
  postLogMsg:(k:WinstonLoggerLevel,msg:string) => Promise<any>;
};