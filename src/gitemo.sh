#!/bin/bash
# gitemo.sh

# Run the CLI with additional Node.js options
node --loader esm-module-alias/loader --no-warnings src/cli.js "$@"
