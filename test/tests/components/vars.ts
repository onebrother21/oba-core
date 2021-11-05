import {J} from "../../utils";
import {OBACoreApi,OBACoreConfig,coreConfig} from "../../../src";

export const obaCoreVarsInitTests = () => J.utils.desc("AM Vars Init",() => {
  let core:OBACoreApi<null>,c:OBACoreConfig<null>;
  it("init",async () => {
    const {vars} = coreConfig("OBA_CORE");
    c = {vars};
    core = new OBACoreApi(c);
    J.is(core);
    J.true(core.vars);
  });
  it("has core.vars",async () => {
    J.is(core.vars);
    console.log(core.vars);
  });
});