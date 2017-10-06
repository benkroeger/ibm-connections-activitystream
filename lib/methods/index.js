'use strict';

// node core modules

// 3rd party modules

// internal modules
const feed = require('./feed');
const community = require('./community');
const objectHistory = require('./object-history');
const eventDetails = require('./event-details');

module.exports = Object.assign({}, feed, community, objectHistory, eventDetails);
