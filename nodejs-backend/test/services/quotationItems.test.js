const assert = require('assert');
const app = require('../../src/app');

describe('\'quotationItems\' service', () => {
  it('registered the service', () => {
    const service = app.service('quotationItems');

    assert.ok(service, 'Registered the service (quotationItems)');
  });
});
