import {J} from "../utils";
import {allCoreComponents} from "./components";
import OB from "@onebro/oba-common";

export const init = () => J.desc("INIT",() => {
  it("Init",async () => {await J.refreshDb();},1E9);
});
export const finalCheck = () => J.desc("INIT CORE",() => {
  it("Final Init Core Api",async () => {
    const {core} = await J.initApp("OBA_CORE");
    //core.print();
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