import Conf from 'conf';
import { CONFIG } from "../../constants/config.js";
const DEFAULT_CONFIGURATION = {
  [CONFIG.MESSAGE_PROMPT]: true,
  [CONFIG.CAPITALIZE_TITLE]: true,
  [CONFIG.AUTO_ADD]: false
};
const LOCAL_CONFIGURATION = new Conf({
  projectName: 'gitemo',
  schema: {
    [CONFIG.MESSAGE_PROMPT]: {
      type: 'boolean',
      default: DEFAULT_CONFIGURATION[CONFIG.MESSAGE_PROMPT]
    },
    [CONFIG.CAPITALIZE_TITLE]: {
      type: 'boolean',
      default: DEFAULT_CONFIGURATION[CONFIG.CAPITALIZE_TITLE]
    },
    [CONFIG.AUTO_ADD]: {
      type: 'boolean',
      default: DEFAULT_CONFIGURATION[CONFIG.AUTO_ADD]
    }
  }
});
const getConfiguration = () => {
  return {
    get: key => {
      return LOCAL_CONFIGURATION.get(key) ?? DEFAULT_CONFIGURATION[key]; //fallback to default if null/undefined for local
    },
    set: (key, value) => {
      LOCAL_CONFIGURATION.set(key, value);
    }
  };
};
export default getConfiguration;