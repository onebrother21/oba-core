import OBA,{Keys,Enum, AnyArr}from "@onebro/oba-common";
import { EventEmitter } from "events";
import { OBACoreEmitterType } from "./emitter-types";

export interface OBACoreEmitter<T> extends OBACoreEmitterType<T> {}
export class OBACoreEmitter<T> {
  get history(){return this._history;}
  get values(){return this._values;}
  get listeners(){return this._emitter.eventNames();}
  print<k extends keyof this>(s?:k){OBA.info(s?({[s]:this[s]}):this);}
  get<k extends Keys<T>>(name?:k){return name?this._values[name]:this.values;}
  constructor(){
    this._history = [];
    this._values = {shutdown:false} as any;
    this._emitter = new EventEmitter();
    this.on = (s,l) => this._emitter.on(s as string,l);
    this.emit = (s,v) => {
      this._history.unshift({event:s,time:new Date()});
      this._values[s] = v;
      this._emitter.emit(s as string,v);
    };
  }
}
export default OBACoreEmitter;
export * from "./emitter-types";