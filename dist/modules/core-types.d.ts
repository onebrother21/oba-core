import { OBACoreVars, OBACoreVarsConfig } from "./vars-main";
import { OBACoreErrorFactory, OBACoreErrorFactoryConfig } from "./error-factory-main";
import { OBACoreEmitter, OBACoreEmitterConfig } from "./emitter-main";
import { OBACoreLogger, OBACoreLoggerConfig } from "./logger-main";
import { OBACoreDB, OBACoreDBConfig } from "./db-main";
export declare type OBACoreConfigType<Ev> = {
    vars: OBACoreVarsConfig;
    events: OBACoreEmitterConfig<Ev>;
    logger: OBACoreLoggerConfig;
    errors: OBACoreErrorFactoryConfig;
    db: OBACoreDBConfig;
};
export declare type OBACoreConfig<Ev> = Partial<OBACoreConfigType<Ev>>;
export declare type OBACoreObj<Ev> = {
    config: OBACoreConfig<Ev>;
    vars: OBACoreVars;
    events: OBACoreEmitter<Ev>;
    logger: OBACoreLogger;
    db: OBACoreDB;
    e: OBACoreErrorFactory;
};
export declare type OBACoreType<Ev> = Partial<OBACoreObj<Ev>>;
