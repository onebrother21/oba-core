"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
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
const oba_common_1 = __importDefault(require("@onebro/oba-common"));
mongoose_1.default.Promise = bluebird_1.default;
class OBACoreDB {
    constructor(config) {
        this.config = config;
        this.connections = {};
    }
    model(dbName, modelName, schema, collection) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = this.get(dbName).client;
            const model = db.model(modelName, schema, collection);
            yield model.init();
            return model;
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            const { connections, opts } = this.config;
            const start = (name, uri, opts) => __awaiter(this, void 0, void 0, function* () {
                oba_common_1.default.trace(`Attempting to connect @ ${uri}`);
                try {
                    const newConnection = yield mongoose_1.default.createConnection(uri, opts).asPromise();
                    const connection = { uri, client: newConnection };
                    this.connections[name] = connection;
                    oba_common_1.default.ok(`MongoDB connected -> ${name.toLocaleUpperCase()}`);
                }
                catch (e) {
                    oba_common_1.default.warn(`MongoDB connection failed -> ${e.message || e}`);
                    this.connections[name] = null;
                }
            });
            for (const k in connections)
                yield start(k, connections[k], opts);
        });
    }
    shutdown() {
        return __awaiter(this, void 0, void 0, function* () { for (const k in this.connections) {
            yield this.connections[k].client.close();
        } });
    }
    startNative(name, uri, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield mongodb_1.MongoClient.connect(uri, opts);
                return connection.db(name);
            }
            catch (e) {
                oba_common_1.default.error(`DB Error: ${e}`);
            }
        });
    }
    print() { ob.info(this); }
    get(db) { return this.connections[db]; }
}
exports.OBACoreDB = OBACoreDB;
exports.default = OBACoreDB;
__exportStar(require("./db-types"), exports);
//# sourceMappingURL=db-main.js.map