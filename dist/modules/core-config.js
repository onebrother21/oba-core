"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.coreConfig = void 0;
const oba_common_1 = __importDefault(require("@onebro/oba-common"));
const oba_core_base_api_1 = require("@onebro/oba-core-base-api");
const setDefaultConfigWithEnvironment = (prefix) => {
    const base = (0, oba_core_base_api_1.coreBaseConfig)(prefix);
    const { name, env } = base.vars;
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
    const db = { connections: Object.assign({}, uri ? { [name]: uri } : {}) };
    const logger = { label: name };
    const atRuntime = { logger, db };
    const coreConfig = oba_common_1.default.mergeObj(base, atRuntime);
    return coreConfig;
};
exports.coreConfig = setDefaultConfigWithEnvironment;
//# sourceMappingURL=core-config.js.map