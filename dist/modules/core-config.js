"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.coreConfig = void 0;
const config_1 = __importDefault(require("config"));
const oba_common_1 = __importDefault(require("@onebro/oba-common"));
const setDefaultConfigWithEnvironment = (prefix) => {
    const env = process.env.NODE_ENV.toLocaleUpperCase();
    const name = oba_common_1.default.evar(prefix, "_NAME");
    const mode = oba_common_1.default.evar(prefix, "_MODE");
    const version = oba_common_1.default.version();
    const vars = { name, env, mode, version }; //,envvars:process.env};
    const initial = config_1.default.get("appconfig");
    let dbVar = "_MONGODB";
    switch (true) {
        case env === "production":
            dbVar += "_PROD";
            break;
        case oba_common_1.default.match(/LIVE/, env):
            dbVar += "_LIVE";
            break;
        default:
            dbVar += "_LOCAL";
            break;
    }
    const uri = oba_common_1.default.evar(prefix, dbVar);
    const db = { uri, name };
    const logger = { label: name };
    const atRuntime = { vars, logger, db };
    const coreConfig = oba_common_1.default.mergeObj(initial, atRuntime, false);
    return coreConfig;
};
exports.coreConfig = setDefaultConfigWithEnvironment;
//# sourceMappingURL=core-config.js.map