import { OBACoreVars, OBACoreVarsConfig } from "./vars-main";
import { OBACoreErrors, OBACoreErrorsConfig } from "./error-factory-main";
import { OBACoreEmitter, OBACoreEmitterConfig } from "./emitter-main";
import { OBACoreLogger, OBACoreLoggerConfig } from "./logger-main";
import { OBACoreDB, OBACoreDBConfig } from "./db-main";
export declare type OBACoreConfigObj = {
    vars: OBACoreVarsConfig;
    events: OBACoreEmitterConfig;
    logger: OBACoreLoggerConfig;
    errors: OBACoreErrorsConfig;
    db: OBACoreDBConfig;
};
export declare type OBACoreObj<EV> = {
    config: OBACoreConfig;
    vars: OBACoreVars;
    events: OBACoreEmitter<EV>;
    logger: OBACoreLogger;
    db: OBACoreDB;
    e: OBACoreErrors;
};
export declare type OBACoreConfig = Partial<OBACoreConfigObj>;
export declare type OBACoreType<EV> = Partial<OBACoreObj<EV>>;
