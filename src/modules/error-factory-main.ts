import {MongoError} from "mongodb";
import {Errors,Methods,AppError} from "@onebro/oba-common";
import * as ob from "@onebro/oba-common";
import { OBACoreErrorsType, OBACoreErrorsConfig } from "./error-factory-types";

export interface OBACoreErrors extends OBACoreErrorsType {}
export class OBACoreErrors {
  format<T>(e:T){return new AppError(e);}
  make(e:AppError,k:string):AppError;
  make(e:AppError,k:string,status:number):AppError;
  make(e:AppError,k:string,data:string):AppError;
  make(e:AppError,k:string,status:number,data:string):AppError;
  make(e:AppError,k:string,status?:string|number,data?:string):AppError{
    const errCode = k.toLocaleUpperCase();
    const errStatus = ob.num(status)?status:e.status;
    const errData = ob.str(status)?status:data;
    const errMsg = errData?e.message.replace("%s",errData):e.message;
    const modified = Object.assign({},e,{
      status:errStatus,
      code:errCode,
      message:errMsg});
    return new AppError(modified);}
  map(e:Error|AppError):AppError {
    const mapError = (e:Error) => {
      switch(true){
        case ob.match(/authorized/i,e.name,e.message):return this.unauthorized("user");
        case ob.match(/jsonwebtoken/i,e.name,e.message):return this.unauthorized("user");
        case ob.match(/jwt/i,e.name,e.message):return this.unauthorized("user");
        case ob.match(/csrf/i,e.name,e.message):return this.csrf();
        case ob.match(/cast/i,e.name,e.message):return this.castError();
        case ob.match(/validation/i,e.name,e.message):return this.validation();
        case e instanceof MongoError || ob.match(/mongo/i,e.name,e.message):return this.format<MongoError>(e as MongoError);
        default:return this.someError();}};
    const errTemplate = mapError(e);
    const errObj = {...errTemplate.json(),info:e.message,stack:e.stack};
    errObj.status = (e as AppError).status||errObj.status;
    return new AppError(errObj);}
  constructor(config:OBACoreErrorsConfig){for(const k in config) this[k] = this.make.bind(null,config[k],k);}}
export default OBACoreErrors;
export * from "./error-factory-types";