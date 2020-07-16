---
title: Color.ts
nav_order: 2
parent: Modules
---

## Color overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [black](#black)
  - [hex](#hex)
  - [hsl](#hsl)
  - [hsla](#hsla)
  - [white](#white)
- [destructors](#destructors)
  - [toCss](#tocss)
- [model](#model)
  - [Color (type alias)](#color-type-alias)
  - [Hex (interface)](#hex-interface)
  - [Hsla (interface)](#hsla-interface)

---

# constructors

## black

**Signature**

```ts
export declare const black: Color
```

Added in v1.0.0

## hex

Constructs a `Color` using a hexadecimal value.

**Signature**

```ts
export declare const hex: (value: string) => Hex
```

Added in v1.0.0

## hsl

Constructs a fully opaque `Color` using the specified hue, saturation, and lightness.

**Signature**

```ts
export declare const hsl: (h: number, s: number, l: number) => Color
```

Added in v1.0.0

## hsla

Constructs a `Color` using the specified hue, saturation, lightness, and alpha.

**Signature**

```ts
export declare const hsla: (h: number, s: number, l: number, a: number) => Hsla
```

Added in v1.0.0

## white

**Signature**

```ts
export declare const white: Color
```

Added in v1.0.0

# destructors

## toCss

Converts a `Color` into a valid CSS string.

**Signature**

```ts
export declare const toCss: (color: Color) => string
```

Added in v1.0.0

# model

## Color (type alias)

Adapted from https://github.com/sharkdp/purescript-colors.

**Signature**

```ts
export type Color = Hex | Hsla
```

Added in v1.0.0

## Hex (interface)

Represents a color using a hexadecimal value.

**Signature**

```ts
export interface Hex {
  readonly _tag: 'Hex'

  /**
   * The hexadecimal value of a color.
   */
  readonly value: string
}
```

Added in v1.0.0

## Hsla (interface)

Represents a color using the HSL cylindrical-coordinate system.

**Signature**

```ts
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
```

Added in v1.0.0
