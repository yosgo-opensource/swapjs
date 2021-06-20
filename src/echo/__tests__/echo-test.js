const { echo } = require('../../../build/echo')
const assert = require('assert')

describe('TEST mocha test', () => {
    it('test echo msg', () => {
    const msg = 'Hello World'
    const echoMsg = echo(msg)
    assert.strictEqual(echoMsg, msg)
  })
})