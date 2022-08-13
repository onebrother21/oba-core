import config from "config";
import OB from "@onebro/oba-common";
import { OBACoreConfig } from "./core-main";

const setDefaultConfigWithEnvironment = ():OBACoreConfig => {
  const initial:OBACoreConfig = config.get("appconfig");
  const env = OB.env().toLocaleUpperCase();
  const name = OB.appvar("_NAME") as string;
  const version = OB.version();
  const vars = {name,env,version};
  let dbVar = "_" + OB.appvar("_DB");
  if(!OB.appvar(dbVar)) switch(true){
    case OB.isEnv("prod"):dbVar += "_PROD";break;
    case OB.isEnv("local-db"):dbVar += "_LOCAL";break;
    default:dbVar += "_DEV";break;
  }
  const uri = OB.appvar(dbVar) as string;
  const db =  {uri,name,opts:{}};
  const logger = {label:name} as any;
  const atRuntime:Partial<OBACoreConfig> = {vars,logger,db};
  const coreConfig = OB.mergeObj(initial,atRuntime,false) as OBACoreConfig;
  return coreConfig;
};
export {setDefaultConfigWithEnvironment as coreConfig};