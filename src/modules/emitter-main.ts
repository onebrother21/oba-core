import { OBACoreEmitterType,OBACoreEmitterConfig } from "./emitter-types";
import * as ob from "@onebro/oba-common";
import { Keys }from "@onebro/oba-common";
import { EventEmitter } from "events";

export interface OBACoreEmitter<T> extends OBACoreEmitterType<T & {"shutdown":boolean}> {}
export class OBACoreEmitter<T> {
  get history(){return this._history;}
  get values(){return this._values;}
  get listeners(){return this._emitter.eventNames();}
  print<k extends keyof this>(s?:k){ob.info(s?({[s]:this[s]}):this);}
  get<k extends Keys<T>>(name?:k){return name?this._values[name]:this.values;}
  constructor(){
    this._history = [];
    this._values = {shutdown:false} as any;
    this._emitter = new EventEmitter();
    this.on = (s,l) => this._emitter.on(s as string,l);
    this.emit = (s,v) => {
      this._history.unshift({event:{[s]:v} as any,time:new Date()});
      this._values[s] = v;
      this._emitter.emit(s as string,v);
    };
    for(const i of ["SIGUSR2","SIGINT","SIGTERM","exit"]) process.on(i,() => ob.warn(i) && this.emit("shutdown" as any,true));
  }
}
export default OBACoreEmitter;
export * from "./emitter-types";