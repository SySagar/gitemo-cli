import { CONFIG } from '@constants/config.js';
import getConfiguration from './getConfiguration.js';

const config = getConfiguration();

const getCapitalizeTitle = () => config.get(CONFIG.CAPITALIZE_TITLE);
const getMessagePrompt = () => config.get(CONFIG.MESSAGE_PROMPT);
const getAutoAdd = () => config.get(CONFIG.AUTO_ADD);
const getRateLimitCount = () => config.get(CONFIG.RATE_LIMIT_COUNT);
const getMaxRateLimitCount = () => config.get(CONFIG.MAX_RATE_LIMIT_COUNT);
const getRateLimitTimestamp = () => config.get(CONFIG.RATE_LIMIT_TIMESTAMP);
const getUserKey = () => config.get(CONFIG.USER_KEY);
const getAIKey = () => config.get(CONFIG.AI_KEY);

const setAutoAdd = (autoAdd) => {
  return config.set(CONFIG.AUTO_ADD, autoAdd);
};
const setCapitalizeTitle = (capitalizeTitle) => {
  return config.set(CONFIG.CAPITALIZE_TITLE, capitalizeTitle);
};

const setMessagePrompt = (messagePrompt) => {
  return config.set(CONFIG.MESSAGE_PROMPT, messagePrompt);
};

const setRateLimitCount = (rateLimitCount) => {
  return config.set(CONFIG.RATE_LIMIT_COUNT, rateLimitCount);
};

const setMaxRateLimitCount = (maxRateLimitCount) => {
  return config.set(CONFIG.MAX_RATE_LIMIT_COUNT, maxRateLimitCount);
};

const setRateLimitTimestamp = (rateLimitTimestamp) => {
  return config.set(CONFIG.RATE_LIMIT_TIMESTAMP, rateLimitTimestamp);
};

const setUserKey = (userKey) => {
  return config.set(CONFIG.USER_KEY, userKey);
};

const setAIKey = (AIKey) => {
  return config.set(CONFIG.AI_KEY, AIKey);
};

export default {
  getCapitalizeTitle,
  getMessagePrompt,
  getAutoAdd,
  getRateLimitCount,
  getMaxRateLimitCount,
  getRateLimitTimestamp,
  getUserKey,
  getAIKey,
  setAutoAdd,
  setCapitalizeTitle,
  setMessagePrompt,
  setRateLimitCount,
  setMaxRateLimitCount,
  setRateLimitTimestamp,
  setUserKey,
  setAIKey,
};
