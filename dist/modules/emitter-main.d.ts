import { Keys, Enum } from "@onebro/oba-common";
import { OBACoreEmitterType } from "./emitter-types";
export interface OBACoreEmitter<T> extends OBACoreEmitterType<T & Enum<boolean, "init" | "shutdown">> {
}
export declare class OBACoreEmitter<T> {
    get history(): {
        event: "init" | "shutdown" | Extract<keyof T, string>;
        time: Date;
    }[];
    get values(): Partial<T & Record<"init" | "shutdown", boolean> & Partial<Record<undefined, boolean>>>;
    get listeners(): (string | symbol)[];
    print<k extends keyof this>(s?: k): void;
    get<k extends Keys<T>>(name?: k): Partial<T & Record<"init" | "shutdown", boolean> & Partial<Record<undefined, boolean>>> | Partial<T & Record<"init" | "shutdown", boolean> & Partial<Record<undefined, boolean>>>[k];
    constructor();
}
export default OBACoreEmitter;
export * from "./emitter-types";
