import config from "config";
import OBA,{ DeepPartial } from "@onebro/oba-common";
import { OBACoreConfig } from "./core-types";
import { coreBaseConfig, OBACoreBaseConfig } from "@onebro/oba-core-base-api";

const setDefaultConfigWithEnvironment = (prefix:string):OBACoreConfig => {
  //const initial:OBACoreConfig = config.get("appconfig");
  const base:OBACoreBaseConfig = coreBaseConfig(prefix);
  const {name,env} = base.vars;
  let dbVar = "_MONGODB";
  switch(true){
    case env === "production":
    case (/live-db/i.test(env)):dbVar += "_PROD";break;
    default:dbVar += "_LOCAL";break;
  }
  const uri = OBA.envvar(prefix,dbVar);
  const db =  {connections:{...uri?{[name]:uri}:{}}};
  const logger = {label:name} as any;
  const atRuntime:DeepPartial<OBACoreConfig> = {logger,db};
  const coreConfig = OBA.merge(base,atRuntime) as OBACoreConfig;
  return coreConfig;
};
export {setDefaultConfigWithEnvironment as coreConfig};