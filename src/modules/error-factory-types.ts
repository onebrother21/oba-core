import {Errors,Methods,AppError} from "@onebro/oba-common";

export interface OBACoreErrorsConfig extends Errors {}
export interface OBACoreErrorsType extends Methods<AppError>{}