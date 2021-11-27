import {Connection} from "mongoose";
import {Enum,Strings} from "@onebro/oba-common";

export type DBConnectionOpts =
Enum<boolean,undefined,"autoIndex"|"useUnifiedTopology"|"useNewUrlParser"> &
Enum<number,undefined,"maxPoolSize"|"serverSelectionTimeoutMS"|"socketTimeoutMS"|"family">;
export type DBConnection = {uri:string;conn:Connection;};
export type DBConnections = Enum<DBConnection>;


export type OBACoreDBConfig = {connections:Strings;opts:DBConnectionOpts;};
export type OBACoreDBType = {connections:DBConnections;};