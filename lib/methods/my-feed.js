'use strict';

// node core modules

// 3rd party modules
const _ = require('lodash');

// internal modules
const { omitDefaultRequestParams } = require('../utils');

const validQueryParams = ['rollup', 'count', 'updatedBefore', 'broadcast'];

/**
  * This callback is displayed as a global member.
  * @callback myFeedCallback
  * @param {Object} Error any error that might have occurred making the reuqest
  * @param {Object} data  the activitystream feed data
  */

/**
 * Retrieves feeds from the authenticated user's activitystream in IBM Connections
 * [Details](https://www-10.lotus.com/ldd/lcwiki.nsf/xpAPIViewer.xsp?lookupName=IBM+Connections+5.5+API+Documentation#action=openDocument&res_title=General_IBM_Connections_feed_retrieval_ic55&content=apicontent)
 * @method myFeed
 * @param  {Object}           [query = {}]
 * @param  {String}           [query.user = @me]
 * @param  {String}           [query.group = @all]
 * @param  {String}           [query.application = @all]
 * @param  {Object}           [options = {}]              Any options you want to pass to `httpClient.makeRequest()`
 *                                                        https://github.com/request/request#requestoptions-callback
 * @param  {myFeedCallback}   callback                    [description]
 * @return {Promise}                                      If no callback is provided, this method returns a Promise
 */
function myFeed(query = {}, options = {}, callback) {
  const { httpClient, params } = this;
  const { user = '@me', group = '@all', application = '@all' } = query;
  // construct the request options
  const requestOptions = _.merge(
    {
      authType: 'none',
    },
    omitDefaultRequestParams(options, validQueryParams),
    {
      json: true,
      qs: _.pick(query, validQueryParams),
      headers: {
        accept: 'application/json',
      },
      ttl: params.ttl.feed,
      uri: `{ authType }/rest/activitystreams/${user}/${group}/${application}`,
    }
  );

  httpClient.makeRequest(requestOptions, (requestError, response, body) => {
    if (requestError) {
      callback(requestError);
      return;
    }

    if (!response) {
      const error = new Error('response object is missing');
      error.httpStatus = 500;
      callback(error);
      return;
    }

    if (!response.headers) {
      const error = new Error('response.headers object is missing');
      error.httpStatus = 500;
      callback(error);
      return;
    }

    const { statusCode, headers: { 'content-type': contentType } } = response;
    // expexted
    // status codes: 200, 403, 404
    // content-type: application/json
    if (statusCode !== 200) {
      const error = new Error(body || 'received response with unexpected status code');
      error.httpStatus = statusCode;
      callback(error);
      return;
    }

    if (!contentType.startsWith('application/json')) {
      const error = new Error(`received response with unexpected content-type ${contentType}`);
      error.httpStatus = 401; // IBM Connections typically responds with httpStatus 200 and the login page if a user is not authenticated
      callback(error);
      return;
    }

    callback(null, body);
  });
}

module.exports = myFeed;
