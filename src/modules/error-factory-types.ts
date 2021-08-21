import {Errors,Methods,AppError} from "@onebro/oba-common";

export interface OBACoreErrorFactoryConfig extends Errors {}
export interface OBACoreErrorFactoryType extends Methods<AppError>{}