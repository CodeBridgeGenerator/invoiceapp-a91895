const assert = require('assert');
const app = require('../../src/app');

describe('\'purchaseOrder\' service', () => {
  it('registered the service', () => {
    const service = app.service('purchaseOrder');

    assert.ok(service, 'Registered the service (purchaseOrder)');
  });
});
