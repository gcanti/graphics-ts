import * as assert from 'assert'

/**
 * Asserts that the specified `fn` was called with the parameters specified in `params`.
 */
export const assertCalledWith = (fn: jest.Mock, ...params: ReadonlyArray<any>): void => {
  const { calls } = fn.mock

  assert.deepStrictEqual(calls.length, 1)

  calls[0].forEach((p: any, i: any) => {
    assert.deepStrictEqual(p, params[i])
  })
}
