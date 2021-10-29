import { Enum } from "@onebro/oba-common";

export type OBACoreVarsObj =
Enum<string,"name"|"env"|"version","id"|"tkn"|"mode"> &
Enum<boolean,undefined,"verbose">;
export type OBACoreVarsConfig = OBACoreVarsObj;
export type OBACoreVarsType = OBACoreVarsConfig;