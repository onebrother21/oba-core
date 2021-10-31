import { Keys } from "@onebro/oba-common";
import { OBACoreEmitterType } from "./emitter-types";
export interface OBACoreEmitter<T> extends OBACoreEmitterType<T> {
}
export declare class OBACoreEmitter<T> {
    get history(): {
        event: Extract<keyof T, string>;
        time: Date;
    }[];
    get values(): Partial<T>;
    get listeners(): (string | symbol)[];
    print<k extends keyof this>(s?: k): void;
    get<k extends Keys<T>>(name?: k): Partial<T> | Partial<T>[k];
    constructor();
}
export default OBACoreEmitter;
export * from "./emitter-types";
