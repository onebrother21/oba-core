import winston from "winston";
import { MongoClient } from "mongodb";
import { Enum, Info, Keys, Values } from "@onebro/oba-common";
import { ConnectionOpts } from "./db-types";
import { OBACoreLoggerDbCustomWrapper } from "./logger-db-custom";
export declare type WinstonQueryOpts = winston.QueryOptions;
export declare type WinstonQuery = (o: WinstonQueryOpts, cb: (e: Error, results: any) => void) => any;
export declare type WinstonLoggerLevels = {
    crit: "CRIT";
    error: "ERROR";
    warn: "WARNING";
    info: "INFO";
    access: "ACCESS";
    debug: "DEBUG";
};
export declare const WinstonLoggerLevels: WinstonLoggerLevels;
export declare type WinstonLoggerLevel = Keys<WinstonLoggerLevels>;
export declare type WinstonLoggerLevelFlag = Values<WinstonLoggerLevels>;
export declare type WinstonTransportConfig = {
    level: WinstonLoggerLevel;
};
export declare type WinstonTransportFileConfig = WinstonTransportConfig & {
    dirname: string;
};
export declare type WinstonTransportMongoDbConfig = WinstonTransportConfig & {
    label: string;
    db: string | Promise<MongoClient>;
    silent?: boolean;
    options?: ConnectionOpts;
    collection?: string;
    decolorize?: boolean;
    tryReconnect?: boolean;
    metaKey?: string;
    name?: string;
    expireAfterSeconds?: number;
};
export declare type WinstonTransportCustomDbConfig = WinstonTransportConfig & {
    collection: string;
    capSize: number;
    dateStub?: string;
};
export declare type WinstonLoggerConfigs = {
    file?: WinstonTransportFileConfig[];
    db?: WinstonTransportMongoDbConfig[];
    dbCustom?: WinstonTransportCustomDbConfig[];
};
export declare type LogLevelDbMethod = (s: WinstonLoggerLevelFlag, meta?: Info<"meta">) => Promise<LogLevelDbMethod>;
export declare type WinstonLoggerNoMethods = Omit<winston.Logger, WinstonLoggerLevel>;
export declare type WinstonLoggerFileType = WinstonLoggerNoMethods & Enum<winston.LeveledLogMethod, WinstonLoggerLevel>;
export declare type WinstonLoggerDBType = WinstonLoggerNoMethods & Enum<LogLevelDbMethod, WinstonLoggerLevel>;
export declare type WinstonLoggerTypes = {
    file?: WinstonLoggerFileType;
    db?: WinstonLoggerDBType;
    dbCustom?: OBACoreLoggerDbCustomWrapper;
};
export declare type OBACoreLoggerConfigType = WinstonLoggerConfigs & {
    label: string;
};
export declare type OBACoreLoggerType = WinstonLoggerTypes & {
    makeLocalDir: (path: string) => true | void;
    postLogMsg: (k: WinstonLoggerLevel, msg: string) => Promise<any>;
};
