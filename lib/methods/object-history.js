'use strict';

// node core modules

// 3rd party modules

// internal modules

/**
 * Retrieves history for a specific object in activitystream
 * [Details](https://www-10.lotus.com/ldd/lcwiki.nsf/xpAPIViewer.xsp?lookupName=IBM+Connections+5.5+API+Documentation#action=openDocument&res_title=General_IBM_Connections_feed_retrieval_ic55&content=apicontent)
 * @method objectHistory
 * @param  {Object}         query
 * @param  {String}         query.application           name of the application that `object` originated from
 * @param  {String}         query.appItemId             id of the object that history should be loaded for
 * @param  {Object}         [options = {}]              Any options you want to pass to `httpClient.makeRequest()`
 *                                                      https://github.com/request/request#requestoptions-callback
 * @param  {feedCallback}   callback
 * @return {Promise}                                    If no callback is provided, this method returns a Promise
 */
function objectHistory(query = {}, options = {}, callback) {
  if (!query.appItemId) {
    const error = new Error('`appItemId` must be provided when requesting object history');
    error.statusCode = 400;
    callback(error);
    return Promise.reject(error);
  }

  if (!query.application) {
    const error = new Error('`application` must be provided when requesting object history');
    error.statusCode = 400;
    callback(error);
    return Promise.reject(error);
  }

  const augmentedQuery = Object.assign({}, query, {
    user: '@me',
    group: '@all',
    filterBy: 'object',
    filterOp: 'equals',
    filterValue: query.appItemId,
    appItemId: undefined,
    rollup: false,
  });

  return this.feed(augmentedQuery, options, callback);
}

module.exports = { objectHistory };
