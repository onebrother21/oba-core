import {EventEmitter} from "events";
import {Keys,Callback} from "@onebro/oba-common";

export type OBACoreEmitterCallback<T> = Callback<T>;
export type OBACoreEmitterConfig = {};
export type OBACoreEmitterType<T> = {
  _emitter:EventEmitter;
  _history:{event:Keys<T>,time:Date}[];
  _values:Partial<T>;
  on<k extends Keys<T>>(s:k,l:OBACoreEmitterCallback<T[k]>):void;
  emit<k extends Keys<T>>(s:k,v:T[k]):void;
};