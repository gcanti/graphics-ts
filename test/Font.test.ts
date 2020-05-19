import * as assert from 'assert'
import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'

import * as F from '../src/Font'

describe('Font', () => {
  describe('fontOptions', () => {
    it('should construct a FontOptions object', () => {
      assert.deepStrictEqual(F.fontOptions({}), {
        style: O.none,
        variant: O.none,
        weight: O.none
      })

      assert.deepStrictEqual(F.fontOptions({ style: 'italic', variant: 'normal' }), {
        style: O.some('italic'),
        variant: O.some('normal'),
        weight: O.none
      })
    })
  })

  describe('showFontOptions', () => {
    assert.deepStrictEqual(
      pipe(F.fontOptions({ style: 'italic', variant: 'normal', weight: 'bold' }), F.showFontOptions),
      'italic normal bold'
    )

    assert.deepStrictEqual(pipe(F.fontOptions({ weight: 'bold' }), F.showFontOptions), 'bold')
  })

  describe('font', () => {
    it('should construct a Font object', () => {
      assert.deepStrictEqual(F.font('serif', 48, F.fontOptions({ weight: 'bold' })), {
        fontFamily: 'serif',
        size: 48,
        fontOptions: { style: O.none, variant: O.none, weight: O.some('bold') }
      })

      assert.deepStrictEqual(F.font('serif', 48), {
        fontFamily: 'serif',
        size: 48,
        fontOptions: { style: O.none, variant: O.none, weight: O.none }
      })
    })
  })

  describe('showFont', () => {
    assert.deepStrictEqual(pipe(F.font('serif', 48, F.fontOptions({ weight: 'bold' })), F.showFont), 'bold 48px serif')

    assert.deepStrictEqual(pipe(F.font('serif', 48), F.showFont), '48px serif')
  })
})
