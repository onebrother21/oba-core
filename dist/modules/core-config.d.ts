import { OBACoreConfig } from "./core-types";
declare const setDefaultConfigWithEnvironment: <Ev>(prefix: string) => Partial<import("./core-types").OBACoreConfigType<Ev>>;
export { setDefaultConfigWithEnvironment as coreConfig };
