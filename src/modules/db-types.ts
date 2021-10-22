import {Connection,ConnectionOptions} from "mongoose";
import {DataMap,Strings} from "@onebro/oba-common";

export type DBConnection = {uri:string;client:Connection;};
export type DBConnections = DataMap<DBConnection>;
export type OBACoreDBConfig = {connections:Strings;opts:ConnectionOptions;};
export type OBACoreDBType = {connections:DBConnections;config:OBACoreDBConfig;};