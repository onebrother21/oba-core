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
    const name = oba_common_1.default.envvar(prefix, "_NAME");
    const mode = oba_common_1.default.envvar(prefix, "_MODE");
    let dburi = "_MONGODB";
    switch (true) {
        case env === "production":
        case (/live-db/i.test(env)):
            dburi += "_PROD";
            break;
        default:
            dburi += "_LOCAL";
            break;
    }
    const dbs = { [name]: oba_common_1.default.envvar(prefix, dburi) };
    const initial = config_1.default.get("appconfig");
    const atRuntime = {
        vars: { name, env, mode, verbose: false },
        logger: { label: name },
        db: { connections: dbs },
    };
    const coreConfig = oba_common_1.default.merge(initial, atRuntime);
    return coreConfig;
};
exports.coreConfig = setDefaultConfigWithEnvironment;
//# sourceMappingURL=core-config.js.map