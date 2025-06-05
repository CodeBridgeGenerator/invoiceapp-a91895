const assert = require('assert');
const app = require('../../src/app');

describe('\'debitNote\' service', () => {
  it('registered the service', () => {
    const service = app.service('debitNote');

    assert.ok(service, 'Registered the service (debitNote)');
  });
});
