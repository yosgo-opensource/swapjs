const { taxid } = require('../../../build/validate/taxid')
const assert = require('assert')

const success = {
  code0: {
    error: false,
    code: 0,
  },
}
const errors = {
  code1: {
    error: true,
    code: 1,
  },
  code2: {
    error: true,
    code: 2,
  },
}

describe('TEST incorrect and code', () => {
  it('error true and code 1', () => {
    const result = taxid('110299')
    assert.deepStrictEqual(result, errors.code1)
  })
  it('error true and code 2', () => {
    const result = taxid('11111111')
    assert.deepStrictEqual(result, errors.code2)
  })
})

describe('TEST correct code', () => {
  it('success and code 0', () => {
    ;['52601428', '00000000'].map((id) => {
      const result = taxid(id)
      assert.deepStrictEqual(result, success.code0)
    })
  })
})
