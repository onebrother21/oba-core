import OBACoreBaseApi, { OBACoreBaseConfig } from "@onebro/oba-core-base-api";
import { OBACoreLogger } from "./logger-main";
import { OBACoreDB } from "./db-main";
import { OBACoreLoggerConfig } from "./logger-types";
import { OBACoreDBConfig } from "./db-types";
export declare type OBACoreConfigType = OBACoreBaseConfig & {
    logger: OBACoreLoggerConfig;
    db: OBACoreDBConfig;
};
export declare type OBACoreConfig = Partial<OBACoreConfigType>;
export declare type OBACoreType<Ev> = Omit<OBACoreBaseApi<Ev>, "config"> & {
    logger: OBACoreLogger<Ev>;
    db: OBACoreDB<Ev>;
};
