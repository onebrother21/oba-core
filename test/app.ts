import OB,{ AnyBoolean } from "@onebro/oba-common";
import mongoose from "mongoose";
import path from "path";
import OBACoreApi,{coreConfig} from "../src";

export const App = {
  refresh:async () => {
    const c = coreConfig("OBA_CORE");
    if(OB.match(/mongodb\+srv/,c.db.uri)) return;
    const db = await mongoose.createConnection(c.db.uri).asPromise();
    await db.dropDatabase();
  },
  init:async (startDb?:AnyBoolean) => {
    try{
      const c = coreConfig("OBA_CORE");
      const dirname = path.join(__dirname,"/../../logs");
      const db = c.db.uri;
      c.logger.db = c.logger.db.map(t => ({...t,db}));
      c.logger.file = c.logger.file.map(t => ({...t,dirname}));
      const core:OBACoreApi = new OBACoreApi(c);
      await core.init(startDb);
      return {core};
    }
    catch(e){OB.error(e);throw e;}
  },
};