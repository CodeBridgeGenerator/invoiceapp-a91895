const assert = require('assert');
const app = require('../../src/app');

describe('\'paymentTerms\' service', () => {
  it('registered the service', () => {
    const service = app.service('paymentTerms');

    assert.ok(service, 'Registered the service (paymentTerms)');
  });
});
