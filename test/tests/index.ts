import {J} from "../utils";
import {allCoreComponents} from "./components";

export const init = () => J.utils.desc("INIT",() => {
  it("Init",async () => {await J.utils.refreshDb();},1E9);
});
export const finalCheck = () => J.utils.desc("INIT CORE",() => {
  it("Final Init Core Api",async () => {
    const {core} = await J.utils.init("OBA_CORE");
    core.print();
  },1E9);
});
export const wrapup = () => J.utils.desc("WRAPUP",() => {
  it("Wrapup",async () => {console.log("complete");},1E9);
});
export const allTests = () => J.utils.desc("ALL TESTS",() => {
  init();
  allCoreComponents();
  //finalCheck();
  wrapup();
});