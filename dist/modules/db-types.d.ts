import { Connection } from "mongoose";
import { Enum, Strings } from "@onebro/oba-common";
export declare type DBConnectionOpts = {
    "autoIndex": boolean;
} & Enum<number, undefined, "maxPoolSize" | "serverSelectionTimeoutMS" | "socketTimeoutMS" | "family">;
export declare type DBConnection = {
    uri: string;
    client: Connection;
};
export declare type DBConnections = Enum<DBConnection>;
export declare type OBACoreDBConfig = {
    connections: Strings;
    opts: DBConnectionOpts;
};
export declare type OBACoreDBType = {
    connections: DBConnections;
    config: OBACoreDBConfig;
};
