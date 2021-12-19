import {MongoServerError} from "mongodb";
import OB,{AppError,Component} from "@onebro/oba-common";
import { OBACoreErrorFactoryType, OBACoreErrorFactoryConfigType } from "./error-factory-types";

export type OBACoreErrorFactoryConfig = OBACoreErrorFactoryConfigType;
export interface OBACoreErrorFactory extends Component<OBACoreErrorFactoryConfig>,OBACoreErrorFactoryType {}
export class OBACoreErrorFactory extends Component<OBACoreErrorFactoryConfig> {
  init = async () => {this._ = {};for(const k in this.config) this._[k] = this.make.bind(null,this.config[k],k);};
  format<T>(e:T){return new AppError(e);}
  make(e:AppError,k:string):AppError;
  make(e:AppError,k:string,status:number):AppError;
  make(e:AppError,k:string,data:string):AppError;
  make(e:AppError,k:string,status:number,data:string):AppError;
  make(e:AppError,k:string,status?:string|number,data?:string):AppError{
    const errCode = k.toLocaleUpperCase();
    const errStatus = OB.num(status)?status:e.status;
    const errData = OB.str(status)?status:data;
    const errMsg = errData?e.message.replace("%s",errData):e.message;
    const modified = Object.assign({},e,{
      status:errStatus,
      code:errCode,
      message:errMsg,
    });
    return new AppError(modified);
  }
  mapKnownError(e:Error){
    switch(true){
      case OB.match(/authorized/i,e.name,e.message):
      case OB.match(/jsonwebtoken/i,e.name,e.message):
      case OB.match(/jwt/i,e.name,e.message):return this._.unauthorized("user");
      case OB.match(/csrf/i,e.name,e.message):return this._.csrf();
      case OB.match(/cast/i,e.name,e.message):return this._.castError();
      case OB.match(/validation/i,e.name,e.message):return this._.validation();
      case e instanceof MongoServerError || OB.match(/mongo/i,e.name,e.message):return this.format<MongoServerError>(e as MongoServerError);
      default:return this._.someError();
    }
  }
  map(e:Error|AppError):AppError {
    const errTemplate = this.mapKnownError(e);
    const errObj = {...errTemplate.json(),info:e.message,stack:e.stack};
    errObj.status = (e as AppError).status||errObj.status;
    return new AppError(errObj);
  }
}
export default OBACoreErrorFactory;