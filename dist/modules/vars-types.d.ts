import { OptionalEnum } from "@onebro/oba-common";
export declare type OBACoreVarsObj = OptionalEnum<string, "name" | "env" | "version", "id" | "tkn" | "mode"> & OptionalEnum<boolean, undefined, "verbose">;
export interface OBACoreVarsConfig extends OBACoreVarsObj {
}
export declare type OBACoreVarsType = OBACoreVarsConfig & {};
