// adpated from https://github.com/sharkdp/purescript-colors

export type Color = {
  h: number
  s: number
  l: number
  a: number
}

export function hsla(h: number, s: number, l: number, a: number): Color {
  return { h, s, l, a }
}

export function hsl(h: number, s: number, l: number) {
  return hsla(h, s, l, 1)
}

export function toCss(color: Color): string {
  const { h, s, l, a } = color
  const toString = (n: number) => Math.round(n * 100.0) / 100
  const hue = toString(h)
  const saturation = toString(s * 100.0) + '%'
  const lightness = toString(l * 100.0) + '%'
  const alpha = String(a)
  return a === 1 ? `hsl(${hue}, ${saturation}, ${lightness})` : `hsla(${hue}, ${saturation}, ${lightness}, ${alpha})`
}

export const black = hsl(0, 0, 0)

export const white = hsl(360, 100, 100)
