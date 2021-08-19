import { Enum, PartialEnum } from "@onebro/oba-common";
export declare type OptionalEnum<T, k extends string = undefined, j extends string = undefined> = Enum<k, T> & PartialEnum<j, T>;
export declare type OBACoreVarsObj = OptionalEnum<string, "name" | "host" | "env" | "entry" | "version", "id" | "tkn"> & OptionalEnum<number, "port"> & OptionalEnum<boolean, undefined, "verbose">;
export interface OBACoreVarsConfig extends OBACoreVarsObj {
}
export declare type OBACoreVarsType = OBACoreVarsConfig & {};
