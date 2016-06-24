'use strict';
const Configstore = require('configstore');
const pkg = require('../package.json');
const conf = new Configstore(pkg.name);
const cityIsValid = require('./city-is-valid');
const getStationData = require('./get-station-data');
let serviceId = conf.get('city');

let commands;

module.exports = commands = {
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
      throw new Error(`
        You have not set your serviceId yet.

        You can set it with the following command:
        $ bikes set-city <serviceId>
        --------------------------------------
        <serviceId> is the name of your bike sharing system.
        `);
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
    if (args.length > 1) {
      let firstParam = args[0];
      let secondParam = args[1];
      if ( !conf.get(firstParam) || !conf.get(secondParam) ) {
        console.log(`
          You have not saved this parameter yet.
          use command: $ bikes set <param> <value>
          --------------------------------------------
          <param> could be home, work, coffee..
          `);
      } else {
        firstParam = conf.get(firstParam);
        secondParam = conf.get(secondParam);
        commands.station(firstParam);
        commands.station(secondParam);
      }
    } else {
      let savedParam = args[0];
      if ( !conf.get(savedParam) ) {
        console.log(`
          You have not saved this parameter yet.
          use command: $ bikes set <param> <value>
          --------------------------------------------
          <param> could be home, work, coffee..
          `);
      } else {
        savedParam = conf.get(savedParam);
        commands.station(savedParam);
      }
    }
  }
};
