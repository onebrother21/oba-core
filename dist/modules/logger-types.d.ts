import winston from "winston";
import { AppError, Enum, Keys } from "@onebro/oba-common";
import { DBConnectionOpts } from "./db-types";
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
    db: string | Promise<any>;
    silent?: boolean;
    options?: DBConnectionOpts;
    collection?: string;
    decolorize?: boolean;
    tryReconnect?: boolean;
    metaKey?: string;
    name?: string;
    expireAfterSeconds?: number;
};
export declare type WinstonLoggerFileType = winston.Logger & Enum<winston.LeveledLogMethod, Keys<WinstonLoggerLevels>>;
export declare type WinstonLoggerDBType = winston.Logger & Enum<Promise<any>, Keys<WinstonLoggerLevels>>;
export declare type OBACoreLoggerConfig = {
    label: string;
    file?: WinstonTransportFileConfig[];
    db?: WinstonTransportMongoDbConfig[];
};
export declare type OBACoreLoggerType = {
    makeDir: (path: string) => true | void;
    getMsg: (e: AppError) => string;
    file?: WinstonLoggerFileType;
    db?: WinstonLoggerDBType;
};
