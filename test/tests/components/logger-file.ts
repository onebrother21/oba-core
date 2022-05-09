import {J} from "../../utils";
import fs from "fs";
import path from "path";
import OB,{AppError} from "@onebro/oba-common";
import {OBACore,coreConfig,WinstonQueryOpts} from "../../../src";

export const obaCoreLoggerFileInitTests = () => J.desc("Core Logger (File)",() => {
  let core:OBACore;
  it("init",async () => {
    const c = coreConfig();
    const dirname = path.join(__dirname,"/../../../logs");
    c.logger.file = c.logger.file.map(t => ({...t,dirname}));
    c.logger.db = null;
    c.logger.dbCustom = null;
    core = new OBACore(c);
    await core.init();
    J.is(core);
    J.true(core.logger);
  },1e9);
  it(`has file logger`,async () => J.is(core.logger.file),1e9);
  it(`has logging methods`,async () => {
    J.is(core.logger.file.access);
    J.is(core.logger.file.warn);
    J.is(core.logger.file.error);
    J.is(core.logger.file.info);
  },1e9);
  it(`has query method`,async () => J.is(core.logger.file.query),1e9);
  it(`has logs directory`,async () => {
    const dirname = core.config.logger.file[0].dirname;
    const hasDir = fs.existsSync(dirname);
    J.true(hasDir);
  },1e9);
  it(`log msg from error`,async () => {
    const meta = OB.stringify(new AppError({
      name:"UserInputError",
      message:"That won\'t work fam",
      code:"WHOA",
      status:500,
      stack:"...stacktraces here",
    }).json(1));
    try {
      const info = await core.logger.postLogMsg("error",meta);
      J.is(info);
    }
    catch(e){OB.error(e);}
  },1e9);
  it(`log msg from req`,async () => {
    const meta = OB.stringify({
      ip:"123.45.67.890",
      method:"GET",
      url:"/OB/A/123",
      status:200,
    });
    try {
      const info = await core.logger.postLogMsg("access",meta);
      J.is(info);
    }
    catch(e){OB.error(e);}
  },1e9);
  it(`runs log query`,async () => {
    await OB.sleep(500);
    const aDayAgo = new Date().getTime() - 25 * 24 * 60 * 60 * 1000;
    const Q = core.logger.file.query.bind(core.logger.file) as Function;
    const q:WinstonQueryOpts = {
      from:new Date(aDayAgo),
      until:new Date(),
      limit:10,
      start:0,
      order:"asc",
      fields:["time"]
    };
    const cb = (done:Function,fail:Function,e:Error,results:any) => e?fail(e):done(results);
    const resultsObj:{file?:any[];} = await new Promise((done,fail) => core.logger.file.query(q,cb.bind(null,done,fail)));
    const {file:results_} = resultsObj||{};
    const results = results_.map((m:any) => OB.parse(m));
    OB.info("query results",{results});
    J.is(results);
    J.arr(results);
    //J.gt(results.length,0);
  },1E9);
  it(`print component`,async () => {core.logger.print()},1E9);
});