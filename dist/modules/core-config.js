"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.coreConfig = void 0;
const config_1 = __importDefault(require("config"));
const oba_common_1 = __importDefault(require("@onebro/oba-common"));
const setDefaultConfigWithEnvironment = (prefix) => {
    const env = oba_common_1.default.env().toLocaleUpperCase();
    const name = oba_common_1.default.getvar(prefix, "_NAME");
    const mode = oba_common_1.default.mode();
    const verbose = oba_common_1.default.verbose();
    const version = oba_common_1.default.version();
    const vars = { name, env, mode, version, verbose };
    const initial = config_1.default.get("appconfig");
    let dbVar = "_MONGODB";
    if (!oba_common_1.default.getvar(prefix, dbVar))
        switch (true) {
            case oba_common_1.default.isEnv("prod"):
                dbVar += "_PROD";
                break;
            case oba_common_1.default.isEnv("live"):
                dbVar += "_LIVE";
                break;
            default:
                dbVar += "_LOCAL";
                break;
        }
    const uri = oba_common_1.default.getvar(prefix, dbVar);
    const db = { uri, name };
    const logger = { label: name };
    const atRuntime = { vars, logger, db };
    const coreConfig = oba_common_1.default.mergeObj(initial, atRuntime, false);
    return coreConfig;
};
exports.coreConfig = setDefaultConfigWithEnvironment;
//# sourceMappingURL=core-config.js.map