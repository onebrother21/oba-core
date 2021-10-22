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
export declare type OBACoreLoggerConfig = WinstonLoggerConfig;
export declare type WinstonLoggerType = winston.Logger & Record<keyof WinstonLoggerLevels, winston.LeveledLogMethod>;
export declare type OBACoreLoggerType = WinstonLoggerType & {
    makeDir: (path: string) => true | void;
    getMsg: (e: AppError) => string;
};
