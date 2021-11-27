import mongoose, { Schema } from "mongoose";
import { MongoClientOptions } from "mongodb";
import { OBACoreDBType, OBACoreDBConfig } from "./db-types";
import { Component } from "@onebro/oba-common";
export interface OBACoreDB<Ev> extends Component<OBACoreDBConfig, Ev>, OBACoreDBType {
}
export declare class OBACoreDB<Ev> extends Component<OBACoreDBConfig, Ev> {
    init: () => Promise<void>;
    shutdown: () => Promise<void>;
    startNative: (name: string, uri: string, opts: MongoClientOptions) => Promise<import("mongodb").Db>;
    get(dbName: string): import("./db-types").DBConnection;
    model: <T extends mongoose.Document<any, any, any>, U extends mongoose.Model<T, {}, {}, {}>>(dbName: string, modelName: string, schema: mongoose.Schema<T, mongoose.Model<T, any, any, any>, {}>, collection: string) => Promise<U>;
}
export default OBACoreDB;
