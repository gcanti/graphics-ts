/**
 * Adapted from https://github.com/sharkdp/purescript-colors.
 *
 * @since 1.0.0
 */
export type Color = Hex | Hsla

/**
 * Represents a color using a hexadecimal value.
 *
 * @since 1.0.0
 */
export interface Hex {
  readonly _tag: 'Hex'

  /**
   * The hexadecimal value of a color.
   */
  readonly value: string
}

/**
 * Constructs a `Color` using a hexadecimal value.
 *
 * @since 1.0.0
 */
export const hex: (value: string) => Hex = (value) => ({ _tag: 'Hex', value })

/**
 * Represents a color using the HSL cylindrical-coordinate system.
 *
 * @since 1.0.0
 */
export interface Hsla {
  readonly _tag: 'Hsla'

  /**
   * A number between `0` and `360` representing the hue of the color in degrees.
   */
  readonly h: number

  /**
   * A number between `0` and `1` representing the percent saturation of the color
   * where `0` is completely denatured (grayscale) and `1` is fully saturated (full color).
   */
  readonly s: number

  /**
   * A number between `0` and `1` representing the percent lightness of the color
   * where `0` is completely dark (black) and `1` is completely light (white).
   */
  readonly l: number

  /**
   * A number between `0` and `1` representing the opacity or transparency of the color
   * where `0` is fully transparent and `1` is fully opaque.
   */
  readonly a: number
}

/**
 * Constructs a `Color` using the specified hue, saturation, lightness, and alpha.
 *
 * @since 1.0.0
 */
export const hsla: (h: number, s: number, l: number, a: number) => Hsla = (h, s, l, a) => ({ _tag: 'Hsla', h, s, l, a })

/**
 * Constructs a fully opaque `Color` using the specified hue, saturation, and lightness.
 *
 * @since 1.0.0
 */
export const hsl: (h: number, s: number, l: number) => Color = (h, s, l) => hsla(h, s, l, 1)

/**
 * Converts a `Color` into a valid CSS string.
 *
 * @since 1.0.0
 */
export const toCss: (color: Color) => string = (c) => {
  switch (c._tag) {
    case 'Hex':
      return c.value

    case 'Hsla': {
      const { h, s, l, a } = c

      const toString = (n: number): number => Math.round(n * 100.0) / 100

      const hue = toString(h)
      const saturation = toString(s * 100.0) + '%'
      const lightness = toString(l * 100.0) + '%'
      const alpha = String(a)

      return a === 1
        ? `hsl(${hue}, ${saturation}, ${lightness})`
        : `hsla(${hue}, ${saturation}, ${lightness}, ${alpha})`
    }
  }
}

/**
 * @since 1.0.0
 */
export const black: Color = hsl(0, 0, 0)

/**
 * @since 1.0.0
 */
export const white: Color = hsl(360, 1, 1)
