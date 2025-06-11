const assert = require('assert');
const app = require('../../src/app');

describe('\'creditNote\' service', () => {
  it('registered the service', () => {
    const service = app.service('creditNote');

    assert.ok(service, 'Registered the service (creditNote)');
  });
});
