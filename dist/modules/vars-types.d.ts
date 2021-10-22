import { OptionalEnum } from "@onebro/oba-common";
export declare type OBACoreVarsObj = OptionalEnum<string, "name" | "env" | "version", "id" | "tkn" | "mode"> & OptionalEnum<boolean, undefined, "verbose">;
export declare type OBACoreVarsConfig = OBACoreVarsObj;
export declare type OBACoreVarsType = OBACoreVarsConfig;
