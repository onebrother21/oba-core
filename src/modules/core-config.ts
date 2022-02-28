import config from "config";
import OB,{ DeepPartial } from "@onebro/oba-common";
import { OBACoreConfig } from "./core-main";

const setDefaultConfigWithEnvironment = (prefix:string):OBACoreConfig => {
  const env = OB.env().toLocaleUpperCase();
  const name = OB.getvar(prefix,"_NAME");
  const mode = OB.mode();
  const verbose = OB.verbose();
  const version = OB.version();
  const vars = {name,env,mode,version,verbose};
  const initial:OBACoreConfig = config.get("appconfig");
  let dbVar = "_MONGODB";
  if(!OB.getvar(prefix,dbVar)) switch(true){
    case OB.isEnv("prod"):dbVar += "_PROD";break;
    case OB.isEnv("live"):dbVar += "_LIVE";break;
    default:dbVar += "_LOCAL";break;
  }
  const uri = OB.getvar(prefix,dbVar);
  const db =  {uri,name};
  const logger = {label:name} as any;
  const atRuntime:DeepPartial<OBACoreConfig> = {vars,logger,db};
  const coreConfig = OB.mergeObj(initial,atRuntime,false) as OBACoreConfig;
  return coreConfig;
};
export {setDefaultConfigWithEnvironment as coreConfig};