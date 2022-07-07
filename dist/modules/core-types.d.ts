import { OBACoreVars } from "./vars-types";
import { OBACoreLogger, OBACoreLoggerConfig } from "./logger-main";
import { OBACoreDB, OBACoreDBConfig } from "./db-main";
import { OBACoreErrorFactory, OBACoreErrorFactoryConfig } from "./error-factory-main";
export declare type OBACoreConfigType = {
    vars: OBACoreVars;
    errors?: OBACoreErrorFactoryConfig;
    db?: OBACoreDBConfig;
    logger?: OBACoreLoggerConfig;
};
export declare type OBACoreType = {
    vars: OBACoreVars;
    errors: OBACoreErrorFactory;
    db?: OBACoreDB;
    logger?: OBACoreLogger;
};
