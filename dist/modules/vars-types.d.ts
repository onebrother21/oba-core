import { Enum } from "@onebro/oba-common";
export declare type OBACoreVarsObj = Enum<string, "name" | "env" | "version", "id" | "tkn" | "mode"> & Enum<boolean, undefined, "verbose">;
export declare type OBACoreVarsConfig = OBACoreVarsObj;
export declare type OBACoreVarsType = OBACoreVarsConfig;
