import {J} from "../../utils";
import fs from "fs";
import path from "path";
import {AppError} from "@onebro/oba-common";
import {OBACoreApi,coreConfig,WinstonQueryOpts} from "../../../src";

export const obaCoreLoggerFileInitTests = () => J.utils.desc("AM Logger Init (File)",() => {
  let core:OBACoreApi<null>,logmsg:string;
  it("init",async () => {
    const c = coreConfig("OBA_CORE");
    const dirname = path.join(__dirname,"/../../../logs");
    c.logger.file = c.logger.file.map(t => ({...t,dirname}));
    c.logger.db = null;
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
    J.is(core.logger.file.crit);
    J.is(core.logger.file.debug);
  });
  it(`has query method`,async () => J.is(core.logger.file.query));
  it(`has logs directory`,async () => {
    const dirname = core.config.logger.file[0].dirname;
    const hasDir = fs.existsSync(dirname);
    J.true(hasDir);
  });
  it(`makes log msg from error`,async () => {
    const e = new AppError({
      name:"UserInputError",
      message:"That won\'t work fam",
      code:"WHOA",
      status:500,
      stack:"...stacktraces here",
    });
    logmsg = core.logger.getMsg(e);
    J.is(logmsg);
  });
  it(`writes log msg to file`,async () => {
    try {
      const errorLogger = core.logger.file.error;
      const info = errorLogger(logmsg);
      J.is(info);
    }
    catch(e){console.error(e);}
  });
  it(`runs log query`,(done) => {
    const logQuery:WinstonQueryOpts = {
      from:new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      until:new Date(),
      limit:10,
      start:0,
      order:"asc",
      fields:["message"]
    };
    try {
      const cb = (e:Error,results:any) => {
        if(e){
          console.error(e);
          throw e;
        }
        else {
          J.is(results);
          J.is(results.file);
          J.arr(results.file);
          J.gt(results.file.length,0);
          console.info(results.file.map((m:any) => {
            let m_:any;
            try{m_ = JSON.parse(m);}
            catch(e){m_ = m;};
            return m_;
          }));
        }
        done();
      };
      core.logger.file.query(logQuery,cb);
    }
    catch(e){console.error(e);}
  });
  it(`print component`,async () => {core.logger.print()},1E9);
});