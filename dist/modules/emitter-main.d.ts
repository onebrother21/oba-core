import { Keys } from "@onebro/oba-common";
import { OBACoreEmitterConfig, OBACoreEmitterType } from "./emitter-types";
export interface OBACoreEmitter<Ev> extends OBACoreEmitterType<Ev> {
}
export declare class OBACoreEmitter<Ev> {
    get history(): {
        event: Extract<keyof Ev, string>;
        time: Date;
    }[];
    get values(): Partial<Ev>;
    get listeners(): (string | symbol)[];
    print<k extends keyof this>(s?: k): void;
    get<k extends Keys<Ev>>(name?: k): Partial<Ev> | Partial<Ev>[k];
    constructor(o: OBACoreEmitterConfig<Ev>);
}
export default OBACoreEmitter;
export * from "./emitter-types";
