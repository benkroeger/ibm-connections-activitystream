'use strict';

// node core modules

// 3rd party modules

// internal modules
const { COMMUNITY_ID_REGEX, COMMUNITY_ID_PREFIX } = require('../constants');

const communityId = idString => (COMMUNITY_ID_REGEX.test(idString) && idString) || `${COMMUNITY_ID_PREFIX}${idString}`;

/**
 * Retrieves a community specific activitystream
 * [Details](https://www-10.lotus.com/ldd/lcwiki.nsf/xpAPIViewer.xsp?lookupName=IBM+Connections+5.5+API+Documentation#action=openDocument&res_title=Community_specific_feeds_ic55&content=apicontent)
 * @method community
 * @memberof ActivityStreamService
 * @param  {Object}         query
 * @param  {String}         query.communityId           Community UUID of the community feed you wish to view
 * @param  {Object}         [options = {}]              Any options you want to pass to `httpClient.makeRequest()`
 *                                                      https://github.com/request/request#requestoptions-callback
 * @param  {ActivityStreamService~feedCallback}   callback
 * @return {Promise}                                    If no callback is provided, this method returns a Promise
 */
function community(query = {}, options = {}, callback) {
  if (!query.communityId) {
    const error = new Error('`communityId` must be provided when requesting community feed');
    error.statusCode = 400;
    callback(error);
    return Promise.reject(error);
  }

  const user = communityId(query.communityId);
  const augmentedQuery = Object.assign({}, query, { user, group: '@all' });
  return this.feed(augmentedQuery, options, callback);
}

const methods = { community };

module.exports = methods;
