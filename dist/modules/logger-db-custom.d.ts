import { Document, Model } from "mongoose";
import { Keys, Enum, AppEntity } from "@onebro/oba-common";
import { OBACoreDB } from "./db-main";
import { WinstonLoggerLevels, WinstonTransportCustomDbConfig } from "./logger-types";
export declare type LogMsg = AppEntity & Document;
export declare type WinstonLoggerLevelKeys = Keys<WinstonLoggerLevels>;
export declare type OBACoreLoggerDbCustomMethods = Enum<(meta: any) => Promise<any>, undefined, WinstonLoggerLevelKeys>;
export interface OBACoreLoggerDbCustomWrapper extends OBACoreLoggerDbCustomMethods {
}
export declare class OBACoreLoggerDbCustomWrapper {
    label: string;
    config: WinstonTransportCustomDbConfig[];
    constructor(label: string, config: WinstonTransportCustomDbConfig[]);
    models: Enum<Model<LogMsg>, undefined, WinstonLoggerLevelKeys>;
    get(level: WinstonLoggerLevelKeys): Model<LogMsg, {}, {}, {}>;
    init: (db: OBACoreDB) => Promise<void>;
    create: (level: WinstonLoggerLevelKeys, meta: any) => Promise<import("mongoose").FlattenMaps<import("mongoose").LeanDocument<AppEntity & Document<any, any, any> & {
        _id: any;
    }>>>;
    query: (level: WinstonLoggerLevelKeys, q: any) => Promise<(AppEntity & Document<any, any, any> & {
        _id: any;
    })[]>;
}
export default OBACoreLoggerDbCustomWrapper;
