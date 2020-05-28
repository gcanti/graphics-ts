import * as assert from 'assert'

import * as Color from '../src/Color'

describe('Color', () => {
  describe('hsla', () => {
    it('should create a Color from hsla values', () => {
      const color = Color.hsla(50, 0.5, 0.5, 0.1)

      assert.deepStrictEqual(color, { _tag: 'Hsla', h: 50, s: 0.5, l: 0.5, a: 0.1 })
    })
  })

  describe('hsl', () => {
    it('should create a Color from hsl values', () => {
      const color = Color.hsl(50, 0.5, 0.5)

      assert.deepStrictEqual(color, { _tag: 'Hsla', h: 50, s: 0.5, l: 0.5, a: 1 })
    })
  })

  describe('hex', () => {
    it('should create a Color from a hex value', () => {
      const color = Color.hex('#0000ff')

      assert.deepStrictEqual(color, { _tag: 'Hex', value: '#0000ff' })
    })
  })

  describe('toCss', () => {
    it('should convert a Hex color to a CSS string', () => {
      const hexColor = Color.hex('#0000ff')

      assert.deepStrictEqual(Color.toCss(hexColor), '#0000ff')
    })

    it('should convert an Hsla color to a CSS string', () => {
      const hslColor = Color.hsl(150, 0.5, 0.5)

      assert.deepStrictEqual(Color.toCss(hslColor), 'hsl(150, 50%, 50%)')

      const hslaColor = Color.hsla(150, 0.5, 0.5, 0.5)

      assert.deepStrictEqual(Color.toCss(hslaColor), 'hsla(150, 50%, 50%, 0.5)')
    })
  })
})
