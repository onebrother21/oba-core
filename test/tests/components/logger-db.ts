import {J} from "../../utils";
import OBA,{AppError} from "@onebro/oba-common";
import {OBACoreApi,coreConfig,WinstonQueryOpts} from "../../../src";

export const obaCoreLoggerDbInitTests = () => J.utils.desc("AM Logger Init (Db)",() => {
  let core:OBACoreApi<null>,logmsg:string;
  it("init",async () => {
    const c = coreConfig("OBA_CORE");
    const db = c.db.connections[c.vars.name];
    c.logger.db = c.logger.db.map(t => ({...t,db}));
    c.logger.file = null;
    core = new OBACoreApi(c);
    await core.init(1);
    J.is(core);
    J.true(core.logger);
  });
  it(`has db logger`,async () => {J.is(core.logger.db);});
  it(`has logging methods`,async () => {
    J.is(core.logger.db.access);
    J.is(core.logger.db.warn);
    J.is(core.logger.db.error);
    J.is(core.logger.db.info);
    J.is(core.logger.db.crit);
    J.is(core.logger.db.debug);});
  it(`has query methods`,async () => J.is(core.logger.db.query));
  it(`makes log msg from error`,async () => {
    const e = new AppError({
      name:"UserInputError",
      message:"That won\'t work fam",
      code:"WHOA",
      status:500,
      stack:"...stacktraces here"
    });
    logmsg = core.logger.getMsg(e);
    J.is(logmsg);
  });
  it(`writes log msg to db`,async () => {
    try{
      const errorLogger = core.logger.db.error as any;
      const info = await errorLogger(logmsg);
      J.is(info);
    }
    catch(e){console.error(e);}
  },1E9);
  it(`has log collection`,async () => {
    await OBA.sleep(50);
    const db = core.db.get(core.vars.name);
    const logName = core.config.logger.db[0].collection;
    const collections = db && logName?db.conn.db.listCollections():null;
    console.log(collections);
    //const hasCollection = isDbLogger && collection;
    //isDbLogger?J.true(hasCollection):null;
  },1e9);
  it(`runs log query **INCORRECT IMPLEMENTATION**`,async () => {
    const logQuery:WinstonQueryOpts = {
      from:new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      until:new Date(),
      limit:10,
      start:0,
      order:'asc' as 'asc',
      fields:['message']
    };
    try{
    }
    catch(e){console.error(e);throw e;}
  },1E9);
  it(`print component`,async () => {core.logger.print()},1E9);
});