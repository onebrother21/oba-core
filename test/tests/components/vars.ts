import {J} from "../../utils";
import {OBACoreApi,OBACoreConfig,coreConfig} from "../../../src";

export const obaCoreVarsInitTests = () => J.utils.desc("AM Vars Init",() => {
  let core:OBACoreApi<null>;
  it("init",async () => {
    const {vars} = coreConfig("OBA_CORE");
    core = new OBACoreApi({vars});
    J.is(core);
    J.true(core.vars);
  });
  it("has core.vars",async () => {
    J.is(core.vars);
    console.log(core.vars);
  });
});