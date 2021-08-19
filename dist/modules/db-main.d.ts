import mongoose, { Schema } from "mongoose";
import { MongoClientOptions } from "mongodb";
import { OBACoreDBType, OBACoreDBConfig } from "./db-types";
export interface OBACoreDB extends OBACoreDBType {
}
export declare class OBACoreDB {
    start(): Promise<void>;
    shutdown(): Promise<void>;
    startNative(name: string, uri: string, opts: MongoClientOptions): Promise<import("mongodb").Db>;
    print(): void;
    get(db: string): import("./db-types").DBConnection;
    model: <T extends mongoose.Document<any, any, any>, U extends mongoose.Model<T, {}, {}>>(dbName: string, modelName: string, schema: mongoose.Schema<T, mongoose.Model<T, any, any>, undefined, {}>, collection: string) => Promise<U>;
    constructor(config: OBACoreDBConfig);
}
export default OBACoreDB;
export * from "./db-types";
