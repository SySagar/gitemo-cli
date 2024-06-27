import { CONFIG } from '@constants/config.js';
import getConfiguration from './getConfiguration.js';

const config = getConfiguration();

const getCapitalizeTitle = () => config.get(CONFIG.CAPITALIZE_TITLE);
const getMessagePrompt = () => config.get(CONFIG.MESSAGE_PROMPT);
const getAutoAdd = () => config.get(CONFIG.AUTO_ADD);

const setAutoAdd = (autoAdd) => {
  config.set(CONFIG.AUTO_ADD, autoAdd);
};
const setCapitalizeTitle = (capitalizeTitle) => {
  config.set(CONFIG.CAPITALIZE_TITLE, capitalizeTitle);
};

const setMessagePrompt = (messagePrompt) => {
  config.set(CONFIG.MESSAGE_PROMPT, messagePrompt);
};

export default {
  getCapitalizeTitle,
  getMessagePrompt,
  getAutoAdd,
  setAutoAdd,
  setCapitalizeTitle,
  setMessagePrompt,
};
