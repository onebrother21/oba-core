import {Schema,Document,Model} from "mongoose";
import OB,{Keys,Enum,AppEntity} from "@onebro/oba-common";
import {OBACoreDB} from "./db-main";
import {WinstonLoggerLevels,WinstonTransportCustomDbConfig} from "./logger-types";


export type LogMsg = AppEntity & Document;
export type WinstonLoggerLevelKeys = Keys<WinstonLoggerLevels>;

const logMsgSchema = new Schema({level:{type:String},label:{type:String},meta:{type:Object}},{
  timestamps:{createdAt:"timestamp",updatedAt:false},
  toObject:{virtuals:true},
  toJSON:{virtuals:true}
});
logMsgSchema.virtual("other").get(function(){return Date.now();});

export type OBACoreLoggerDbCustomMethods = Enum<(meta:any) => Promise<any>,undefined,WinstonLoggerLevelKeys>;
export interface OBACoreLoggerDbCustomWrapper extends OBACoreLoggerDbCustomMethods {}
export class OBACoreLoggerDbCustomWrapper {
  constructor(public label:string,public config:WinstonTransportCustomDbConfig[]){}
  models:Enum<Model<LogMsg>,undefined,WinstonLoggerLevelKeys> = {};
  get(level:WinstonLoggerLevelKeys){return this.models[level];}
  init = async (db:OBACoreDB) => {
    if(db && db.connection){
      for(let i = 0,l = this.config.length;i<l;i++){
        const opts = this.config[i];
        const level = opts.level as WinstonLoggerLevelKeys;
        const modelName = opts.collection.toUpperCase();
        const collection = opts.collection.toLowerCase();
        this.models[level] = await db.model<LogMsg,Model<LogMsg>>(modelName,logMsgSchema,collection);
        this[level] = this.create.bind(this,level);
      }
    }
  };
  create = async (level:WinstonLoggerLevelKeys,meta:any) => {
    const m = this.get(level);
    const n = new m({meta,label:this.label,level:level.toLocaleUpperCase()});
    await n.save();
    return n.toJSON();
  }
  query = async (level:WinstonLoggerLevelKeys,q:any) => await this.models[level].find(q).limit(50).sort("-created");//{name:/J/});
}
export default OBACoreLoggerDbCustomWrapper;

//fetch = async (id:string) => await this.model.findById(id);
//fetcByName = async (name:string) => await this.model.findOne({name});
//update = async (id:string,updates:any) => await this.model.findByIdAndUpdate(id,updates);//{name:"Jimmy",value:8},{new:true});
//remove = async (id:string) => await this.model.findByIdAndRemove(id);
//createMany = async ([{name:"Johnny"},{name:"Jimmy"}]:any[]) => await this.model.create(newOnes);
//updateMany = async () => await this.model.updateMany({name:/J/},{value:5});
//removeMany = async () => await this.model.deleteMany({name:/J/});