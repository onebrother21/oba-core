import mongoose, { Schema } from "mongoose";
import { MongoClientOptions } from "mongodb";
import { OBACoreDBType, OBACoreDBConfigType } from "./db-types";
import { Component, AnyBoolean } from "@onebro/oba-common";
export declare type OBACoreDBConfig = OBACoreDBConfigType;
export interface OBACoreDB extends Component<OBACoreDBConfig>, OBACoreDBType {
}
export declare class OBACoreDB extends Component<OBACoreDBConfig> {
    get(): mongoose.Connection;
    init: (start?: AnyBoolean) => Promise<void>;
    shutdown: () => Promise<void>;
    startNative: (name: string, uri: string, opts: MongoClientOptions) => Promise<import("mongodb").Db>;
    model: <T extends mongoose.Document<any, any, any>, U extends mongoose.Model<T, {}, {}, {}, any>>(modelName: string, schema: mongoose.Schema<T, mongoose.Model<T, any, any, any, any>, {}, {}, {}, {}, "type", mongoose.ObtainDocumentType<any, T, "type">>, collection: string) => Promise<U>;
}
export default OBACoreDB;
