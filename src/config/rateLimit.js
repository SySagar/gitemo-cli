// rateLimiter.js
import configurationVault from '@utils/configurationVault/index.js';

const LIMIT = 4;
const TIME_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

export const isRateLimited = () => {
  const currentTime = Date.now().toString();
  const count = configurationVault.getRateLimitCount();
  const timestamp = configurationVault.getRateLimitTimestamp();

  const timeDiff = (currentTime - timestamp) / TIME_WINDOW;
  if (timeDiff >= 1) {
    // Reset the count if the time window has passed
    configurationVault.setRateLimitCount(1);
    configurationVault.setRateLimitTimestamp(Date.now().toString());
    return false;
  }

  if (count > LIMIT) {
    return true;
  }

  return false;
};

export const incrementCount = () => {
  const count = configurationVault.getRateLimitCount();
  configurationVault.setRateLimitCount(count + 1);
};
