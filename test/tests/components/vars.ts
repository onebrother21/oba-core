import {J} from "../../utils";
import {OBACoreApi,OBACoreConfig,coreConfig} from "../../../src";

export const obaCoreVarsInitTests = () => J.utils.desc("AM Vars Init",() => {
  let core:OBACoreApi<null>,c:OBACoreConfig,vars:OBACoreApi<null>["vars"];
  it("init",async () => {
    c = coreConfig("OBA_CORE");
    core = new OBACoreApi({vars:c.vars});
    J.is(core);
    J.true(core.vars);
    vars = core.vars;});
  it("has vars",async () => {
    J.is(vars);
    console.log({vars});
  });
});