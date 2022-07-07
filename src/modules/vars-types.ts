import { Enum,Strings } from "@onebro/oba-common";

export type OBACoreVars = Enum<string,"name"|"env"|"version","id"|"tkn"|"mode"> & Enum<boolean,undefined,"verbose">;// & {envvars:Strings;};