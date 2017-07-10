import { Option, getMonoid, some } from 'fp-ts/lib/Option'
import * as array from 'fp-ts/lib/Array'
import { monoidString } from 'fp-ts/lib/Monoid'
import { intercalate } from 'fp-ts/lib/Foldable'

const intercalateOptions = intercalate(array, getMonoid(monoidString))

export type FontFamily = string

export class FontOptions {
  constructor(
    public readonly style: Option<string>,
    public readonly variant: Option<string>,
    public readonly weight: Option<string>
  ) {}
  toString() {
    return intercalateOptions(some(' '), [this.style, this.variant, this.weight])
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
