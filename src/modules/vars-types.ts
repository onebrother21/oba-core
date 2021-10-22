import { OptionalEnum } from "@onebro/oba-common";

export type OBACoreVarsObj =
OptionalEnum<string,"name"|"env"|"version","id"|"tkn"|"mode"> &
OptionalEnum<boolean,undefined,"verbose">;
export type OBACoreVarsConfig = OBACoreVarsObj;
export type OBACoreVarsType = OBACoreVarsConfig;