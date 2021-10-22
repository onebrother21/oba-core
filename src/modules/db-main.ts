import mongoose,{ConnectionOptions,Document,Model,Schema} from "mongoose";
import {MongoClient,MongoClientOptions} from "mongodb";
import bluebird from "bluebird";
import {OBACoreDBType,OBACoreDBConfig} from "./db-types";
import * as ob from "@onebro/oba-common";
mongoose.Promise = bluebird;

export interface OBACoreDB extends OBACoreDBType {}
export class OBACoreDB {
  constructor(public config:OBACoreDBConfig){this.connections = {};}
  async model<T extends Document,U extends Model<T>>(dbName:string,modelName:string,schema:Schema<T>,collection: string):Promise<U> {
    const db = this.get(dbName).client;
    const model = db.model<T,U>(modelName,schema,collection);
    await model.init();
    return model;
  }
  async start(){
    const {connections,opts} = this.config;
    const start = async (name:string,uri:string,opts:ConnectionOptions) => {
      ob.trace(`Attempting to connect @ ${uri}`);
      try{
        const newConnection = await mongoose.createConnection(uri,opts);
        const connection = {uri,client:newConnection};
        this.connections[name] = connection;
        ob.ok(`MongoDB connected -> ${name.toLocaleUpperCase()}`);
      }
      catch(e){
        ob.warn(`MongoDB connection failed -> ${e.message||e}`);
        this.connections[name] = null;
      }
    };
    for(const k in connections) await start(k,connections[k],opts);}
  async shutdown(){for(const k in this.connections){await this.connections[k].client.close();}}
  async startNative(name:string,uri:string,opts:MongoClientOptions){
    try{
      const connection = await MongoClient.connect(uri,opts);
      return connection.db(name);}
    catch(e){ob.error(`DB Error: ${e}`);}}
  print(){ob.info(this);}
  get(db:string){return this.connections[db];}
}
export default OBACoreDB;
export * from "./db-types";