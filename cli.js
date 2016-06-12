#!/usr/bin/env node
'use strict';

const Configstore = require('configstore');
const meow = require('meow');
const pkg = require('./package.json');
const cityIsValid = require('./lib/city-is-valid');

const conf = new Configstore(pkg.name);

let cli = meow(`
    Usage: bikes                          # Display available bikes/slots for your default station
       or: bikes <station-id>             # Display available bikes/slots for station by id
       or: bikes <station-alias>          # Display available bikes/slots for station by custom name
       or: bikes set-city <service-id>    # Set your default city
`);

let commands = {
  'set-city': function(args) {
    let serviceId = args[0];
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
    stationIdOrAlias = stationIdOrAlias || 'default';
    console.log("getting info for station", stationIdOrAlias);
  }
};


if (cli.input[0] in commands) {
  commands[cli.input.shift()](cli.input);
} else {
  commands.station(cli.input[0]);
}

// let city = conf.get('city');
// if ( !city ) {
//   console.log('Welcome! Please use `bikes set-city <system-id>` to set your city');
//  } else {
//   console.log('your city is configured:', city);
// }
