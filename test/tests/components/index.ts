import {J} from "../../utils";
import {obaCoreDBInitTests} from "./db";
import {obaCoreLoggerFileInitTests} from "./logger-file";
import {obaCoreLoggerDbInitTests} from "./logger-db";

export const allCoreComponents = () => J.desc("CORE COMPONENTS TESTS",() => {
  obaCoreDBInitTests();
  obaCoreLoggerFileInitTests();
  obaCoreLoggerDbInitTests();
});