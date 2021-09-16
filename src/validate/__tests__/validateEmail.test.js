const { email } = require('../../../build/validate/email')
const assert = require('assert')

describe('TEST email validate and unvalidate', () => {
  it('email validate', () => {
    const result = email('swap@yosgo.com')
    assert.strictEqual(result, true)
  })
  it('email unvalidate', () => {
    const result = email('notemail.com')
    assert.strictEqual(result, false)
  })
})
