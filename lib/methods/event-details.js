'use strict';

// node core modules

// 3rd party modules

// internal modules

/**
 * Retrieves details for a specific event in activitystream
 * [Details](https://www-10.lotus.com/ldd/lcwiki.nsf/xpAPIViewer.xsp?lookupName=IBM+Connections+5.5+API+Documentation#action=openDocument&res_title=General_IBM_Connections_feed_retrieval_ic55&content=apicontent)
 * @method eventDetails
 * @param  {Object}         query
 * @param  {String}         query.eventId               id of the event that details should be loaded for
 * @param  {Object}         [options = {}]              Any options you want to pass to `httpClient.makeRequest()`
 *                                                      https://github.com/request/request#requestoptions-callback
 * @param  {feedCallback}   callback
 * @return {Promise}                                    If no callback is provided, this method returns a Promise
 */
function eventDetails(query = {}, options = {}, callback) {
  if (!query.eventId) {
    const error = new Error('`eventId` must be provided when requesting single event details');
    error.statusCode = 400;
    callback(error);
    return Promise.reject(error);
  }

  const augmentedQuery = Object.assign({}, query, {
    user: '@me',
    group: '@all',
    application: `@all/${query.eventId}`, // the docs are wrong on the event details url. the second `@all` is actually required
    eventId: undefined,
  });

  return this.feed(augmentedQuery, options, callback);
}

module.exports = { eventDetails };
