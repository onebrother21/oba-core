import {MongoServerError} from "mongodb";
import OBA,{AppError} from "@onebro/oba-common";
import { OBACoreErrorFactoryType, OBACoreErrorFactoryConfig } from "./error-factory-types";

export interface OBACoreErrorFactory extends OBACoreErrorFactoryType {}
export class OBACoreErrorFactory {
  format<T>(e:T){return new AppError(e);}
  make(e:AppError,k:string):AppError;
  make(e:AppError,k:string,status:number):AppError;
  make(e:AppError,k:string,data:string):AppError;
  make(e:AppError,k:string,status:number,data:string):AppError;
  make(e:AppError,k:string,status?:string|number,data?:string):AppError{
    const errCode = k.toLocaleUpperCase();
    const errStatus = OBA.num(status)?status:e.status;
    const errData = OBA.str(status)?status:data;
    const errMsg = errData?e.message.replace("%s",errData):e.message;
    const modified = Object.assign({},e,{
      status:errStatus,
      code:errCode,
      message:errMsg});
    return new AppError(modified);
  }
  mapKnownError(e:Error){
    switch(true){
      case OBA.match(/authorized/i,e.name,e.message):
      case OBA.match(/jsonwebtoken/i,e.name,e.message):
      case OBA.match(/jwt/i,e.name,e.message):return this.unauthorized("user");
      case OBA.match(/csrf/i,e.name,e.message):return this.csrf();
      case OBA.match(/cast/i,e.name,e.message):return this.castError();
      case OBA.match(/validation/i,e.name,e.message):return this.validation();
      case e instanceof MongoServerError || OBA.match(/mongo/i,e.name,e.message):return this.format<MongoServerError>(e as MongoServerError);
      default:return this.someError();
    }
  }
  map(e:Error|AppError):AppError {
    const errTemplate = this.mapKnownError(e);
    const errObj = {...errTemplate.json(),info:e.message,stack:e.stack};
    errObj.status = (e as AppError).status||errObj.status;
    return new AppError(errObj);
  }
  constructor(config:OBACoreErrorFactoryConfig){for(const k in config) this[k] = this.make.bind(null,config[k],k);}
}
export default OBACoreErrorFactory;
export * from "./error-factory-types";