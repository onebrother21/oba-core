import { Connection, ConnectionOptions } from "mongoose";
import { DataMap, Strings } from "@onebro/oba-common";
export declare type DBConnection = {
    uri: string;
    client: Connection;
};
export declare type DBConnections = DataMap<DBConnection>;
export declare type OBACoreDBConfig = {
    connections: Strings;
    opts: ConnectionOptions;
};
export declare type OBACoreDBType = {
    connections: DBConnections;
    config: OBACoreDBConfig;
};
