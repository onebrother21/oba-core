import { Controller } from "@onebro/oba-common";
import mongoose from "mongoose";
import path from "path";
import OBACoreApi,{coreConfig} from "../src";

export const utils = {
  sleep:(n:number) => new Promise(done => setTimeout(done,n)),
  clear:() => process.stdout.write("\x1Bc"),
  desc:describe,
  refreshDb:async () => {
    const db = await mongoose.createConnection("mongodb://localhost:27017/ob1").asPromise();
    await db.dropDatabase();
  },
  init:async (s:string) => {
    try{
      const c = coreConfig(s);
      const dirname = path.join(__dirname,"/../../logs");
      c.logger.file = c.logger.file.map(t => ({...t,dirname}));
      const core:OBACoreApi<null> = new OBACoreApi(c);
      await core.init(1);
      return {core};}
    catch(e){console.error(e);throw e;}
  },
};
export const J = {
  utils,
  type:(a:any,b:string) => expect(typeof a).toBe(b),
  instance:(a:any,b:any) => expect(a instanceof b).toBe(true),
  arr:(a:any) => expect(Array.isArray(a)).toBe(true),
  gt:(a:number,b:number) => expect(a).toBeGreaterThan(b),
  eq:(a:number,b:number,c:number=2) => expect(a).toBeCloseTo(b,c),
  ne:(a:number,b:number,c?:number) => expect(a).not.toBeCloseTo(b,c||2),
  is:(a:any,b?:any) => b!==undefined?expect(a).toBe(b):expect(a).toBeDefined(),
  not:(a:any,b?:any) => b!==undefined?expect(a).not.toBe(b):expect(a).not.toBeDefined(),
  match:(a:string,b:RegExp) => expect(a).toMatch(b),
  has:(a:string,b:string) => expect(a).toContain(b),
  includes:(a:any[],b:any) => expect(a.indexOf(b) > -1).toBe(true),
  prop:(a:any,b:any) => expect(a).toHaveProperty(b),
  true:(o:any) => expect(o).toBeTruthy(),
  throws:(o:Function) => expect(o()).toThrow(),
  doesNotThrow:(o:Function) => expect(o()).not.toThrow(),
  error:(o:any) => expect(o).toBeInstanceOf(Error),
  noterror:(o:any) => expect(o).not.toBeInstanceOf(Error),
};