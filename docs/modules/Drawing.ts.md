---
title: Drawing.ts
nav_order: 3
parent: Modules
---

## Drawing overview

The `Drawing` module abstracts away the repetitive calls to the HTML Canvas API that are required
when using the `Canvas` module directly and instead allows us to be more declarative with our code.

Taking the MDN example from the `Canvas` documentation,

```ts
import { error } from 'fp-ts/lib/Console'
import { pipe } from 'fp-ts/lib/pipeable'
import * as R from 'fp-ts-contrib/lib/ReaderIO'
import * as C from 'graphics-ts/lib/Canvas'
import * as Color from 'graphics-ts/lib/Color'
import * as S from 'graphics-ts/lib/Shape'

const canvasId = 'canvas'

const triangle: C.Render<void> = C.fillPath(
  pipe(
    C.setFillStyle(pipe(Color.black, Color.toCss)),
    R.chain(() => C.moveTo(S.point(75, 50))),
    R.chain(() => C.lineTo(S.point(100, 75))),
    R.chain(() => C.lineTo(S.point(100, 25)))
  )
)

C.renderTo(canvasId, () => error(`[ERROR]: Unable to find canvas with id ${canvasId}`))(triangle)()
```

the `triangle` renderer above becomes the following

```ts
import { error } from 'fp-ts/lib/Console'
import * as RA from 'fp-ts/lib/ReadonlyArray'
import * as C from 'graphics-ts/lib/Canvas'
import * as Color from 'graphics-ts/lib/Color'
import * as D from 'graphics-ts/lib/Drawing'
import * as S from 'graphics-ts/lib/Shape'

const canvasId = 'canvas'

const triangle: C.Render<void> = D.render(
  D.fill(S.path(RA.readonlyArray)([S.point(75, 50), S.point(100, 75), S.point(100, 25)]), D.fillStyle(Color.black))
)

C.renderTo(canvasId, () => error(`[ERROR]: Unable to find canvas with id ${canvasId}`))(triangle)()
```

