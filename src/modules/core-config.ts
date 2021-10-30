import config from "config";
import OBA,{ DeepPartial } from "@onebro/oba-common";
import { OBACoreConfig } from "./core-main";

const setDefaultConfigWithEnvironment = (prefix:string):OBACoreConfig => {
  const env = process.env.NODE_ENV.toLocaleUpperCase();
  const name = OBA.envvar(prefix,"_NAME");
  const mode = OBA.envvar(prefix,"_MODE");
  let dburi = "_MONGODB";
  switch(true){
    case env === "production":
    case (/live-db/i.test(env)):dburi += "_PROD";break;
    default:dburi += "_LOCAL";break;
  }
  const dbs =  {[name]:OBA.envvar(prefix,dburi)};
  const initial:OBACoreConfig = config.get("appconfig");
  const atRuntime:DeepPartial<OBACoreConfig> = {
    vars:{name,env,mode,verbose:false},
    logger:{label:name},
    db:{connections:dbs},
  };
  const coreConfig = OBA.merge(initial,atRuntime) as OBACoreConfig;
  return coreConfig;
};
export {setDefaultConfigWithEnvironment as coreConfig};