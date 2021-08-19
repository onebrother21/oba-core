"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OBACoreEmitter = void 0;
const ob = __importStar(require("@onebro/oba-common"));
const events_1 = require("events");
class OBACoreEmitter {
    get history() { return this._history; }
    get values() { return this._values; }
    get listeners() { return this._emitter.eventNames(); }
    print(s) { ob.info(s ? ({ [s]: this[s] }) : this); }
    get(name) { return name ? this._values[name] : this.values; }
    constructor(config) {
        this._history = [];
        this._values = { shutdown: false };
        this._emitter = new events_1.EventEmitter();
        this.on = (s, l) => this._emitter.on(s, l);
        this.emit = (s, v) => {
            this._history.unshift({ event: { [s]: v }, time: new Date() });
            this._values[s] = v;
            this._emitter.emit(s, v);
        };
        process.on("SIGUSR2", () => ob.warn("SIGUSR2") && this.emit("shutdown", true));
        process.on("SIGINT", () => ob.warn("SIGINT") && this.emit("shutdown", true));
        process.on("SIGTERM", () => ob.warn("SIGTERM") && this.emit("shutdown", true));
        process.on("exit", () => ob.warn("exit") && this.emit("shutdown", false));
    }
}
exports.OBACoreEmitter = OBACoreEmitter;
exports.default = OBACoreEmitter;
__exportStar(require("./emitter-types"), exports);
//# sourceMappingURL=emitter-main.js.map