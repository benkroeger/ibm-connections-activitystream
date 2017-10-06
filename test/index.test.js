// node core modules

// 3rd party modules
import test from 'ava';

// internal modules
import { mock, record, persist } from './fixtures/http-mocking';
import serviceFactory from '../lib';

const { unmocked } = process.env;

const serviceOptions = { defaults: {} };
if (unmocked) {
  Object.assign(serviceOptions.defaults, {
    auth: {
      user: process.env.username,
      pass: process.env.password,
    },
  });
}
const service = serviceFactory('https://lc.gish.de/connections/opensocial/', serviceOptions);

test.before(() => (unmocked ? record() : mock()));
test.after(() => unmocked && persist());

test.cb('loads my activitystream feed with default query params', (t) => {
  const query = {};
  const options = { authType: 'basic' };
  service.feed(query, options, (error, result) => {
    t.ifError(error);

    t.is(result.totalResults, -1);
    t.is(result.filtered, true);
    t.is(result.itemsPerPage, 20);
    t.is(result.sorted, true);
    t.is(Array.isArray(result.list), true);
    t.is(result.list.length, 20);

    t.end();
  });
});

test.cb('loads event details', (t) => {
  const eventId = 'urn:lsid:lconn.ibm.com:files.story:c3ad8c18-2fd7-4fcf-b7e3-83236660a0ab';
  const query = {
    eventId,
  };
  const options = { authType: 'basic' };
  service.eventDetails(query, options, (error, result) => {
    t.ifError(error);

    t.is(Object.keys(result).length, 1);
    t.truthy(result.entry);
    t.is(result.entry.id, eventId);

    t.end();
  });
});

test.cb('loads activitystream for community', (t) => {
  const communityId = 'fce37a1b-43d0-41c9-b5d8-80aa6b86c852';
  const query = { communityId };
  const options = { authType: 'basic' };
  service.community(query, options, (error, result) => {
    t.ifError(error);

    t.is(result.startIndex, 0);
    t.is(result.totalResults, -1);
    t.is(result.filtered, true);
    t.is(result.title, 'IBM Connections - Community stories');
    t.is(result.itemsPerPage, 20);
    t.is(result.sorted, true);
    t.is(Array.isArray(result.list), true);
    t.is(result.list.length, 20);

    result.list.forEach(story => t.true(story.url && story.url.includes(communityId)));
    t.end();
  });
});