Adapted from https://github.com/purescript-contrib/purescript-drawing

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [render](#render)
  - [renderShape](#rendershape)
- [constructors](#constructors)
  - [clipped](#clipped)
  - [fill](#fill)
  - [fillStyle](#fillstyle)
  - [lineWidth](#linewidth)
  - [many](#many)
  - [outline](#outline)
  - [outlineColor](#outlinecolor)
  - [rotate](#rotate)
  - [scale](#scale)
  - [shadowBlur](#shadowblur)
  - [shadowColor](#shadowcolor)
  - [shadowOffset](#shadowoffset)
  - [text](#text)
  - [translate](#translate)
  - [withShadow](#withshadow)
- [instances](#instances)
  - [monoidDrawing](#monoiddrawing)
  - [monoidFillStyle](#monoidfillstyle)
  - [monoidOutlineStyle](#monoidoutlinestyle)
  - [monoidShadow](#monoidshadow)
- [model](#model)
  - [Clipped (interface)](#clipped-interface)
  - [Drawing (type alias)](#drawing-type-alias)
  - [Fill (interface)](#fill-interface)
  - [FillStyle (interface)](#fillstyle-interface)
  - [Many (interface)](#many-interface)
  - [Outline (interface)](#outline-interface)
  - [OutlineStyle (interface)](#outlinestyle-interface)
  - [Rotate (interface)](#rotate-interface)
  - [Scale (interface)](#scale-interface)
  - [Shadow (interface)](#shadow-interface)
  - [Text (interface)](#text-interface)
  - [Translate (interface)](#translate-interface)
  - [WithShadow (interface)](#withshadow-interface)

---

# combinators

## render

Renders a `Drawing`.

**Signature**

```ts
export declare const render: (drawing: Drawing) => C.Render<CanvasRenderingContext2D>
```

Added in v1.0.0

## renderShape

Renders a `Shape`.

**Signature**

```ts
export declare const renderShape: (shape: Shape) => C.Render<CanvasRenderingContext2D>
```

Added in v1.1.0

# constructors

## clipped

Clips a `Drawing` using the specified `Shape`.

**Signature**

```ts
export declare const clipped: (shape: Shape, drawing: Drawing) => Drawing
```

Added in v1.0.0

## fill

Constructs a `Drawing` from a `Fill` `Shape`.

**Signature**

```ts
export declare const fill: (shape: Shape, style: FillStyle) => Drawing
```

Added in v1.0.0

## fillStyle

Constructs a `FillStyle`.

**Signature**

```ts
export declare const fillStyle: (color: Color) => FillStyle
```

Added in v1.0.0

## lineWidth

Constructs an `OutlineStyle` from a line width.

**Signature**

```ts
export declare const lineWidth: (lineWidth: number) => OutlineStyle
```

Added in v1.0.0

## many

Construct a single `Drawing` from a collection of `Many` `Drawing`s.

**Signature**

```ts
export declare const many: (drawings: readonly Drawing[]) => Drawing
```

Added in v1.0.0

## outline

Constructs a `Drawing` from an `Outline` `Shape`.

**Signature**

```ts
export declare const outline: (shape: Shape, style: OutlineStyle) => Drawing
```

Added in v1.0.0

## outlineColor

Constructs an `OutlineStyle` from a `Color`.

**Signature**

```ts
export declare const outlineColor: (color: Color) => OutlineStyle
```

Added in v1.0.0

## rotate

Applies rotation to the transform of a `Drawing`.

**Signature**

```ts
export declare const rotate: (angle: number, drawing: Drawing) => Drawing
```

Added in v1.0.0

## scale

Applies scale to the transform of a `Drawing`.

**Signature**

```ts
export declare const scale: (scaleX: number, scaleY: number, drawing: Drawing) => Drawing
```

Added in v1.0.0

## shadowBlur

Constructs a `Shadow` from a blur radius.

**Signature**

```ts
export declare const shadowBlur: (blurRadius: number) => Shadow
```

Added in v1.0.0

## shadowColor

Constructs a `Shadow` from a `Color`.

**Signature**

```ts
export declare const shadowColor: (color: Color) => Shadow
```

Added in v1.0.0

## shadowOffset

Constructs a `Shadow` from an offset `Point`.

**Signature**

```ts
export declare const shadowOffset: (offsetPoint: Point) => Shadow
```

Added in v1.0.0

## text

Constructs a `Drawing` from `Text`.

**Signature**

```ts
export declare const text: (font: Font, x: number, y: number, style: FillStyle, text: string) => Drawing
```

Added in v1.0.0

## translate

Applies translation to the transform of a `Drawing`.

**Signature**

```ts
export declare const translate: (translateX: number, translateY: number, drawing: Drawing) => Drawing
```

Added in v1.0.0

## withShadow

Applies `Shadow` to a `Drawing`.

**Signature**

```ts
export declare const withShadow: (shadow: Shadow, drawing: Drawing) => Drawing
```

Added in v1.0.0

# instances

## monoidDrawing

Gets a `Monoid` instance for `Drawing`.

**Signature**

```ts
export declare const monoidDrawing: M.Monoid<Drawing>
```

Added in v1.0.0

## monoidFillStyle

Gets a `Monoid` instance for `FillStyle`.

**Signature**

```ts
export declare const monoidFillStyle: M.Monoid<FillStyle>
```

Added in v1.0.0

## monoidOutlineStyle

Gets a `Monoid` instance for `OutlineStyle`.

**Signature**

```ts
export declare const monoidOutlineStyle: M.Monoid<OutlineStyle>
```

**Example**

```ts
import * as O from 'fp-ts/lib/Option'
import * as M from 'fp-ts/lib/Monoid'
import * as Color from 'graphics-ts/lib/Color'
import * as D from 'graphics-ts/lib/Drawing'

assert.deepStrictEqual(
  M.fold(D.monoidOutlineStyle)([D.outlineColor(Color.black), D.outlineColor(Color.white), D.lineWidth(5)]),
  {
    color: O.some(Color.black),
    lineWidth: O.some(5),
  }
)
```

Added in v1.0.0

## monoidShadow

Gets a `Monoid` instance for `Shadow`.

**Signature**

```ts
export declare const monoidShadow: M.Monoid<Shadow>
```

Added in v1.0.0

# model

## Clipped (interface)

Represents a `Drawing` that has been clipped by a `Shape`.

**Signature**

```ts
export interface Clipped {
  readonly _tag: 'Clipped'

  /**
   * The shape to use for clipping.
   */
  readonly shape: Shape

  /**
   * The drawing to be clipped.
   */
  readonly drawing: Drawing
}
```

Added in v1.0.0

## Drawing (type alias)

Represents a shape that can be drawn to the canvas.

**Signature**

```ts
export type Drawing = Clipped | Fill | Outline | Many | Rotate | Scale | Text | Translate | WithShadow
```

Added in v1.0.0

## Fill (interface)

Represents a filled `Shape` that can be drawn to the canvas.

**Signature**

```ts
export interface Fill {
  readonly _tag: 'Fill'

  /**
   * The filled `Shape`.
   */
  readonly shape: Shape

  /**
   * The fill style applied to the `Shape`.
   */
  readonly style: FillStyle
}
```

Added in v1.0.0

## FillStyle (interface)

Represents the styles applied to a filled `Shape`.

**Signature**

```ts
export interface FillStyle {
  /**
   * The fill color.
   */
  readonly color: O.Option<Color>
}
```

Added in v1.0.0

## Many (interface)

Represents a collection of `Drawing`s that can be drawn to the canvas.

**Signature**

```ts
export interface Many {
  readonly _tag: 'Many'

  /**
   * The collection of drawings.
   */
  readonly drawings: ReadonlyArray<Drawing>
}
```

Added in v1.0.0

## Outline (interface)

Represents an outlined `Shape` that can be drawn to the canvas.

**Signature**

```ts
export interface Outline {
  readonly _tag: 'Outline'

  /**
   * The outlined `Shape`.
   */
  readonly shape: Shape

  /**
   * The outline style applied to the `Shape`.
   */
  readonly style: OutlineStyle
}
```

Added in v1.0.0

## OutlineStyle (interface)

Represents the styles applied to an outlined `Shape`.

**Signature**

```ts
export interface OutlineStyle {
  /**
   * The outline color.
   */
  readonly color: O.Option<Color>

  /**
   * The outline line width.
   */
  readonly lineWidth: O.Option<number>
}
```

Added in v1.0.0

## Rotate (interface)

Represents a `Drawing` that has had its transform rotated.

**Signature**

```ts
export interface Rotate {
  readonly _tag: 'Rotate'

  /**
   * The angle of rotation.
   */
  readonly angle: number

  /**
   * The drawing to be rotated.
   */
  readonly drawing: Drawing
}
```

Added in v1.0.0

## Scale (interface)

Represents a `Drawing` that has had scale applied to its transform.

**Signature**

```ts
export interface Scale {
  readonly _tag: 'Scale'

  /**
   * The x-axis scale.
   */
  readonly scaleX: number

  /**
   * The y-axis scale.
   */
  readonly scaleY: number

  /**
   * The drawing to be scaled.
   */
  readonly drawing: Drawing
}
```

Added in v1.0.0

## Shadow (interface)

Represents the shadow styles applied to a `Shape`.

**Signature**

```ts
export interface Shadow {
  /**
   * The shadow color.
   */
  readonly color: O.Option<Color>

  /**
   * The shadow blur radius.
   */
  readonly blur: O.Option<number>

  /**
   * The shadow offset.
   */
  readonly offset: O.Option<Point>
}
```

Added in v1.0.0

## Text (interface)

Represents text that can be drawn to the canvas.

**Signature**

```ts
export interface Text {
  readonly _tag: 'Text'

  /**
   * The font style applied to the text.
   */
  readonly font: Font

  /**
   * The x-axis coordinate at which to begin drawing the text.
   */
  readonly x: number

  /**
   * The y-axis coordinate at which to begin drawing the text.
   */
  readonly y: number

  /**
   * The fill style applied to the text.
   */
  readonly style: FillStyle

  /**
   * The HTML text string.
   */
  readonly text: string
}
```

Added in v1.0.0

## Translate (interface)

Represents a `Drawing` that has had its transform translated.

**Signature**

```ts
export interface Translate {
  readonly _tag: 'Translate'

  /**
   * The x-axis translation.
   */
  readonly translateX: number

  /**
   * The y-axis translation.
   */
  readonly translateY: number

  /**
   * The drawing to be translated.
   */
  readonly drawing: Drawing
}
```

Added in v1.0.0

## WithShadow (interface)

Represents a `Drawing` that has had a shadow applied to it.

**Signature**

```ts
export interface WithShadow {
  readonly _tag: 'WithShadow'

  /**
   * The shadow to be applied.
   */
  readonly shadow: Shadow

  /**
   * The drawing to be shadowed.
   */
  readonly drawing: Drawing
}
```

Added in v1.0.0
