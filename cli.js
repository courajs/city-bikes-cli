#!/usr/bin/env node
'use strict';

const Configstore = require('configstore');
const pkg = require('./package.json');

const conf = new Configstore(pkg.name);

let city = conf.get('city');

if ( !city ) {
  console.log('Your city is not configured. What is the id of your bike sharing system?');
  
  city = 'hubway';
  conf.set('city', city);
} else {
  console.log('your city is configured:', city);
}
