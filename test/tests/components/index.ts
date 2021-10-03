import {J} from "../../utils";
import {obaCoreDBInitTests} from "./db";
import {obaCoreEmitterInitTests} from "./emitter";
import {obaCoreErrorFactoryInitTests} from "./error-factory";
import {obaCoreLoggerInitTests} from "./logger";
import {obaCoreVarsInitTests} from "./vars";

export const allCoreComponents = () => J.utils.desc("CORE COMPONENTS TESTS",() => {
  obaCoreVarsInitTests();
  obaCoreEmitterInitTests();
  obaCoreErrorFactoryInitTests();
  obaCoreLoggerInitTests();
  obaCoreDBInitTests();
});