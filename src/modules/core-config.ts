import config from "config";
import deepmerge from "deepmerge";
import { DeepPartial } from "@onebro/oba-common";
import { OBACoreConfig } from "./core-main";

const setDefaultConfigWithEnvironment = (envPrefix:string):OBACoreConfig => {
  const getDBUri = () => {
    const env = process.env.NODE_ENV;
    let uri = `${envPrefix}_MONGODB`;
    switch(true){
      case env === "production":
      case (/live-db/.test(env)):uri = env+"_PROD";break;
      default:uri = env+"_LOCAL";break;
    }
    return uri;
  };
  const initial:OBACoreConfig = config.get("appconfig");
  const atRuntime:DeepPartial<OBACoreConfig> = {
    vars:{
      name:process.env[`${envPrefix}_NAME`],
      env:process.env.NODE_ENV,
      mode:process.env[`${envPrefix}_MODE`],
      verbose:false,
    },
    logger:{label:process.env[`${envPrefix}_NAME`]},
    db:{connections:{[envPrefix]:getDBUri()}},
  };
  const masterConfig = deepmerge(initial,atRuntime) as OBACoreConfig;
  return masterConfig;};
export {setDefaultConfigWithEnvironment as masterConfig};