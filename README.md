# gitemo-cli

[![Build Status](https://img.shields.io/github/actions/workflow/status/carloscuesta/gitmoji-cli/ci.yml?branch=master&style=flat-square)](https://github.com/carloscuesta/gitmoji-cli/actions?query=workflow%3ACI+branch%3Amaster)
[![Code Climate](https://img.shields.io/codeclimate/maintainability/carloscuesta/gitmoji-cli.svg?style=flat-square)](https://codeclimate.com/github/carloscuesta/gitmoji-cli)
[![Codecov](https://img.shields.io/codecov/c/github/carloscuesta/gitmoji-cli.svg?style=flat-square)](https://github.com/carloscuesta/gitmoji-cli)
[![npm version](https://img.shields.io/npm/v/gitmoji-cli.svg?style=flat-square)](https://www.npmjs.com/package/gitmoji-cli)
[![npm downloads](https://img.shields.io/npm/dt/gitmoji-cli.svg?style=flat-square)](https://www.npmjs.com/package/gitmoji-cli)
[![gitmoji badge](https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square)](https://github.com/carloscuesta/gitmoji)


> A interactive client cli tool for using gitmojis on commit messages.

## About

This project provides an easy solution for developing production level commit messages. Whats more? Includes a bunch of options you can play with! :tada:

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
      --${FLAGS.COMMIT}, -c    Interactively commit using the prompts
      --${FLAGS.LIST}, -l      List all the available git emojis
      --${FLAGS.VERSION}, -v   Print gitemo-cli installed version
    Commands
      commit          Interactively commit using the prompts
      list            List all the available gitmojis
      version         Print gitemo-cli installed version
    Examples
      $ gitemo -c
```

### Commit

You can use the commit functionality to develop your commits message based on prompts given to it. The final message will be mapped to emoji accordingly.

Start the interactive commit client, to auto generate your commit based on your prompts.

```bash
gitemo -c
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
gitmoji -l
```

### Version

List down the current version of the cli

```bash
gitmoji -v
```
