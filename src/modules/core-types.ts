import {OBACoreVars,OBACoreVarsConfig} from "./vars-main";
import {OBACoreErrorFactory,OBACoreErrorFactoryConfig} from "./error-factory-main";
import {OBACoreEmitter,OBACoreEmitterConfig} from "./emitter-main";
import {OBACoreLogger,OBACoreLoggerConfig} from "./logger-main";
import {OBACoreDB,OBACoreDBConfig} from "./db-main";

export type OBACoreConfigType<Ev> = {
  vars:OBACoreVarsConfig;
  events:OBACoreEmitterConfig<Ev>;
  logger:OBACoreLoggerConfig;
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
};
export type OBACoreType<Ev> = Partial<OBACoreObj<Ev>>;