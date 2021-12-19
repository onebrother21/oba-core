import config from "config";
import OB,{ DeepPartial } from "@onebro/oba-common";
import { OBACoreConfig } from "./core-main";

const setDefaultConfigWithEnvironment = (prefix:string):OBACoreConfig => {
  const env = process.env.NODE_ENV.toLocaleUpperCase();
  const name = OB.evar(prefix,"_NAME");
  const mode = OB.evar(prefix,"_MODE");
  const version = OB.version();
  const vars = {name,env,mode,version};//,envvars:process.env};
  const initial:OBACoreConfig = config.get("appconfig");
  let dbVar = "_MONGODB";
  switch(true){
    case env === "production":dbVar += "_PROD";break;
    case OB.match(/LIVE/,env):dbVar += "_LIVE";break;
    default:dbVar += "_LOCAL";break;
  }
  const uri = OB.evar(prefix,dbVar);
  const db =  {uri,name};
  const logger = {label:name} as any;
  const atRuntime:DeepPartial<OBACoreConfig> = {vars,logger,db};
  const coreConfig = OB.mergeObj(initial,atRuntime,false) as OBACoreConfig;
  return coreConfig;
};
export {setDefaultConfigWithEnvironment as coreConfig};