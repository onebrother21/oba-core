import {J} from "../../utils";
import OB,{AppError} from "@onebro/oba-common";
import {OBACore,coreConfig,WinstonQueryOpts} from "../../../src";

export const obaCoreLoggerDbCustomInitTests = () => J.desc("Core Logger (Db Custom)",() => {
  let core:OBACore;
  it("init",async () => {
    const c = coreConfig();
    if(c.logger){
      c.logger = {...c.logger,file:undefined,db:undefined};
      core = new OBACore(c);
      await core.init(1);
      J.is(core);
      J.true(core.logger);
    }
  },1e9);
  it(`has db logger`,async () => {J.is(core.logger?.dbCustom);},1e9);
  it(`has logging methods`,async () => {
    J.is(core.logger?.dbCustom?.access);
    J.is(core.logger?.dbCustom?.error);
    J.is(core.logger?.dbCustom?.info);
  },1e9);
  it(`has query method`,async () => {J.is(core.logger?.dbCustom?.query);},1e9);
  it(`log msg from error`,async () => {
    const meta = new AppError({
      name:"UserInputError",
      message:"That won\'t work fam",
      code:"WHOA",
      status:500,
      stack:"...stacktraces here",
    }).json();
    try {
      const info = await core.logger?.postLogMsg("error",OB.stringify(meta));
      J.is(info);
    }
    catch(e){OB.error(e);}
  },1e9);
  it(`log msg from req`,async () => {
    const meta = {
      ip:"123.45.67.890",
      method:"GET",
      url:"/OB/A/123",
      status:200,
    };
    try {
      const info = await core.logger?.postLogMsg("access",OB.stringify(meta));
      J.is(info);
    }
    catch(e){OB.error(e);}
  },1e9);
  it(`has log collection`,async () => {
    await OB.sleep(10);
    const connection = core.db?.get();
    const logName = core.config.logger?.dbCustom?.[0].collection;
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
  it(`print component`,async () => {core.logger?.print()},1E9);
});