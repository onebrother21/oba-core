import config from "config";
import deepmerge from "deepmerge";
import { DeepPartial } from "@onebro/oba-common";
import { OBACoreConfig } from "./core-main";

const setDefaultConfigWithEnvironment = (envPrefix:string):OBACoreConfig => {
  const prefix = envPrefix.toLocaleUpperCase();
  const env = process.env.NODE_ENV.toLocaleUpperCase();
  const name = process.env[`${prefix}_NAME`];
  const mode = process.env[`${prefix}_MODE`];
  let uri = `${prefix}_MONGODB`;
  switch(true){
    case env === "production":
    case (/live-db/.test(env)):uri += "_PROD";break;
    default:uri += "_LOCAL";break;
  }
  const dbs =  {[name]:process.env[uri]};
  const initial:OBACoreConfig = config.get("appconfig");
  const atRuntime:DeepPartial<OBACoreConfig> = {
    vars:{name,env,mode,verbose:false},
    logger:{label:name},
    db:{connections:dbs},
  };
  const masterConfig = deepmerge(initial,atRuntime) as OBACoreConfig;
  return masterConfig;
};
export {setDefaultConfigWithEnvironment as masterConfig};