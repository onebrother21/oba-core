"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.coreConfig = void 0;
const config_1 = __importDefault(require("config"));
const deepmerge_1 = __importDefault(require("deepmerge"));
const setDefaultConfigWithEnvironment = (envPrefix) => {
    const prefix = envPrefix.toLocaleUpperCase();
    const env = process.env.NODE_ENV.toLocaleUpperCase();
    const name = process.env[`${prefix}_NAME`];
    const mode = process.env[`${prefix}_MODE`];
    let uri = `${prefix}_MONGODB`;
    switch (true) {
        case env === "production":
        case (/live-db/.test(env)):
            uri += "_PROD";
            break;
        default:
            uri += "_LOCAL";
            break;
    }
    const dbs = { [name]: process.env[uri] };
    const initial = config_1.default.get("appconfig");
    const atRuntime = {
        vars: { name, env, mode, verbose: false },
        logger: { label: name },
        db: { connections: dbs },
    };
    const coreConfig = deepmerge_1.default(initial, atRuntime);
    return coreConfig;
};
exports.coreConfig = setDefaultConfigWithEnvironment;
//# sourceMappingURL=core-config.js.map