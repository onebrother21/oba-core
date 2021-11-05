import {EventEmitter} from "events";
import {Keys,Callback} from "@onebro/oba-common";

export type OBACoreEmitterCallback<Event> = Callback<Event>;
export type OBACoreEmitterConfig<Ev> = {[k in Keys<Ev>]?:OBACoreEmitterCallback<Ev[k]>;};
export type OBACoreEmitterType<Ev> = {
  _emitter:EventEmitter;
  _history:{event:Keys<Ev>,time:Date}[];
  _values:Partial<Ev>;
  on<k extends Keys<Ev>>(s:k,l:OBACoreEmitterConfig<Ev>[k]):void;
  emit<k extends Keys<Ev>>(s:k,v:Ev[k]):void;
};