"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OBACoreDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_1 = require("mongodb");
const bluebird_1 = __importDefault(require("bluebird"));
const oba_common_1 = __importStar(require("@onebro/oba-common"));
mongoose_1.default.Promise = bluebird_1.default;
class OBACoreDB extends oba_common_1.Component {
    constructor() {
        super(...arguments);
        this.init = (start) => __awaiter(this, void 0, void 0, function* () {
            if (start) {
                const { name, uri, opts } = this.config;
                const dbStr = `-> ${name.toLocaleUpperCase()}`;
                oba_common_1.default.trace(`Attempting to connect ${dbStr}`);
                try {
                    this.connection = yield mongoose_1.default.createConnection(uri, opts).asPromise();
                    Object.assign(this, this.config);
                    oba_common_1.default.ok(`MongoDB connected ${dbStr}`);
                }
                catch (e) {
                    this.connection = null;
                    oba_common_1.default.warn(`MongoDB connection failed -> ${e.message || e}`);
                }
            }
        });
        this.shutdown = () => __awaiter(this, void 0, void 0, function* () { return yield this.connection.close(); });
        this.startNative = (name, uri, opts) => __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield mongodb_1.MongoClient.connect(uri, opts);
                return connection.db(name);
            }
            catch (e) {
                oba_common_1.default.error(`DB Error: ${e}`);
            }
        });
        this.model = (modelName, schema, collection) => __awaiter(this, void 0, void 0, function* () {
            const db = this.get();
            const model = db.model(modelName, schema, collection);
            yield model.init();
            return model;
        });
    }
    get() { return this.connection; }
}
exports.OBACoreDB = OBACoreDB;
exports.default = OBACoreDB;
//# sourceMappingURL=db-main.js.map