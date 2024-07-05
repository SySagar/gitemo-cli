import Conf from 'conf';
import { cwd } from 'process';
import { readFileSync } from 'fs';
import { pathExistsSync } from 'path-exists';
import { CONFIG } from '@constants/config.js';

const DEFAULT_CONFIGURATION = {
  [CONFIG.MESSAGE_PROMPT]: true,
  [CONFIG.CAPITALIZE_TITLE]: true,
  [CONFIG.AUTO_ADD]: false,
  [CONFIG.RATE_LIMIT_COUNT]: 0,
  [CONFIG.RATE_LIMIT_TIMESTAMP]: Date.now().toString(),
};

const LOCAL_CONFIGURATION = new Conf({
  projectName: 'gitemo',
  schema: {
    [CONFIG.MESSAGE_PROMPT]: {
      type: 'boolean',
      default: DEFAULT_CONFIGURATION[CONFIG.MESSAGE_PROMPT],
    },
    [CONFIG.CAPITALIZE_TITLE]: {
      type: 'boolean',
      default: DEFAULT_CONFIGURATION[CONFIG.CAPITALIZE_TITLE],
    },
    [CONFIG.AUTO_ADD]: {
      type: 'boolean',
      default: DEFAULT_CONFIGURATION[CONFIG.AUTO_ADD],
    },
    [CONFIG.RATE_LIMIT_COUNT]: {
      type: 'number',
      default: DEFAULT_CONFIGURATION[CONFIG.RATE_LIMIT_COUNT],
    },
    [CONFIG.RATE_LIMIT_TIMESTAMP]: {
      type: 'string',
      default: DEFAULT_CONFIGURATION[CONFIG.RATE_LIMIT_TIMESTAMP],
    },
  },
});

const getFile = (path) => {
  try {
    return JSON.parse(readFileSync(path));
  } catch (error) {
    return;
  }
};

const getConfiguration = () => {
  const loadConfig = () => {
    const packageJson = `${cwd()}/package.json`;
    const configurationFile = `${cwd()}/.gitemorc.json`;

    if (pathExistsSync(packageJson) && getFile(packageJson)?.gitmoji) {
      return getFile(packageJson)?.gitmoji;
    }

    if (pathExistsSync(configurationFile) && getFile(configurationFile)) {
      return getFile(configurationFile);
    }

    return LOCAL_CONFIGURATION.store;
  };

  return {
    get: (key) => {
      const resolvedConfiguration = loadConfig();
      const configuration =
        typeof resolvedConfiguration === 'object' &&
        Object.keys(resolvedConfiguration).length
          ? resolvedConfiguration
          : DEFAULT_CONFIGURATION;

      return configuration[key] ?? DEFAULT_CONFIGURATION[key]; //fallback to default if null/undefined for configuration[key]
    },
    set: (key, value) => {
      LOCAL_CONFIGURATION.set(key, value);
    },
  };
};

export default getConfiguration;
