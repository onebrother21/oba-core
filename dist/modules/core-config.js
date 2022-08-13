"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.coreConfig = void 0;
const config_1 = __importDefault(require("config"));
const oba_common_1 = __importDefault(require("@onebro/oba-common"));
const setDefaultConfigWithEnvironment = () => {
    const initial = config_1.default.get("appconfig");
    const env = oba_common_1.default.env().toLocaleUpperCase();
    const name = oba_common_1.default.appvar("_NAME");
    const version = oba_common_1.default.version();
    const vars = { name, env, version };
    let dbVar = "_" + oba_common_1.default.appvar("_DB");
    if (!oba_common_1.default.appvar(dbVar))
        switch (true) {
            case oba_common_1.default.isEnv("prod"):
                dbVar += "_PROD";
                break;
            case oba_common_1.default.isEnv("local-db"):
                dbVar += "_LOCAL";
                break;
            default:
                dbVar += "_DEV";
                break;
        }
    const uri = oba_common_1.default.appvar(dbVar);
    const db = { uri, name, opts: {} };
    const logger = { label: name };
    const atRuntime = { vars, logger, db };
    const coreConfig = oba_common_1.default.mergeObj(initial, atRuntime, false);
    return coreConfig;
};
exports.coreConfig = setDefaultConfigWithEnvironment;
//# sourceMappingURL=core-config.js.map