/// <reference types="node" />
import { EventEmitter } from "events";
import { Keys, Callback } from "@onebro/oba-common";
export declare type OBACoreEmitterCallback<Event> = Callback<Event>;
export declare type OBACoreEmitterConfig<Ev> = {
    [k in Keys<Ev>]?: OBACoreEmitterCallback<Ev[k]>;
};
export declare type OBACoreEmitterType<Ev> = {
    _emitter: EventEmitter;
    _history: {
        event: Keys<Ev>;
        time: Date;
    }[];
    _values: Partial<Ev>;
    on<k extends Keys<Ev>>(s: k, l: OBACoreEmitterConfig<Ev>[k]): void;
    emit<k extends Keys<Ev>>(s: k, v: Ev[k]): void;
};
