/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
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
    get(level: WinstonLoggerLevelKeys): Model<LogMsg, {}, {}, {}, any>;
    init: (db: OBACoreDB) => Promise<void>;
    create: (level: WinstonLoggerLevelKeys, meta: any) => Promise<import("mongoose").FlattenMaps<import("mongoose").LeanDocument<any>>>;
    query: (level: WinstonLoggerLevelKeys, q: any) => Promise<(AppEntity & Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
export default OBACoreLoggerDbCustomWrapper;
