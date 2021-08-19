import config from "config";
import deepmerge from "deepmerge";
import { DeepPartial } from "@onebro/oba-common";
import { OBACoreConfig } from "./core-main";

const setDefaultConfigWithEnvironment = (envPrefix:string):OBACoreConfig => {
  const prod = process.env.NODE_ENV === "production";
  const dbUri = process.env[`${envPrefix}_MONGODB${!prod?"_LOCAL":"_PROD"}`];
  const initial:OBACoreConfig = config.get("appconfig");
  const atRuntime:DeepPartial<OBACoreConfig> = {
    vars:{
      name:process.env[`${envPrefix}_NAME`],
      host:process.env[`${envPrefix}_HOST`],
      port:Number(process.env[`${envPrefix}_PORT`]),
      env:process.env.NODE_ENV,
      verbose:false},
    logger:{label:process.env[`${envPrefix}_NAME`]},
    db:{connections:{[envPrefix]:dbUri}},
  };
  const masterConfig = deepmerge(initial,atRuntime) as OBACoreConfig;
  return masterConfig;};
export {setDefaultConfigWithEnvironment as masterConfig};