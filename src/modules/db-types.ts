import {Connection} from "mongoose";
import {Enum,Strings} from "@onebro/oba-common";

export type DBConnectionOpts = {"autoIndex":boolean;} & Enum<number,undefined,"maxPoolSize"|"serverSelectionTimeoutMS"|"socketTimeoutMS"|"family">;
export type DBConnection = {uri:string;client:Connection;};
export type DBConnections = Enum<DBConnection>;


export type OBACoreDBConfig = {connections:Strings;opts:DBConnectionOpts;};
export type OBACoreDBType = {connections:DBConnections;config:OBACoreDBConfig;};