import {EventEmitter} from "events";
import {Keys,Callback} from "@onebro/oba-common";

export type OBACoreEmitterCallback<EV> = Callback<EV>;
export type OBACoreEmitterConfig = {};
export type OBACoreEmitterType<EV> = {
  _emitter:EventEmitter;
  _history:{event:Keys<EV>,time:Date}[];
  _values:Partial<EV>;
  on<k extends Keys<EV>>(s:k,l:OBACoreEmitterCallback<EV[k]>):void;
  emit<k extends Keys<EV>>(s:k,v:EV[k]):void;
};