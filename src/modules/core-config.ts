import config from "config";
import OB,{ DeepPartial } from "@onebro/oba-common";
import { OBACoreConfig } from "./core-main";

const setDefaultConfigWithEnvironment = ():OBACoreConfig => {
  const env = OB.env().toLocaleUpperCase();
  const name = OB.appvar("_NAME");
  const mode = OB.mode();
  const verbose = OB.verbose();
  const version = OB.version();
  let dbVar = "_" + OB.appvar("_DBNAME");
  const vars = {name,env,mode,version,verbose};
  const initial:OBACoreConfig = config.get("appconfig");
  if(!OB.appvar(dbVar)) switch(true){
    case OB.isEnv("prod"):dbVar += "_PROD";break;
    case OB.isEnv("live"):dbVar += "_LIVE";break;
    default:dbVar += "_LOCAL";break;
  }
  const uri = OB.appvar(dbVar);
  const db =  {uri,name};
  const logger = {label:name} as any;
  const atRuntime:DeepPartial<OBACoreConfig> = {vars,logger,db};
  const coreConfig = OB.mergeObj(initial,atRuntime,false) as OBACoreConfig;
  return coreConfig;
};
export {setDefaultConfigWithEnvironment as coreConfig};