import { OBACoreEmitterType } from "./emitter-types";
import { Keys } from "@onebro/oba-common";
export interface OBACoreEmitter<T> extends OBACoreEmitterType<T & {
    "shutdown": boolean;
}> {
}
export declare class OBACoreEmitter<T> {
    get history(): {
        event: Partial<T & {
            shutdown: boolean;
        }>;
        time: Date;
    }[];
    get values(): Partial<T & {
        shutdown: boolean;
    }>;
    get listeners(): (string | symbol)[];
    print<k extends keyof this>(s?: k): void;
    get<k extends Keys<T>>(name?: k): Partial<T & {
        shutdown: boolean;
    }> | Partial<T & {
        shutdown: boolean;
    }>[k];
    constructor();
}
export default OBACoreEmitter;
export * from "./emitter-types";
