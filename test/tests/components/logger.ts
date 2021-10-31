import {J} from "../../utils";
import fs from "fs";
import winston from "winston";
import {AppError} from "@onebro/oba-common";
import {OBACoreApi,coreConfig} from "../../../src";
import path from "path";

export const obaCoreLoggerInitTests = () => J.utils.desc("AM Logger Init",() => {
  let core:OBACoreApi<null>,logmsg:string;
  const logQuery:winston.QueryOptions = {
    from:new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
    until:new Date(),
    limit:10,
    start:0,
    order:'asc' as 'asc',
    fields: undefined//['message']
  };
  const e = new AppError({
    name:"UserInputError",
    message:"That won\'t work fam",
    //_message:"But seriously, all bad",
    //code:"WHOA",
    status:500,
    stack:"...stacktraces here"});
  it("init",async () => {
    const {logger} = coreConfig("OBA_CORE");
    logger.dirname = path.join(__dirname,"/../../../logs");
    core = new OBACoreApi({logger});
    J.is(core);
    J.true(core.logger);
  });
  it(`has logging methods`,async () => {
    J.is(core.logger.access);
    J.is(core.logger.warn);
    J.is(core.logger.error);
    J.is(core.logger.info);
    J.is(core.logger.crit);
    J.is(core.logger.debug);});
  it(`has query methods`,async () => J.is(core.logger.query));
  it(`has logs directory`,async () => {
    const hasDir = fs.existsSync(core.config.logger.dirname);
    J.true(hasDir);});
  it(`makes log msg from error`,async () => {
    logmsg = core.logger.getMsg(e);
    J.is(logmsg);
    console.log(logmsg);});
  it(`writes log msg to file`,async () => core.logger.error(logmsg));
  it(`runs log query`,(done) => {
    const cb = (e:Error,results:any) => {
      if(e){
        console.error(e);
        throw e;}
      else{
        J.is(results);
        console.log(logQuery);
        console.log(results);
      }
      done();
    };
    core.logger.query(logQuery,cb);
  },1E9);
});