import mongoose,{Document,Model,Schema} from "mongoose";
import {MongoClient,MongoClientOptions} from "mongodb";
import bluebird from "bluebird";
import {OBACoreDBType,OBACoreDBConfig} from "./db-types";
import OBA from "@onebro/oba-common";
mongoose.Promise = bluebird;

export interface OBACoreDB extends OBACoreDBType {}
export class OBACoreDB {
  constructor(public config:OBACoreDBConfig){this.connections = {};}
  async start(){
    const {connections,opts} = this.config;
    for(const k in connections){
      const name = k,uri = connections[k];
      OBA.trace(`Attempting to connect @ ${uri}`);
      try{
        const connection = await mongoose.createConnection(uri,opts).asPromise();
        this.connections[name] = {uri,client:connection};
        OBA.ok(`MongoDB connected -> ${name.toLocaleUpperCase()}`);
      }
      catch(e){
        OBA.warn(`MongoDB connection failed -> ${e.message||e}`);
        this.connections[name] = null;
      }
    }
  }
  async shutdown(){for(const k in this.connections){await this.connections[k].client.close();}}
  async startNative(name:string,uri:string,opts:MongoClientOptions){
    try{
      const connection = await MongoClient.connect(uri,opts);
      return connection.db(name);}
    catch(e){OBA.error(`DB Error: ${e}`);}}
  print(){ob.info(this);}
  get(dbName:string){return this.connections[dbName];}
  async model<T extends Document,U extends Model<T>>(dbName:string,modelName:string,schema:Schema<T>,collection:string):Promise<U> {
    const db = this.get(dbName).client;
    const model = db.model<T,U>(modelName,schema,collection);
    await model.init();
    return model;
  }
}
export default OBACoreDB;