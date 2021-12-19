import winston from "winston";
import { MongoClient } from "mongodb";
import { Enum,Info,Keys } from "@onebro/oba-common";
import { ConnectionOpts } from "./db-types";
import { OBACoreLoggerDbCustomWrapper } from "./logger-db-custom";

export type WinstonQueryOpts = winston.QueryOptions;
export type WinstonQuery = (o:WinstonQueryOpts,cb:(e:Error,results:any) => void) => any;
export type WinstonLoggerLevels = {
  crit:number;
  error:number;
  warn:number;
  info:number;
  access:number;
  debug:number;
};
export type WinstonTransportConfig = {level:string;};
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
export type LeveledDbLogFlag = "ACCESS"|"ERROR"|"INFO"|"WARN"|"DEBUG"|"CRIT";
export type LeveledDbLogMethod = (s:LeveledDbLogFlag,meta?:Info<"meta">) => Promise<LeveledDbLogMethod>;
export type WinstonLoggerNoMethods = Omit<winston.Logger,Keys<WinstonLoggerLevels>>;
export type WinstonLoggerFileType =  WinstonLoggerNoMethods & Enum<winston.LeveledLogMethod,Keys<WinstonLoggerLevels>>;
export type WinstonLoggerDBType =  WinstonLoggerNoMethods & Enum<LeveledDbLogMethod,Keys<WinstonLoggerLevels>>;
export type OBACoreLoggerConfigType = {
  label:string;
  file?:WinstonTransportFileConfig[];
  db?:WinstonTransportMongoDbConfig[];
  dbCustom?:WinstonTransportCustomDbConfig[];
};
export type OBACoreLoggerType = {
  makeDir:(path:string) => true|void;
  file?:WinstonLoggerFileType;
  db?:WinstonLoggerDBType;
  dbCustom?:OBACoreLoggerDbCustomWrapper;
};