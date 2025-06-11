const assert = require('assert');
const app = require('../../src/app');

describe('\'quotations\' service', () => {
  it('registered the service', () => {
    const service = app.service('quotations');

    assert.ok(service, 'Registered the service (quotations)');
  });
});
