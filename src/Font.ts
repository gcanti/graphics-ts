/**
 * @since 1.0.0
 */
import * as A from 'fp-ts/lib/Array'
import * as B from 'fp-ts/lib/boolean'
import * as O from 'fp-ts/lib/Option'
import * as RR from 'fp-ts/lib/ReadonlyRecord'
import * as S from 'fp-ts/lib/Show'
import { monoidString } from 'fp-ts/lib/Monoid'
import { intercalate } from 'fp-ts/lib/Foldable'
import { pipe } from 'fp-ts/lib/pipeable'

/**
 * Represents the `font-family` CSS property.
 *
 * The `font-family` CSS property specifies a prioritized list of one or more
 * font family names and/or generic family names for the selected element.
 *
 * @since 1.0.0
 */
export type FontFamily = string

/**
 * Represents optional values for modifying the style of a font.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/font
 *
 * @since 1.0.0
 */
export interface FontOptions {
  /**
   * Represents the `font-style` CSS property.
   *
   * The `font-style` CSS property sets whether a font should be styled with a normal,
   * italic, or oblique face from its * font-family.
   */
  readonly style: O.Option<string>

  /**
   * Represents the `font-variant` CSS property.
   *
   * The `font-variant` CSS property is a shorthand for the longhand properties `font-variant-caps`,
   * `font-variant-numeric`, `font-variant-alternates`, `font-variant-ligatures`, and `font-variant-east-asian`.
   */
  readonly variant: O.Option<string>

  /**
   * Represnts the `font-weight` CSS property.
   *
   * The `font-weight` CSS property sets the weight (or boldness) of the font.
   */
  readonly weight: O.Option<string>
}

/**
 * Constructs a new `FontOptions` object.
 *
 * @since 1.0.0
 */
export const fontOptions = ({
  style,
  variant,
  weight
}: {
  readonly style?: string
  readonly variant?: string
  readonly weight?: string
}): FontOptions => ({
  style: O.fromNullable(style),
  variant: O.fromNullable(variant),
  weight: O.fromNullable(weight)
})

/**
 * The `Show` instance for `FontOptions`.
 *
 * @since 1.0.0
 */
export const showFontOptions: S.Show<FontOptions> = {
  show: (o) => intercalate(monoidString, RR.readonlyRecord)(' ', RR.compact(RR.fromRecord(o)))
}

/**
 * Represents the `font` CSS property.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/font
 *
 * @since 1.0.0
 */
export interface Font {
  /**
   * Represents the `font-family` CSS property.
   *
   * The `font-family` CSS property specifies a prioritized list of one or more
   * font family names and/or generic family names for the selected element.
   */
  readonly fontFamily: FontFamily

  /**
   * Represents the `font-size` CSS property.
   *
   * The `font-size` CSS property sets the size of the font.
   */
  readonly size: number

  /**
   * Represents optional values for modifying the style of a font.
   */
  readonly fontOptions: FontOptions
}

/**
 * Constructs a new `Font`.
 *
 * @since 1.0.0
 */
export const font = (fontFamily: FontFamily, size: number, options?: FontOptions): Font => ({
  fontFamily,
  size,
  fontOptions: typeof options === 'object' ? options : fontOptions({})
})

/**
 * The `Show` instance for `Font`.
 *
 * @since 1.0.0
 */
export const showFont: S.Show<Font> = {
  show: ({ fontFamily, size, fontOptions }) =>
    intercalate(monoidString, A.array)(
      ' ',
      A.compact([
        // Determine if any font options were specified
        pipe(
          fontOptions,
          RR.fromRecord,
          RR.compact,
          RR.isEmpty,
          B.fold(
            () => O.some(showFontOptions.show(fontOptions)),
            () => O.none
          )
        ),
        O.some(`${size}px`),
        O.some(fontFamily)
      ])
    )
}
