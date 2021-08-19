import winston from "winston";
import { AppError } from "@onebro/oba-common";
export declare type WinstonQueryOpts = {};
export declare type WinstonQuery = (o: WinstonQueryOpts, cb: (e: Error, results: any) => void) => any;
export declare type WinstonLoggerLevels = {
    crit: number;
    error: number;
    warn: number;
    info: number;
    access: number;
    debug: number;
};
export declare type WinstonLoggerConfig = {
    levels: string[];
    dirname?: string;
    label?: string;
    uri?: string;
};
export declare type WinstonLoggerType<T> = winston.Logger & Record<keyof T, winston.LeveledLogMethod>;
export declare type WinstonLogger = WinstonLoggerType<WinstonLoggerLevels> & {
    makeDir: (path: string) => true | void;
    getMsg: (e: AppError) => string;
};
export interface OBACoreLoggerConfig extends WinstonLoggerConfig {
}
export interface OBACoreLoggerType extends WinstonLogger {
}
