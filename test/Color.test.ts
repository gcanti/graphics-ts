import * as assert from 'assert'

import * as C from '../src/Color'

describe('Color', () => {
  describe('hsla', () => {
    it('should create a Color from hsla values', () => {
      const color = C.hsla(50, 0.5, 0.5, 0.1)

      assert.deepStrictEqual(color, { h: 50, s: 0.5, l: 0.5, a: 0.1 })
    })
  })

  describe('hsl', () => {
    it('should create a Color from hsl values', () => {
      const color = C.hsl(50, 0.5, 0.5)

      assert.deepStrictEqual(color, { h: 50, s: 0.5, l: 0.5, a: 1 })
    })
  })

  describe('toCss', () => {
    it('should convert a Color object to a CSS value', () => {
      const hslC = C.hsl(150, 0.5, 0.5)

      assert.deepStrictEqual(C.toCss(hslC), 'hsl(150, 50%, 50%)')

      const hslaC = C.hsla(150, 0.5, 0.5, 0.5)

      assert.deepStrictEqual(C.toCss(hslaC), 'hsla(150, 50%, 50%, 0.5)')
    })
  })
})
