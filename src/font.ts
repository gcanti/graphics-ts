import { Option } from 'fp-ts/lib/Option'
import * as option from 'fp-ts/lib/Option'
import * as array from 'fp-ts/lib/Array'
import { getFoldableComposition } from 'fp-ts/lib/Foldable'
import { monoidString } from 'fp-ts/lib/Monoid'
import { intercalate } from 'fp-ts/lib/Foldable'

export type FontFamily = string // newtype

export type FontOptions = { // newtype
  style: Option<string>,
  variant: Option<string>,
  weight: Option<string>
}

export class Font {
  constructor(
    public readonly fontFamily: FontFamily,
    public readonly size: number,
    public readonly fontOptions: FontOptions
  ) {}
  toString() {
    return optionsString(this.fontOptions) + ' ' + this.size + 'px ' + this.fontFamily
  }
}

declare module 'fp-ts/lib/HKT' {
  interface HKT<A> {
    ArrayOption: Array<Option<A>>
  }
}

const arrayOptionFoldable = getFoldableComposition('ArrayOption')(array, option)
const intercalateOptions = intercalate(arrayOptionFoldable, monoidString)

export function optionsString(options: FontOptions): string {
  return intercalateOptions(' ', [
    options.style,
    options.variant,
    options.weight
  ])
}
