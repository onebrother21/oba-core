import {J} from "../utils";
import {App} from "../app";
import {allCoreComponents} from "./components";
import OB from "@onebro/oba-common";

export const init = () => J.desc("INIT",() => {
  it("Init",async () => {
    await App.refresh();
    const intro = "AppName: "+OB.appEnvName()+", Environment: "+OB.env()?.toLocaleUpperCase();
    OB.ok("**tests started**",intro);
  },1E9);
});
export const finalCheck = () => J.desc("INIT CORE",() => {
  it("Final Init Core Api",async () => {
    const {core} = await App.init(1);
    core.print();
  },1E9);
});
export const wrapup = () => J.desc("WRAPUP",() => {
  it("Wrapup",async () => {OB.log("complete");},1E9);
});
export const allTests = () => J.desc("ALL TESTS",() => {
  init();
  allCoreComponents();
  finalCheck();
  wrapup();
});