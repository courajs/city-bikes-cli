#!/usr/bin/env node
'use strict';

const Configstore = require('configstore');
const meow = require('meow');
const pkg = require('./package.json');
const cityIsValid = require('./lib/city-is-valid');
const getStationData = require('./lib/get-station-data');

const conf = new Configstore(pkg.name);

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

let serviceId = conf.get('city');

let commands = {
  'set-city': function(args) {
    serviceId = args[0];
    cityIsValid(serviceId)
      .then(function(isValid) {
        if (isValid) {
          conf.set('city', serviceId);
          console.log(`Your city has been set to ${serviceId}!`);
        } else {
          console.log(`Sorry that doesn't seem to be a valid serviceId.`)
        }
      })
      .catch(function(err) {
        console.log(`Sorry, there was some error.`)
      });
  },
  'station': function(stationIdOrAlias) {
    stationIdOrAlias = stationIdOrAlias || '';
    if (!serviceId) {
      throw new Error('You have not set your serviceId yet');
    } else {
      let uri = `http://api.citybik.es/v2/networks/${serviceId}`;
      return getStationData(uri, stationIdOrAlias);
    }
  },
  'set': function (args) {
    if (args.length < 2) {
      throw new Error('You need at least 2 parameters to set default values.')
    }
    conf.set(args[0], args[1]);
  },
  'get': function(args) {
    let savedParam = args[0];
    if ( !conf.get(savedParam) ) {
      console.log(`
  You have not saved this parameter yet.
  use command: $ bikes set <param> <value>
  `);

    } else {
      savedParam = conf.get(savedParam);
      commands.station(savedParam);
    }
  }
};

if (cli.input[0] in commands) {
  commands[cli.input.shift()](cli.input);
} else {
  commands.station(cli.input[0]);
}
