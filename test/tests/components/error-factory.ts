import {J} from "../../utils";
import {
  OBACore,
  OBACoreConfig,
  coreConfig
} from "../../../src";
import OB from "@onebro/oba-common";

export const obaCoreErrorFactoryInitTests = () => J.desc("Core Error Factory",() => {
  let core:OBACore,c:OBACoreConfig;
  it("init",async () => {
    const {vars,errors} = coreConfig();
    c = {vars,errors};
    core = new OBACore(c);
    await core.init();
    J.is(core);
    J.true(core.e);
  });
  it("404",async () => {
    const test = core.e._.notfound();
    J.error(test);
    J.is(test.status,404);
    J.match(test.message,/not found/i);
  });
  it("Cors",async () => {
    const test = core.e._.cors();
    J.error(test);
    J.is(test.status,403);
    J.match(test.message,/cors/i);
  });
  it("existing data",async () => {
    const test = core.e._.existing("data");
    J.error(test);
    J.is(test.status,422);
    J.match(test.message,/exists/i);
  });
  it("data not found",async () => {
    const test = core.e._.doesNotExist("user");
    J.error(test);
    J.is(test.status,404);
    J.match(test.message,/not exist/i);
  });
  it("invalid data",async () => {
    const test = core.e._.invalid("api credentials");
    J.error(test);
    J.is(test.status,400);
    J.match(test.message,/invalid/i);
  });
  it("missing data",async () => {
    const test = core.e._.missing("handle");
    J.error(test);
    J.is(test.status,400);
    J.match(test.message,/missing/i);
  });
  it("data mismatch",async () => {
    const test = core.e._.mismatch("pin");
    J.error(test);
    J.is(test.status,400);
    J.match(test.message,/mismatch/i);
  });
  it("csrf",async () => {
    const test = core.e.map(new Error("CSRF"));
    J.error(test);
    J.is(test.status,403);
    J.match(test.message,/access denied/i);
  });
  it("req validation",async () => {
    const test = core.e.map(new Error("ValidationErr"));
    J.error(test);
    J.is(test.status,400);
    J.match(test.message,/check data/i);
  });
  it("cast error",async () => {
    const test = core.e.map(new Error("castError"));
    J.error(test);
    J.is(test.status,422);
    J.match(test.message,/check data/i);
  });
  it("some random error",async () => {
    const test = core.e.map(new Error("sdihfifhsoif"));
    J.error(test);
    J.is(test.status,500);
    J.match(test.message,/oops/i);
    J.match(test.info as any,/sdihfifhsoif/i);
  });
  it("print component",async () => {core.e.print();});
});