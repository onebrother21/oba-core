import {J} from "../../utils";
import {OBACoreApi,OBACoreConfig,coreConfig} from "../../../src";
import OBA,{Enum} from "@onebro/oba-common";

type OBACoreEvents = Enum<boolean,"init"|"shutdown"> & {
  config:OBACoreConfig;
  serverOK:{name:string,host:string;port:number;env:string};
  dbOK:{name:string,uri:string};
  test:number;
};
export const obaCoreEmitterInitTests = () => J.utils.desc("AM Emitter Init",() => {
  let core:OBACoreApi<OBACoreEvents>,c:OBACoreConfig;
  it("init",async () => {
    c = coreConfig("OBA_CORE");
    core = new OBACoreApi({events:c.events});
    J.is(core);
    J.true(core.events);
  });
  it("register listener",async () => {
    core.events.on("init",() => OBA.ok(core.vars.name," Running @...",Date.now()));
    core.events.on("config",b => console.log({config:b}));
    core.events.on("test",b => console.log({test:b}));
    core.events.on("dbOK",(o:any) => console.log(o));
    core.events.on("shutdown",() => core.db.shutdown());
    const badsignals = ["SIGUSR2","SIGINT","SIGTERM","exit"];
    for(const i of badsignals) process.on(i,() => OBA.warn("SYSTEM TERMINATING ::",i) && core.events.emit("shutdown",true));
    J.includes(core.events.listeners,"test");
  });
  it("send known event",async () => {
    if(core.vars && core.vars.verbose) core.events.emit("init",true);
    core.events.emit("config",c);
    core.events.emit("dbOK",{name:"ob",uri:"siofhoidjf"});
    J.is(core.events.values["dbOK"].name,"ob");})
  it("send unknown event",async () => {
    core.events.emit("test",13);
    J.is(core.events.values["test"],13);});
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