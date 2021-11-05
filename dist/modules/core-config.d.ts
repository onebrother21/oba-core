import { OBACoreConfig } from "./core-main";
declare const setDefaultConfigWithEnvironment: <Ev>(prefix: string) => Partial<import("./core-types").OBACoreConfigType<Ev>>;
export { setDefaultConfigWithEnvironment as coreConfig };
