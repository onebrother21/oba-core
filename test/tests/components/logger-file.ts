import {J} from "../../utils";
import fs from "fs";
import path from "path";
import OB,{AppError} from "@onebro/oba-common";
import {OBACoreApi,coreConfig,WinstonQueryOpts} from "../../../src";

export const obaCoreLoggerFileInitTests = () => J.desc("Core Logger (File)",() => {
  let core:OBACoreApi;
  it("init",async () => {
    const c = coreConfig("OBA_CORE");
    const dirname = path.join(__dirname,"/../../../logs");
    c.logger.file = c.logger.file.map(t => ({...t,dirname}));
    c.logger.db = null;
    c.logger.dbCustom = null;
    core = new OBACoreApi(c);
    await core.init();
    J.is(core);
    J.true(core.logger);
  });
  it(`has file logger`,async () => J.is(core.logger.file));
  it(`has logging methods`,async () => {
    J.is(core.logger.file.access);
    J.is(core.logger.file.warn);
    J.is(core.logger.file.error);
    J.is(core.logger.file.info);
  });
  it(`has query method`,async () => J.is(core.logger.file.query));
  it(`has logs directory`,async () => {
    const dirname = core.config.logger.file[0].dirname;
    const hasDir = fs.existsSync(dirname);
    J.true(hasDir);
  });
  it(`log msg from error`,async () => {
    const meta = new AppError({
      name:"UserInputError",
      message:"That won\'t work fam",
      code:"WHOA",
      status:500,
      stack:"...stacktraces here",
    }).json();
    try {
      const errorLogger = core.logger.file.error;
      const info = await errorLogger(OB.stringify(meta));
      J.is(info);
    }
    catch(e){OB.error(e);}
  });
  it(`log msg from req`,async () => {
    const r = {
      ip:"123.45.67.890",
      method:"GET",
      url:"/OB/A/123",
      status:200,
    };
    try {
      const accessLogger = core.logger.file.access;
      const info = await accessLogger(OB.stringify(r));
      J.is(info);
    }
    catch(e){OB.error(e);}
  });
  it(`runs log query`,(done) => {
    const logQuery:WinstonQueryOpts = {
      from:new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      until:new Date(),
      limit:10,
      start:0,
      order:"asc",
      fields:["meta","time"]
    };
    try {
      const cb = (e:Error,results:any) => {
        if(e){
          OB.error(e);
          throw e;
        }
        else {
          J.is(results);
          J.is(results.file);
          J.arr(results.file);
          J.gt(results.file.length,0);
          const R = results.file.map((m:any) => {
            let m_:any;
            try{m_ = JSON.parse(m);}
            catch(e){m_ = m;};
            return m_;
          });
          //OB.info("query results",R);
        }
        done();
      };
      core.logger.file.query(logQuery,cb);
    }
    catch(e){OB.error(e);}
  },1E9);
  //it(`print component`,async () => {core.logger.print()},1E9);
});