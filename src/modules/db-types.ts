import {Connection} from "mongoose";
import {Enum} from "@onebro/oba-common";

export type ConnectionOpts =
Enum<boolean,undefined,"autoIndex"|"useUnifiedTopology"|"useNewUrlParser"> &
Enum<number,undefined,"maxPoolSize"|"serverSelectionTimeoutMS"|"socketTimeoutMS"|"family">;
export type OBACoreDBConfigType = {name:string,uri:string;opts:ConnectionOpts;};
export type OBACoreDBType = OBACoreDBConfigType & {connection:Connection;};