"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OBACoreLoggerDbCustomWrapper = void 0;
const mongoose_1 = require("mongoose");
const logMsg = new mongoose_1.Schema({ level: { type: String }, label: { type: String }, meta: { type: Object } }, {
    timestamps: { createdAt: "timestamp", updatedAt: false },
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});
logMsg.virtual("other").get(function () { return this.name + "OtherShit"; });
class OBACoreLoggerDbCustomWrapper {
    constructor(label, config) {
        this.label = label;
        this.config = config;
        this.models = {};
        this.init = (db) => __awaiter(this, void 0, void 0, function* () {
            if (db && db.connection) {
                for (let i = 0, l = this.config.length; i < l; i++) {
                    const opts = this.config[i];
                    const level = opts.level;
                    const nameCap = opts.name.toUpperCase();
                    const name = opts.name.toLowerCase();
                    this.models[level] = yield db.model(nameCap, logMsg, name);
                    this[level] = this.create.bind(this, level);
                }
            }
        });
        this.create = (level, meta) => __awaiter(this, void 0, void 0, function* () {
            const m = this.get(level);
            const n = new m({ meta, label: this.label, level: level.toLocaleUpperCase() });
            yield n.save();
            return n.toJSON();
        });
        this.query = (level, q) => __awaiter(this, void 0, void 0, function* () { return yield this.models[level].find(q).limit(50).sort("-created"); }); //{name:/J/});
    }
    get(level) { return this.models[level]; }
}
exports.OBACoreLoggerDbCustomWrapper = OBACoreLoggerDbCustomWrapper;
exports.default = OBACoreLoggerDbCustomWrapper;
//fetch = async (id:string) => await this.model.findById(id);
//fetcByName = async (name:string) => await this.model.findOne({name});
//update = async (id:string,updates:any) => await this.model.findByIdAndUpdate(id,updates);//{name:"Jimmy",value:8},{new:true});
//remove = async (id:string) => await this.model.findByIdAndRemove(id);
//createMany = async ([{name:"Johnny"},{name:"Jimmy"}]:any[]) => await this.model.create(newOnes);
//updateMany = async () => await this.model.updateMany({name:/J/},{value:5});
//removeMany = async () => await this.model.deleteMany({name:/J/});
//# sourceMappingURL=logger-db-custom.js.map