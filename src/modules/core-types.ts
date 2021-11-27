import OBACoreBaseApi,{OBACoreBaseConfig} from "@onebro/oba-core-base-api";
import {OBACoreLogger} from "./logger-main";
import {OBACoreDB} from "./db-main";

import {OBACoreLoggerConfig} from "./logger-types";
import {OBACoreDBConfig} from "./db-types";

export type OBACoreConfigType = OBACoreBaseConfig & {
  logger:OBACoreLoggerConfig;
  db:OBACoreDBConfig;
};
export type OBACoreConfig = Partial<OBACoreConfigType>;
export type OBACoreType<Ev> = Omit<OBACoreBaseApi<Ev>,"config"> & {
  logger:OBACoreLogger<Ev>;
  db:OBACoreDB<Ev>;
};