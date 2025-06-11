const assert = require('assert');
const app = require('../../src/app');

describe('\'invoiceItems\' service', () => {
  it('registered the service', () => {
    const service = app.service('invoiceItems');

    assert.ok(service, 'Registered the service (invoiceItems)');
  });
});
