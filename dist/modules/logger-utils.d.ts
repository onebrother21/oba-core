import winston, { LogEntry } from "winston";
import { WinstonTransportFileConfig, WinstonTransportMongoDbConfig, WinstonLoggerLevel, OBACoreLoggerType } from "./logger-types";
export declare const levels: {
    crit: number;
    error: number;
    warn: number;
    info: number;
    access: number;
    debug: number;
};
export declare const levelGuard: (level: string) => winston.Logform.Format;
export declare const printMsg: (m: LogEntry) => string;
export declare const makeFormat: (name: string) => winston.Logform.Format;
export declare const makeFileTransport: (o: WinstonTransportFileConfig) => winston.transports.FileTransportInstance;
export declare const makeMongoDbTransport: (o: WinstonTransportMongoDbConfig) => import("winston-mongodb").MongoDBTransportInstance;
export declare const makeWinstonLogger: <T extends "file" | "db">(label: string, type: T, o: (WinstonTransportFileConfig | WinstonTransportMongoDbConfig)[]) => winston.Logger;
export declare const makeLocalDir: (path: string) => true | void;
export declare const postLogMsg: (logger: OBACoreLoggerType, k: WinstonLoggerLevel, str: string) => Promise<any>;
