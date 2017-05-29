import { Option } from 'fp-ts/lib/Option'
import * as option from 'fp-ts/lib/Option'
import * as array from 'fp-ts/lib/Array'
import { getCompositionFoldable } from 'fp-ts/lib/Foldable'
import { monoidString } from 'fp-ts/lib/Monoid'
import { intercalate } from 'fp-ts/lib/Foldable'

declare module 'fp-ts/lib/HKT' {
  interface HKT<A> {
    'Array . Option': Array<Option<A>>
  }
}

const arrayOptionFoldable = getCompositionFoldable('Array . Option', array, option)
const intercalateOptions = intercalate(arrayOptionFoldable, monoidString)

export type FontFamily = string

export class FontOptions {
  constructor(
    public readonly style: Option<string>,
    public readonly variant: Option<string>,
    public readonly weight: Option<string>
  ) {}
  toString() {
    return intercalateOptions(' ', [
      this.style,
      this.variant,
      this.weight
    ])
  }
}

export class Font {
  constructor(
    public readonly fontFamily: FontFamily,
    public readonly size: number,
    public readonly fontOptions: FontOptions
  ) {}
  toString() {
    return this.fontOptions + ' ' + this.size + 'px ' + this.fontFamily
  }
}
