import {J} from "../../utils";
import OB,{AppError} from "@onebro/oba-common";
import {OBACoreApi,coreConfig,WinstonQueryOpts} from "../../../src";

export const obaCoreLoggerDbInitTests = () => J.desc("Core Logger (Db)",() => {
  let core:OBACoreApi;
  it("init",async () => {
    const c = coreConfig("OBA_CORE");
    const db = c.db.uri;
    c.logger.db = c.logger.db.map(t => ({...t,db}));
    c.logger.file = null;
    c.logger.dbCustom = null;
    core = new OBACoreApi(c);
    await core.init(1);
    J.is(core);
    J.true(core.logger);
  },1e9);
  it(`has db logger`,async () => {J.is(core.logger.db);},1e9);
  it(`has logging methods`,async () => {J.is(core.logger.db.info);},1e9);
  it(`has query method`,async () => J.is(core.logger.db.query),1e9);
  it(`log msg from error`,async () => {
    const meta = new AppError({
      name:"UserInputError",
      message:"That won\'t work fam",
      code:"WHOA",
      status:500,
      stack:"...stacktraces here"
    }).json();
    try{
      const dbLogger = core.logger.db.info;
      const info = await dbLogger("ERROR",{meta});
      J.is(info);
    }
    catch(e){OB.error(e);}
  },1E9);
  it(`log msg from req info`,async () => {
    const r = {
      ip:"123.45.67.890",
      method:"GET",
      url:"/OB/A/123",
      status:200,
    };
    try {
      const dbLogger = core.logger.db.info;
      const info = await dbLogger("ACCESS",{meta:r});
      J.is(info);
    }
    catch(e){OB.error(e);}
  });
  it(`has log collection`,async () => {
    await OB.sleep(10);
    const connection = core.db.get();
    const logName = core.config.logger.db[0].collection;
    const collections = connection && logName?await connection.db.listCollections().toArray():null;
    //OB.log(collections);
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
    catch(e){OB.error(e);throw e;}
  },1E9);
  //it(`print component`,async () => {core.logger.print()},1E9);
});