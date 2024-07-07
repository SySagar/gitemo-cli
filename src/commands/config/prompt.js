import configurationVault from '@utils/configurationVault';
import { CONFIG } from '@constants/config.js';

export default () => [
  {
    name: CONFIG.AUTO_ADD,
    message: 'Enable automatic "git add ."',
    type: 'confirm',
    default: configurationVault.getAutoAdd(),
  },
  {
    name: CONFIG.MESSAGE_PROMPT,
    message: 'Enable message prompt',
    type: 'confirm',
    default: configurationVault.getMessagePrompt(),
  },
  {
    name: CONFIG.CAPITALIZE_TITLE,
    message: 'Capitalize title',
    type: 'confirm',
    default: configurationVault.getCapitalizeTitle(),
  },
  {
    name: CONFIG.AI_KEY,
    message: 'Your AI key',
    type: 'input',
    default: configurationVault.getAIKey(),
  },
  {
    name: CONFIG.MAX_RATE_LIMIT_COUNT,
    message: 'Set Max rate limit for you key',
    type: 'input',
    default: configurationVault.getMaxRateLimitCount(),
    when: (answers) => !!answers[CONFIG.AI_KEY],
  },
];
