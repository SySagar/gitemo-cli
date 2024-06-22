import { CONFIG } from '../../constants/config';
import getConfiguration from './getConfiguration';

const config = getConfiguration();

const getCapitalizeTitle = () => config.get(CONFIG.CAPITALIZE_TITLE);
const getMessagePrompt = () => config.get(CONFIG.MESSAGE_PROMPT);

export default {
  getCapitalizeTitle,
  getMessagePrompt,
};
