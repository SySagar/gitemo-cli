import COMMIT_MODES from '../constants/commitMode.js';

const getDefaultCommitContent = (options) => {
  return {
    title: options['title'] || null,
    message: options['message'] || null,
  };
};

export default getDefaultCommitContent;
