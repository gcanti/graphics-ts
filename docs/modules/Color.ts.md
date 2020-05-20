---
title: Color.ts
nav_order: 2
parent: Modules
---

# Color overview

Adapted from https://github.com/sharkdp/purescript-colors.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Color (interface)](#color-interface)
- [black](#black)
- [hsl](#hsl)
- [hsla](#hsla)
- [toCss](#tocss)
- [white](#white)

---

# Color (interface)

Represents a color using the HSL cylindrical-coordinate system.

**Signature**

```ts
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
```

Added in v1.0.0

# black

**Signature**

```ts
export declare const black: Color
```

Added in v1.0.0

# hsl

Constructs a fully opaque `Color` using the specified hue, saturation, and lightness.

**Signature**

```ts
export declare function hsl(h: number, s: number, l: number): Color
```

Added in v1.0.0

# hsla

Constructs a `Color` using the specified hue, saturation, lightness, and alpha.

**Signature**

```ts
export declare function hsla(h: number, s: number, l: number, a: number): Color
```

Added in v1.0.0

# toCss

Converts a `Color` into a valid CSS string.

**Signature**

```ts
export declare function toCss(color: Color): string
```

Added in v1.0.0

# white

**Signature**

```ts
export declare const white: Color
```

Added in v1.0.0
