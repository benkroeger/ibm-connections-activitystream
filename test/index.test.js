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
  service.myFeed(query, options, (error, result) => {
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
