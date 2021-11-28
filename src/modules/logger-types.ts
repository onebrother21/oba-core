import winston from "winston";
import { AppError,Enum,Info,Keys } from "@onebro/oba-common";
import { DBConnectionOpts } from "./db-types";

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
  db:string|Promise<any>;
  silent?:boolean;
  options?:DBConnectionOpts;
  collection?:string;
  decolorize?:boolean;
  tryReconnect?:boolean;
  metaKey?:string;
  name?:string;
  expireAfterSeconds?:number;
};
export type LeveledDbLogFlag = `{"type":"${"ACCESS"|"ERROR"|"INFO"|"WARN"|"DEBUG"|"CRIT"}"}`;
export type LeveledDbLogMethod = (s:LeveledDbLogFlag,meta?:Info<"meta">) => Promise<LeveledDbLogMethod>;
export type WinstonLoggerNoMethods = Omit<winston.Logger,Keys<WinstonLoggerLevels>>;
export type WinstonLoggerFileType =  WinstonLoggerNoMethods & Enum<winston.LeveledLogMethod,Keys<WinstonLoggerLevels>>;
export type WinstonLoggerDBType =  WinstonLoggerNoMethods & Enum<LeveledDbLogMethod,Keys<WinstonLoggerLevels>>;
export type OBACoreLoggerConfig = {
  label:string;
  file?:WinstonTransportFileConfig[];
  db?:WinstonTransportMongoDbConfig[];
};
export type OBACoreLoggerType = {
  makeDir:(path:string) => true|void;
  getMsg:(e:AppError|any) => string;
  file?:WinstonLoggerFileType;
  db?:WinstonLoggerDBType;
};