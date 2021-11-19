import {OBACoreVars} from "./vars-main";
import {OBACoreErrorFactory} from "./error-factory-main";
import {OBACoreEmitter} from "./emitter-main";
import {OBACoreLogger} from "./logger-main";
import {OBACoreDB} from "./db-main";

import {OBACoreVarsConfig} from "./vars-types";
import {OBACoreErrorFactoryConfig} from "./error-factory-types";
import {OBACoreEmitterConfig} from "./emitter-types";
import {OBACoreLoggerConfig} from "./logger-types";
import {OBACoreDBConfig} from "./db-types";

export type OBACoreConfigType<Ev> = {
  vars:OBACoreVarsConfig;
  events:OBACoreEmitterConfig<Ev>;
  logger:OBACoreLoggerConfig;
  e:OBACoreErrorFactoryConfig;
  errors:OBACoreErrorFactoryConfig;
  db:OBACoreDBConfig;
};
export type OBACoreConfig<Ev> = Partial<OBACoreConfigType<Ev>>;
export type OBACoreObj<Ev> = {
  config:OBACoreConfig<Ev>;
  vars:OBACoreVars;
  events:OBACoreEmitter<Ev>;
  logger:OBACoreLogger;
  db:OBACoreDB;
  e:OBACoreErrorFactory;
  errors:OBACoreErrorFactory;
};
export type OBACoreType<Ev> = Partial<OBACoreObj<Ev>>;