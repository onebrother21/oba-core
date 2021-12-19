import { AppError, Component } from "@onebro/oba-common";
import { OBACoreErrorFactoryType, OBACoreErrorFactoryConfigType } from "./error-factory-types";
export declare type OBACoreErrorFactoryConfig = OBACoreErrorFactoryConfigType;
export interface OBACoreErrorFactory extends Component<OBACoreErrorFactoryConfig>, OBACoreErrorFactoryType {
}
export declare class OBACoreErrorFactory extends Component<OBACoreErrorFactoryConfig> {
    init: () => Promise<void>;
    format<T>(e: T): AppError;
    make(e: AppError, k: string): AppError;
    make(e: AppError, k: string, status: number): AppError;
    make(e: AppError, k: string, data: string): AppError;
    make(e: AppError, k: string, status: number, data: string): AppError;
    mapKnownError(e: Error): AppError;
    map(e: Error | AppError): AppError;
}
export default OBACoreErrorFactory;
