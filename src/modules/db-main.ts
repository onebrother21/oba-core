import mongoose,{Document,Model,Schema} from "mongoose";
import {MongoClient,MongoClientOptions} from "mongodb";
import bluebird from "bluebird";
import {OBACoreDBType,OBACoreDBConfig} from "./db-types";
import OB,{ Component } from "@onebro/oba-common";
mongoose.Promise = bluebird;

export interface OBACoreDB<Ev> extends Component<OBACoreDBConfig,Ev>,OBACoreDBType {}
export class OBACoreDB<Ev> extends Component<OBACoreDBConfig,Ev> {
  init = async () => {
    this.connections = {};
    const {connections,opts} = this.config;
    for(const k in connections) {
      const name = k,uri = connections[k];
      const dbStr = `-> ${name.toLocaleUpperCase()} @ ${uri}`;
      OB.trace(`Attempting to connect ${dbStr}`);
      try {
        const connection = await mongoose.createConnection(uri,opts).asPromise();
        this.connections[name] = {uri,connection};
        OB.ok(`MongoDB connected ${dbStr}`);
      }
      catch(e){
        this.connections[name] = null;
        OB.warn(`MongoDB connection failed -> ${e.message||e}`);
      }
    }
  };
  shutdown = async () => {for(const k in this.connections){await this.connections[k].connection.close();}};
  startNative = async (name:string,uri:string,opts:MongoClientOptions) => {
    try{
      const connection = await MongoClient.connect(uri,opts);
      return connection.db(name);}
    catch(e){OB.error(`DB Error: ${e}`);}
  };
  get(dbName:string){return this.connections[dbName];}
  model = async <T extends Document,U extends Model<T>>(dbName:string,modelName:string,schema:Schema<T>,collection:string):Promise<U> => {
    const db = this.get(dbName).connection;
    const model = db.model<T,U>(modelName,schema,collection);
    await model.init();
    return model;
  };
}
export default OBACoreDB;