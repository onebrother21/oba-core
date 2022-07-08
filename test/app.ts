import OB,{ AnyBoolean } from "@onebro/oba-common";
import mongoose from "mongoose";
import path from "path";
import OBACore,{coreConfig} from "../src";

export const App = {
  refresh:async () => {
    const c = coreConfig();
    if(c.db){
      try {
        OB.log(`dropping MongoDB database`);
        const {uri,opts} = c.db;
        if(OB.match(/mongodb\+srv/,uri)) return;
        const db = mongoose.createConnection(uri,opts);
        await db.dropDatabase();
      }
      catch(e){
        OB.warn(`MongoDB connection failed -> ${e.message||e}`);
      }
    }
  },
  init:async (startDb?:AnyBoolean) => {
    try{
      const c = coreConfig();
      const core:OBACore = new OBACore(c);
      await core.init(startDb);
      return {core};
    }
    catch(e){OB.error(e);throw e;}
  },
};