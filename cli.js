#!/usr/bin/env node
'use strict';

const meow = require('meow');
const commands = require('./lib/commands')

const pkg = require('./package.json');

let cli = meow(`
  Usage: bikes                          # Display available bikes/slots for your default station
     or: bikes set-city <service-id>    # Set your default city
     or: bikes <station-id>             # Display available bikes/slots for station by id
     or: bikes get <station-alias>      # Display available bikes/slots for station by custom name
     or: bikes set <station-alias> <station-id> # Set station-alias linked to a specific station-id
  -----------------------------------
    <station-alias> can be work, home, mom, coffee or whatever string

`, {
  alias: {
    'v': 'version',
    'h': 'help'
  }
});


if (cli.input[0] in commands) {
  commands[cli.input.shift()](cli.input);
} else {
  commands.station(cli.input[0]);
}
