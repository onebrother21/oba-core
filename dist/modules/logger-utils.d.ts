import winston, { LogEntry } from "winston";
import { WinstonLogger, WinstonLoggerConfig } from "./logger-types";
import { AppError } from "@onebro/oba-common";
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
export declare const makeDir: (path: string) => true | void;
export declare const makeTransport: (level: string, dirname: string) => winston.transports.FileTransportInstance;
export declare const makeLogMsg: (e: AppError | any) => string;
export declare const makeLogger: (c: WinstonLoggerConfig) => WinstonLogger;
