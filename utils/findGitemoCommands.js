import FLAGS from "../constants/flag.js";
const isSupportedCommand = (command, options) => {
  return Object.keys(options).includes(command);
};
const determineCommand = (flags, input, options) => {
  //finds if the command exists in the flags
  const command = Object.keys(flags).map(flag => flags[flag] && flag).find(flag => options[flag]);
  return command ? {
    //legit flag/command with --{}
    type: 'flag',
    command
  } : {
    //flag specified directly without --
    type: 'command',
    command: input[0]
  };
};
const getOptionsForCommand = (command, flags, input, type) => {
  switch (command) {
    case FLAGS.COMMIT:
      return {
        message: flags['message'],
        title: flags['title']
      };
  }
  return null;
};
const findGitemoCommand = (cli, options) => {
  const {
    command,
    type
  } = determineCommand(cli.flags, cli.input, options);
  if (!command || !isSupportedCommand(command, options)) {
    return cli.showHelp();
  }
  const commandOptions = getOptionsForCommand(command, cli.flags, cli.input, type);
  return options[command] ? options[command](commandOptions) : cli.showHelp();
};
export default findGitemoCommand;