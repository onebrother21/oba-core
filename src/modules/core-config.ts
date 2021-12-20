import config from "config";
import OB,{ DeepPartial } from "@onebro/oba-common";
import { OBACoreConfig } from "./core-main";

const setDefaultConfigWithEnvironment = (prefix:string):OBACoreConfig => {
  const env = OB.env().toLocaleUpperCase();
  const name = OB.evar(prefix,"_NAME");
  const mode = OB.mode();
  const version = OB.version();
  const vars = {name,env,mode,version};
  const initial:OBACoreConfig = config.get("appconfig");
  let dbVar = "_MONGODB";
  if(!OB.evar(prefix,dbVar)) switch(true){
    case OB.prod():dbVar += "_PROD";break;
    case OB.match(/live/i,env):dbVar += "_LIVE";break;
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