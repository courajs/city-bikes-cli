'use strict'
const request = require('request');
const chalk = require('chalk');
const Configstore = require('configstore');
const pkg = require('../package.json');

const conf = new Configstore(pkg.name);


const getListOfStations = (jsonData) => {
  jsonData.forEach( station => {
    console.log(`
  Station id: ${ station.id }
  Station name: ${ (station.name).slice(9) }
  ------------------------------------------
    `);
  });
};

const stationBikesAndDocks = (jsonData, stationIdOrAlias) => {
  let result = jsonData.find( station => station.id == stationIdOrAlias);

  if ( !result ) {
    throw new Error('invalid input');
  }

  console.log(`
    Station: ${ chalk.bold.white( (result.name).slice(9) ) }
        - n. of availble bikes ${ result.free_bikes > 2 ? chalk.bold.green(result.free_bikes) : chalk.bold.red(result.free_bikes) }
        - n. of availble docks ${ result.empty_slots > 2 ? chalk.bold.green(result.empty_slots) : chalk.bold.red(result.empty_slots) }
  `);
};

module.exports = (uri, stationIdOrAlias) => {

  request(uri, (error, response, body) => {

    if (!error && response.statusCode == 200) {
      let data = JSON.parse(body);
      data = data.network.stations;

      if (stationIdOrAlias.length < 1) {
        getListOfStations(data);
      } else {
        stationBikesAndDocks(data, stationIdOrAlias);
      }
    }
  });
};
