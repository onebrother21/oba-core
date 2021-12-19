import {J} from "../../utils";
import {obaCoreErrorFactoryInitTests} from "./error-factory";
import {obaCoreDBInitTests} from "./db";
import {obaCoreLoggerFileInitTests} from "./logger-file";
import {obaCoreLoggerDbInitTests} from "./logger-db";
import {obaCoreLoggerDbCustomInitTests} from "./logger-db-custom";

export const allCoreComponents = () => J.desc("CORE COMPONENTS TESTS",() => {
  obaCoreErrorFactoryInitTests();
  obaCoreDBInitTests();
  obaCoreLoggerFileInitTests();
  obaCoreLoggerDbInitTests();
  obaCoreLoggerDbCustomInitTests();
});