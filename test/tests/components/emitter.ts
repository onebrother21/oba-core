import {J} from "../../utils";
import {OBACoreApi,OBACoreConfig,coreConfig} from "../../../src";
import OBA,{Enum} from "@onebro/oba-common";

type OBACoreEvents = Enum<boolean,"init"|"shutdown"> & {
  config:OBACoreConfig<OBACoreEvents>;
  serverOK:{name:string,host:string;port:number;env:string};
  dbOK:{name:string,uri:string};
  test:number;
};
export const obaCoreEmitterInitTests = () => J.utils.desc("AM Emitter Init",() => {
  let core:OBACoreApi<OBACoreEvents>,c:OBACoreConfig<OBACoreEvents>;
  it("init",async () => {
    const {vars,db} = coreConfig("OBA_CORE");
    c = {vars,db};
    core = new OBACoreApi(c);
    core.config.events = {
      "init":() => OBA.ok(core.vars.name," Running @...",new Date()),
      "config":b => console.log({config:b}),
      "test":b => console.log({test:b}),
      "dbOK":o => console.log(o),
      "shutdown":() => core.db.shutdown(),
    };
    core.init();
    J.is(core);
    J.true(core.events);
  });
  it("register listener",async () => {J.includes(core.events.listeners,"test");});
  it("send known event",async () => {
    core.events.emit("init",true);
    core.events.emit("config",c);
    core.events.emit("dbOK",{name:"ob",uri:"siofhoidjf"});
    core.events.emit("test",13);
    J.is(core.events.values["dbOK"].name,"ob");
    J.is(core.events.values["test"],13);
  });
  it("get listeners",async () => {
    J.arr(core.events.listeners);
    J.gt(core.events.listeners.length,0);
    core.events.print("listeners");});
  it("get history",async () => {
    core.events.emit("test",13);
    J.arr(core.events.history);
    J.gt(core.events.history.length,0);
    core.events.print("history");});
  it("get values",async () => {
    J.true(core.events.values);
    J.gt(Object.keys(core.events.values).length,0);
    core.events.print("values");});
});