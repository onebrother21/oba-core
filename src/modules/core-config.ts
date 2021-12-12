import config from "config";
import OB,{ DeepPartial } from "@onebro/oba-common";
import { OBACoreConfig } from "./core-types";
import { coreBaseConfig, OBACoreBaseConfig } from "@onebro/oba-core-base-api";

const setDefaultConfigWithEnvironment = (prefix:string):OBACoreConfig => {
  const base:OBACoreBaseConfig = coreBaseConfig(prefix);
  const {name,env} = base.vars;
  let dbVar = "_MONGODB";
  switch(true){
    case env === "production":dbVar += "_PROD";break;
    case OB.match(/LIVE/,env):dbVar += "_LIVE";break;
    default:dbVar += "_LOCAL";break;
  }
  const uri = OB.evar(prefix,dbVar);
  const db =  {connections:{...uri?{[name]:uri}:{}}};
  const logger = {label:name} as any;
  const atRuntime:DeepPartial<OBACoreConfig> = {logger,db};
  const coreConfig = OB.mergeObj(base,atRuntime) as OBACoreConfig;
  return coreConfig;
};
export {setDefaultConfigWithEnvironment as coreConfig};