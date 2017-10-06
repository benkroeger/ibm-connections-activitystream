'use strict';

// node core modules

// 3rd party modules

// internal modules

const APPLICATIONS = [
  'activities',
  'blogs',
  'files',
  'forums',
  'wikis',
  'bookmarks',
  '@people', // any events you receive as a result of people you are following and so the generator id you will see can be from the submitting component application and not always 'profiles'
  '@status', // status updates that may be received from either the profiles application or the communities application
  '@tags', // any events you receive as a result of tags you are following and so the generator id you will see will be from the submitting component application and never 'tags'
  '@communities', // any events you receive as a result of communities you are following and so the generator id you will see can be from the submitting component application and not always 'communities'
];

const COMMUNITY_ID_REGEX = /^urn:lsid:lconn\.ibm\.com:communities\.community:/;
const COMMUNITY_ID_PREFIX = 'urn:lsid:lconn.ibm.com:communities.community:';

module.exports = { APPLICATIONS, COMMUNITY_ID_REGEX, COMMUNITY_ID_PREFIX };
