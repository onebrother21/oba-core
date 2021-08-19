import {ConnectionOptions,Connection} from "mongoose";
import {DataMap,Strings} from "@onebro/oba-common";

export type DBConnection = {uri:string;client:Connection;};
export type DBConnections = DataMap<DBConnection>;

export interface OBACoreDBConfig {connections:Strings;opts:ConnectionOptions;}
export interface OBACoreDBType {connections:DBConnections;config:OBACoreDBConfig;}