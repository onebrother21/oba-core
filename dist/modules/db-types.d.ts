import { Connection } from "mongoose";
import { Enum } from "@onebro/oba-common";
export declare type ConnectionOpts = Enum<boolean, undefined, "autoIndex" | "useUnifiedTopology" | "useNewUrlParser"> & Enum<number, undefined, "maxPoolSize" | "serverSelectionTimeoutMS" | "socketTimeoutMS" | "family">;
export declare type OBACoreDBConfigType = {
    name: string;
    uri: string;
    opts: ConnectionOpts;
};
export declare type OBACoreDBType = OBACoreDBConfigType & {
    connection: Connection;
};
