"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.masterConfig = void 0;
const config_1 = __importDefault(require("config"));
const deepmerge_1 = __importDefault(require("deepmerge"));
const setDefaultConfigWithEnvironment = (envPrefix) => {
    const prod = process.env.NODE_ENV === "production";
    const dbUri = process.env[`${envPrefix}_MONGODB${!prod ? "_LOCAL" : "_PROD"}`];
    const initial = config_1.default.get("appconfig");
    const atRuntime = {
        vars: {
            name: process.env[`${envPrefix}_NAME`],
            host: process.env[`${envPrefix}_HOST`],
            port: Number(process.env[`${envPrefix}_PORT`]),
            env: process.env.NODE_ENV,
            verbose: false
        },
        logger: { label: process.env[`${envPrefix}_NAME`] },
        db: { connections: { [envPrefix]: dbUri } },
    };
    const masterConfig = deepmerge_1.default(initial, atRuntime);
    return masterConfig;
};
exports.masterConfig = setDefaultConfigWithEnvironment;
//# sourceMappingURL=core-config.js.map