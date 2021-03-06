import {J} from "../../utils";
import {Schema} from "mongoose";
import OB from "@onebro/oba-common";
import {OBACore,OBACoreConfig,coreConfig} from "../../../src";

export const obaCoreDBInitTests = () => J.desc("Core DB",() => {
  let core:OBACore,c:OBACoreConfig,
  model:any,id:any;
  const schema = new Schema({
    name:{type:String,unique:true,required:true,index:true},
    value:Number},{
    toObject:{virtuals:true},
    toJSON:{virtuals:true}
  });
  schema.virtual("other").get(function(){return this.name + "OtherShit"});
  J.desc("MongoDB Connection",() => {
    it("init",async () => {
      const {db,vars} = coreConfig();
      c = {db,vars};
      core = new OBACore(c);
      await core.init(1);
      J.is(core);
      J.true(core.db);
    },1E9);
    it(`has connection`,async () => {
      J.true(core.db?.get());
    },1E9);
    it(`has "model" method`,async () => {
      model = await core.db?.model("OBA_Core_Model",schema,"oba_core_models");
      J.prop(core.db?.get().models,"OBA_Core_Model");
    },1E9);
    it(`print component`,async () => {core.db?.print()},1E9);
  });
  J.desc("Mongoose Model",() => {
    it(`create & save`,async () => {
      const m = new model({name:"Johnny"});
      J.is(m);
      J.is(m.name,"Johnny");
      J.is(m.other,"JohnnyOtherShit");
      await m.save();
      //OB.log(m.toJSON());
      id = m._id;
    },1e9);
    it(`fetch by id`,async () => {
      const m = await model.findById(id);
      J.is(m);
    },1E9);
    it(`fetch by unique field "name"`,async () => {
      const m = await model.findOne({name:"Johnny"});
      J.is(m);
    },1E9);
    it(`update & save`,async () => {
      const m = await model.findByIdAndUpdate(id,{name:"Jimmy",value:8},{new:true});
      J.is(m.name,"Jimmy");
      J.is(m.value,8);
    },1E9);
    it(`remove`,async () => {
      const removed = await model.findByIdAndRemove(id);
      J.is(removed);
      //OB.log(removed);
    },1E9);
    it(`create & save many`,async () => {
      const newOnes = [{name:"Johnny"},{name:"Jimmy"}];
      const m = await model.create(newOnes);
      J.is(m);
      J.gt(m.length,0);
    },1E9);
    it(`query (fetch many)`,async () => {
      const m = await model.find({name:/J/});
      //OB.log(m);
      J.is(m);
      J.gt(m.length,0)
    },1E9);
    it(`update many`,async () => {
      await model.updateMany({name:/J/},{value:5});
      const m = await model.findOne({name:/J/});
      J.is(m);
      J.is(m.value,5)
    },1E9);
    it(`remove many`,async () => {
      const removed = await model.deleteMany({name:/J/});
      //OB.log({removed});
      J.is(removed.deletedCount,2);
    },1E9);
  });
});