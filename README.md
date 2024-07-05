# gitemo-cli

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/sysagar/gitemo-cli/build_and_publish.yaml)
![NPM Version](https://img.shields.io/npm/v/gitemo-cli)


> A interactive client cli tool for using git emojis on commit messages.

## About

[Gitemo](https://github.com/SySagar/gitemo) provides an easy solution for developing production level commit messages. Whats more? Includes a bunch of options you can play with! :tada:

## Install

### npm

```bash
npm i -g gitemo-cli
```

## Usage

```bash
gitemo --help
```

```
    Usage
      $ gitemo [option] [command]
    Options
     --commit, -c        Interactively commit using the prompts
     --aiCommit, --aic   Use ai for generating commits
     --config, --g       To change configuration
     --list, -l          List all the available git emojis
     --version, -v       Print gitemo-cli installed version
    Commands
      commit             Interactively commit using the prompts
      list               List all the available gitmojis
      version            Print gitemo-cli installed version
      config             Change configuration
    Examples
      $ gitemo -c
```

### Commit

You can use the commit functionality to develop your commits message based on prompts given to it. The final message will be mapped to emoji accordingly.

Start the interactive commit client, to auto generate your commit based on your prompts.

```bash
gitemo --c
```

##### Options

You can pass default values to the prompts using the following flags:

- `title`: For setting the commit title.
- `message`: For setting the commit message.

Those flags should be used like this:

```bash
gitemo -c --title="Commit" --message="Message" --scope="Scope"
```

### List

Pretty print all the available git emojis.

```bash
gitemo --l
```

### Version

List down the current version of the cli

```bash
gitemo --v
```
### Config

You can use the default configs or customize your own configurations.

Some of the default settings are:

```bash
gitemo --g
```