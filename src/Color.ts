/**
 * Adapted from https://github.com/sharkdp/purescript-colors
 *
 * @since 1.0.0
 */

 /**
  * Represents a color using the HSL cylindrical-coordinate system.
  *
  * @since 1.0.0
  */
 export interface Color {
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
export function hsla(h: number, s: number, l: number, a: number): Color {
  return { h, s, l, a }
}

/**
 * Constructs a fully opaque `Color` using the specified hue, saturation, and lightness.
 *
 * @since 1.0.0
 */
export function hsl(h: number, s: number, l: number): Color {
  return hsla(h, s, l, 1)
}

/**
 * Converts a `Color` into a valid CSS string.
 *
 * @since 1.0.0
 */
export function toCss(color: Color): string {
  const { h, s, l, a } = color

  const toString = (n: number): number => Math.round(n * 100.0) / 100

  const hue = toString(h)
  const saturation = toString(s * 100.0) + '%'
  const lightness = toString(l * 100.0) + '%'
  const alpha = String(a)

  return a === 1 ? `hsl(${hue}, ${saturation}, ${lightness})` : `hsla(${hue}, ${saturation}, ${lightness}, ${alpha})`
}

/**
 * @since 1.0.0
 */
export const black: Color = hsl(0, 0, 0)

/**
 * @since 1.0.0
 */
export const white: Color = hsl(360, 1, 1)
