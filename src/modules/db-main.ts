import mongoose,{Document,Model,Schema} from "mongoose";
import {MongoClient,MongoClientOptions} from "mongodb";
import bluebird from "bluebird";
import {OBACoreDBType,OBACoreDBConfigType} from "./db-types";
import OB,{Component,AnyBoolean} from "@onebro/oba-common";
mongoose.Promise = bluebird;

export type OBACoreDBConfig = OBACoreDBConfigType;
export interface OBACoreDB extends Component<OBACoreDBConfig>,OBACoreDBType {}
export class OBACoreDB extends Component<OBACoreDBConfig> {
  get(){return this.connection;}
  init = async (start?:AnyBoolean) => {
    if(start){
      const {name,uri,opts} = this.config;
      const dbStr = `-> ${name.toLocaleUpperCase()} @ ${uri}`;
      OB.trace(`Attempting to connect ${dbStr}`);
      try {
        this.connection =  await mongoose.createConnection(uri,opts).asPromise();
        Object.assign(this,this.config);
        OB.ok(`MongoDB connected ${dbStr}`);
      }
      catch(e){
        this.connection = null;
        OB.warn(`MongoDB connection failed -> ${e.message||e}`);
      }
    }
  }
  shutdown = async () => await this.connection.close();
  startNative = async (name:string,uri:string,opts:MongoClientOptions) => {
    try{
      const connection = await MongoClient.connect(uri,opts);
      return connection.db(name);
    }
    catch(e){OB.error(`DB Error: ${e}`);}
  };
  model = async <T extends Document,U extends Model<T>>(modelName:string,schema:Schema<T>,collection:string):Promise<U> => {
    const db = this.get();
    const model = db.model<T,U>(modelName,schema,collection);
    await model.init();
    return model;
  };
}
export default OBACoreDB;