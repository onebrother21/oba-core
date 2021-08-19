import {J} from "../utils";
import {OBACore,OBACoreConfig,masterConfig} from "../../src";

export const obaCoreVarsInitTests = () => J.desc("AM Vars Init",() => {
  let m:OBACore<null>,c:OBACoreConfig,vars:OBACore<null>["vars"];
  it("init",async () => {
    c = masterConfig("OBA_CORE");
    m = new OBACore({vars:c.vars});
    J.is(m);
    J.true(m.vars);
    vars = m.vars;});
  it("has vars",async () => {
    J.is(vars);
    //console.log({vars});
  });
});