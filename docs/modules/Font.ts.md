---
title: Font.ts
nav_order: 4
parent: Modules
---

## Font overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [font](#font)
  - [fontOptions](#fontoptions)
- [instances](#instances)
  - [showFont](#showfont)
  - [showFontOptions](#showfontoptions)
- [model](#model)
  - [Font (interface)](#font-interface)
  - [FontFamily (type alias)](#fontfamily-type-alias)
  - [FontOptions (interface)](#fontoptions-interface)

---

# constructors

## font

Constructs a new `Font`.

**Signature**

```ts
export declare const font: (fontFamily: string, size: number, options?: FontOptions) => Font
```

Added in v1.0.0

## fontOptions

Constructs a new `FontOptions` object.

**Signature**

```ts
export declare const fontOptions: ({
  style,
  variant,
  weight,
}: {
  readonly style?: string
  readonly variant?: string
  readonly weight?: string
}) => FontOptions
```

Added in v1.0.0

# instances

## showFont

The `Show` instance for `Font`.

**Signature**

```ts
export declare const showFont: S.Show<Font>
```

Added in v1.0.0

## showFontOptions

The `Show` instance for `FontOptions`.

**Signature**

```ts
export declare const showFontOptions: S.Show<FontOptions>
```

Added in v1.0.0

# model

## Font (interface)

Represents the `font` CSS property.

**Signature**

```ts
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
```

Added in v1.0.0

## FontFamily (type alias)

Represents the `font-family` CSS property.

The `font-family` CSS property specifies a prioritized list of one or more
font family names and/or generic family names for the selected element.

**Signature**

```ts
export type FontFamily = string
```

Added in v1.0.0

## FontOptions (interface)

Represents optional values for modifying the style of a font.

**Signature**

```ts
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
```

Added in v1.0.0
