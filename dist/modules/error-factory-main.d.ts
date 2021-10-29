import OBA, { AppError } from "@onebro/oba-common";
import { OBACoreErrorFactoryType, OBACoreErrorFactoryConfig } from "./error-factory-types";
export interface OBACoreErrorFactory extends OBACoreErrorFactoryType {
}
export declare class OBACoreErrorFactory {
    format<T>(e: T): OBA.AppError;
    make(e: AppError, k: string): AppError;
    make(e: AppError, k: string, status: number): AppError;
    make(e: AppError, k: string, data: string): AppError;
    make(e: AppError, k: string, status: number, data: string): AppError;
    map(e: Error | AppError): AppError;
    constructor(config: OBACoreErrorFactoryConfig);
}
export default OBACoreErrorFactory;
export * from "./error-factory-types";
