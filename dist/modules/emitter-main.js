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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OBACoreEmitter = void 0;
const oba_common_1 = __importDefault(require("@onebro/oba-common"));
const events_1 = require("events");
class OBACoreEmitter {
    get history() { return this._history; }
    get values() { return this._values; }
    get listeners() { return this._emitter.eventNames(); }
    print(s) { oba_common_1.default.info(s ? ({ [s]: this[s] }) : this); }
    get(name) { return name ? this._values[name] : this.values; }
    constructor(o) {
        this._history = [];
        this._values = {};
        this._emitter = new events_1.EventEmitter();
        this.on = (s, l) => this._emitter.on(s, l);
        this.emit = (s, v) => {
            this._history.unshift({ event: s, time: new Date() });
            this._values[s] = v;
            this._emitter.emit(s, v);
        };
        for (const k in o)
            this.on(k, o[k]);
    }
}
exports.OBACoreEmitter = OBACoreEmitter;
exports.default = OBACoreEmitter;
__exportStar(require("./emitter-types"), exports);
//# sourceMappingURL=emitter-main.js.map