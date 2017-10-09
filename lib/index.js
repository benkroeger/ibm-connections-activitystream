'use strict';

// node core modules

// 3rd party modules
const _ = require('lodash');
const OniyiHttpClient = require('oniyi-http-client');
const credentialsPlugins = require('oniyi-http-plugin-credentials');
const formatUrlTemplatePlugin = require('oniyi-http-plugin-format-url-template');

// internal modules
const methods = require('./methods');

/**
 * Factory function to create instance of {@link ActivityStreamService}
 * @function serviceFactory
 * @param  {String} baseUrl         the base url to reach an IBM Connections OpenSocial application
*                                   e.g. `https://apps.na.collabserv.com/connections/opensocial/`
 * @param  {Object} [params={}]     Options used to configure plugins and create the oniyi-http-client
 * @return {ActivityStreamService}  an activitystream instance
 */
const factory = (baseUrl, params = {}) => {
  _.merge(params, {
    defaults: {
      authType: '',
      baseUrl: (baseUrl.endsWith('/') && baseUrl) || `${baseUrl}/`,
    },
    ttl: {},
  });

  const httpClient = new OniyiHttpClient(params);

  const { plugins = {} } = params;
  if (plugins.credentials) {
    httpClient.use(credentialsPlugins(plugins.credentials));
  }

  const formatUrlTemplateOptions = _.merge(
    {
      valuesMap: {
        authType: {
          '': '',
          none: '',
          saml: '',
          cookie: '',
        },
      },
    },
    plugins.formatUrlTemplate || {}
  );

  httpClient.use(formatUrlTemplatePlugin(formatUrlTemplateOptions));

  /**
   * @typedef {Object} ActivityStreamService
   * @param {Object} params - the params argument provided to {@link serviceFactory}
   */
  const service = {};

  // the following defineProperty() options are used with their default value `false`
  // configurable: false, enumerable: false, writable: false
  // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
  Object.defineProperty(service, 'params', { value: params });
  Object.defineProperty(service, 'httpClient', { value: httpClient });

  Object.assign(service, methods);

  return service;
};

module.exports = factory;
