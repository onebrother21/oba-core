import { Enum,PartialEnum,DataMap,Strings, MiscInfo, } from "@onebro/oba-common";

export type OptionalEnum<T,k extends string = undefined,j extends string = undefined> = Enum<k,T> & PartialEnum<j,T>;
export type OBACoreVarsObj =
OptionalEnum<string,"name"|"host"|"env"|"entry"|"version","id"|"tkn"> &
OptionalEnum<number,"port"> &
OptionalEnum<boolean,undefined,"verbose">;
export interface OBACoreVarsConfig extends OBACoreVarsObj {}
export type OBACoreVarsType = OBACoreVarsConfig & {};
/*
export type OBACoreApiCreds = {id:string;key:string;data:Strings;};
export type OBACoreSettings = {checkConn?:boolean|number;requireKey?:boolean;} & MiscInfo;
export type OBACoreVarsExtended = {
  settings:OBACoreSettings;
  providers:DataMap<OBACoreApiCreds>;
  consumers:DataMap<OBACoreApiCreds>;
  whitelist:string[];
  blacklist:{ip:string[];username:string[];loc:string[];};};
export interface OBACoreVarsConfig extends OBACoreVarsBase,Partial<OBACoreVarsExtended> {}
export interface OBACoreVarsType extends OBACoreVarsConfig {id?:string;tkn?:string;}
*/