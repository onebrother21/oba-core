import { AppError } from "@onebro/oba-common";
import { OBACoreErrorsType, OBACoreErrorsConfig } from "./error-factory-types";
export interface OBACoreErrors extends OBACoreErrorsType {
}
export declare class OBACoreErrors {
    format<T>(e: T): AppError;
    make(e: AppError, k: string): AppError;
    make(e: AppError, k: string, status: number): AppError;
    make(e: AppError, k: string, data: string): AppError;
    make(e: AppError, k: string, status: number, data: string): AppError;
    map(e: Error | AppError): AppError;
    constructor(config: OBACoreErrorsConfig);
}
export default OBACoreErrors;
export * from "./error-factory-types";
