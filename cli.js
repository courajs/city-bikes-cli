#!/usr/bin/env node
'use strict';

const meow = require('meow');
const getStationData = require('./lib/get-station-data');
const commands = require('./lib/commands')

let cli = meow(`
Usage: bikes                          # Display available bikes/slots for your default station
   or: bikes <station-id>             # Display available bikes/slots for station by id
   or: bikes <station-alias>          # Display available bikes/slots for station by custom name
   or: bikes set-city <service-id>    # Set your default city
   or: bikes set <param> <station-id>
   or: bikes get <param>
-----------------------------------
  <param> can be work, home, mom, coffee or whatever string

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
