const assert = require('assert');
const app = require('../../src/app');

describe('\'purchaseorderItems\' service', () => {
  it('registered the service', () => {
    const service = app.service('purchaseorderItems');

    assert.ok(service, 'Registered the service (purchaseorderItems)');
  });
});
