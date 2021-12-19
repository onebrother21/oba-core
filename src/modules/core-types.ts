import {OBACoreVars} from "./vars-types";
import {OBACoreLogger,OBACoreLoggerConfig} from "./logger-main";
import {OBACoreDB,OBACoreDBConfig} from "./db-main";
import {OBACoreErrorFactory,OBACoreErrorFactoryConfig} from "./error-factory-main";


export type OBACoreConfigType = {
  vars:OBACoreVars;
  e:OBACoreErrorFactoryConfig;
  errors:OBACoreErrorFactoryConfig;
  db:OBACoreDBConfig;
  logger:OBACoreLoggerConfig;
};
export type OBACoreType = {
  vars:OBACoreVars;
  e:OBACoreErrorFactory;
  errors:OBACoreErrorFactory;
  db:OBACoreDB;
  logger:OBACoreLogger;
};