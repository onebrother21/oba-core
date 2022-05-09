import OB,{ AnyBoolean } from "@onebro/oba-common";
import mongoose from "mongoose";
import path from "path";
import OBACore,{coreConfig} from "../src";

export const App = {
  refresh:async () => {
    const {db:{uri,opts}} = coreConfig();
    if(OB.match(/mongodb\+srv/,uri)) return;
    const db = mongoose.createConnection(uri,opts);
    await db.dropDatabase();
  },
  init:async (startDb?:AnyBoolean) => {
    try{
      const c = coreConfig();
      const dirname = path.join(__dirname,"/../../logs");
      const db = c.db.uri;
      //c.logger.db = c.logger.db.map(t => ({...t,db}));
      //c.logger.file = c.logger.file.map(t => ({...t,dirname}));
      const core:OBACore = new OBACore(c);
      await core.init(startDb);
      return {core};
    }
    catch(e){OB.error(e);throw e;}
  },
};