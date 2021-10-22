import {J} from "../../utils";
import {OBACoreApi,OBACoreConfig,coreConfig} from "../../../src";

type OBACoreEvents = {
  config:OBACoreConfig;
  serverOK:{name:string,host:string;port:number;env:string};
  dbOK:{name:string,uri:string};
  test:number;
};
export const obaCoreEmitterInitTests = () => J.utils.desc("AM Emitter Init",() => {
  let core:OBACoreApi<OBACoreEvents>,c:OBACoreConfig,events:OBACoreApi<OBACoreEvents>["events"];
  it("init",async () => {
    c = coreConfig("OBA_CORE");
    core = new OBACoreApi({events:c.events});
    J.is(core);
    J.true(core.events);
    events = core.events;
  });
  it("register listener",async () => {
    events.on("config",b => console.log({config:b}));
    events.on("test",b => console.log({test:b}));
    events.on("dbOK",(o:any) => console.log(o));
    J.includes(events.listeners,"test");
  });
  it("send known event",async () => {
    events.emit("config",c);
    events.emit("dbOK",{name:"ob",uri:"siofhoidjf"});
    J.is(events.values["dbOK"].name,"ob");})
  it("send unknown event",async () => {
    events.emit("test",13);
    J.is(events.values["test"],13);});
  it("get listeners",async () => {
    J.arr(events.listeners);
    J.gt(events.listeners.length,0);
    events.print("listeners");});
  it("get history",async () => {
    events.emit("test",13);
    J.arr(events.history);
    J.gt(events.history.length,0);
    events.print("history");});
  it("get values",async () => {
    J.true(events.values);
    J.gt(Object.keys(events.values).length,0);
    events.print("values");});
});