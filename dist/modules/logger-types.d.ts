import winston from "winston";
import { MongoClient } from "mongodb";
import { Enum, Info, Keys } from "@onebro/oba-common";
import { ConnectionOpts } from "./db-types";
import { OBACoreLoggerDbCustomWrapper } from "./logger-db-custom";
export declare type WinstonQueryOpts = winston.QueryOptions;
export declare type WinstonQuery = (o: WinstonQueryOpts, cb: (e: Error, results: any) => void) => any;
export declare type WinstonLoggerLevels = {
    crit: number;
    error: number;
    warn: number;
    info: number;
    access: number;
    debug: number;
};
export declare type WinstonTransportConfig = {
    level: string;
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
    name: string;
    dateStub?: string;
    capSize: number;
};
export declare type LeveledDbLogFlag = "ACCESS" | "ERROR" | "INFO" | "WARN" | "DEBUG" | "CRIT";
export declare type LeveledDbLogMethod = (s: LeveledDbLogFlag, meta?: Info<"meta">) => Promise<LeveledDbLogMethod>;
export declare type WinstonLoggerNoMethods = Omit<winston.Logger, Keys<WinstonLoggerLevels>>;
export declare type WinstonLoggerFileType = WinstonLoggerNoMethods & Enum<winston.LeveledLogMethod, Keys<WinstonLoggerLevels>>;
export declare type WinstonLoggerDBType = WinstonLoggerNoMethods & Enum<LeveledDbLogMethod, Keys<WinstonLoggerLevels>>;
export declare type OBACoreLoggerConfigType = {
    label: string;
    file?: WinstonTransportFileConfig[];
    db?: WinstonTransportMongoDbConfig[];
    dbCustom?: WinstonTransportCustomDbConfig[];
};
export declare type OBACoreLoggerType = {
    makeDir: (path: string) => true | void;
    file?: WinstonLoggerFileType;
    db?: WinstonLoggerDBType;
    dbCustom?: OBACoreLoggerDbCustomWrapper;
};
