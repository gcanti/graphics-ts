---
title: Canvas.ts
nav_order: 1
parent: Modules
---

# Canvas overview

The `Canvas` module contains all the functions necessary to interact with the HTML
Canvas API. `graphics-ts` wraps all canvas operations in an `IO<A>` to allow for
chaining multiple effectful calls to the HTML Canvas API.

For example, taking the example of [drawing a triangle](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes) from the MDN Web Docs, the code
without `graphics-ts` looks like this.

```ts
const draw = () => {
  var canvas = document.getElementById('canvas')

  if (canvas.getContext) {
    var ctx = canvas.getContext('2d')

    ctx.beginPath()
    ctx.fillStyle = 'black'
    ctx.moveTo(75, 50)
    ctx.lineTo(100, 75)
    ctx.lineTo(100, 25)
    ctx.fill()
  }
}
```

With `graphics-ts`, the above code becomes

```ts
import * as IO from 'fp-ts/lib/IO'
import { flow } from 'fp-ts/lib/function'
import { pipe } from 'fp-ts/lib/pipeable'
import * as C from 'graphics-ts/lib/Canvas'
import * as S from 'graphics-ts/lib/Shape'

const canvasId = 'canvas'

pipe(
  C.getCanvasElementById(canvasId),
  IO.chain(
    O.fold(
      () => error(`[ERROR]: Unable to find canvas`),
      flow(
        C.getContext2D,
        IO.chain(
          C.fillPath(
            flow(
              C.setFillStyle(pipe(Color.black, Color.toCss)),
              IO.chain(C.moveTo(S.point(75, 50))),
              IO.chain(C.lineTo(S.point(100, 75))),
              IO.chain(C.lineTo(S.point(100, 25)))
            )
          )
        )
      )
    )
  )
)()
```

While this may seem somewhat verbose compared to its non-functional counterpart above,
the real power of the `Canvas` module is apparent when it is abstracted away by the
[Drawing](#drawing) module.

Adapted from https://github.com/purescript-contrib/purescript-canvas.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [CanvasDimensions (interface)](#canvasdimensions-interface)
- [Gradient (interface)](#gradient-interface)
- [Html (interface)](#html-interface)
- [Render (interface)](#render-interface)
- [TextMetrics (interface)](#textmetrics-interface)
- [FillRule (type alias)](#fillrule-type-alias)
- [GlobalCompositeOperation (type alias)](#globalcompositeoperation-type-alias)
- [ImageSource (type alias)](#imagesource-type-alias)
- [LineCap (type alias)](#linecap-type-alias)
- [LineJoin (type alias)](#linejoin-type-alias)
- [PatternRepetition (type alias)](#patternrepetition-type-alias)
- [TextAlign (type alias)](#textalign-type-alias)
- [addColorStop](#addcolorstop)
- [arc](#arc)
- [beginPath](#beginpath)
- [bezierCurveTo](#beziercurveto)
- [clearRect](#clearrect)
- [clip](#clip)
- [closePath](#closepath)
- [createImageData](#createimagedata)
- [createImageDataCopy](#createimagedatacopy)
- [createLinearGradient](#createlineargradient)
- [createPattern](#createpattern)
- [createRadialGradient](#createradialgradient)
- [drawImage](#drawimage)
- [drawImageFull](#drawimagefull)
- [drawImageScale](#drawimagescale)
- [fill](#fill)
- [fillPath](#fillpath)
- [fillRect](#fillrect)
- [fillText](#filltext)
- [getCanvasElementById](#getcanvaselementbyid)
- [getContext2D](#getcontext2d)
- [getDimensions](#getdimensions)
- [getFont](#getfont)
- [getHeight](#getheight)
- [getImageData](#getimagedata)
- [getTextAlign](#gettextalign)
- [getWidth](#getwidth)
- [lineTo](#lineto)
- [measureText](#measuretext)
- [moveTo](#moveto)
- [putImageData](#putimagedata)
- [putImageDataFull](#putimagedatafull)
- [quadraticCurveTo](#quadraticcurveto)
- [rect](#rect)
- [restore](#restore)
- [rotate](#rotate)
- [save](#save)
- [scale](#scale)
- [setDimensions](#setdimensions)
- [setFillStyle](#setfillstyle)
- [setFont](#setfont)
- [setGlobalAlpha](#setglobalalpha)
- [setGlobalCompositeOperation](#setglobalcompositeoperation)
- [setHeight](#setheight)
- [setLineCap](#setlinecap)
- [setLineJoin](#setlinejoin)
- [setLineWidth](#setlinewidth)
- [setMiterLimit](#setmiterlimit)
- [setShadowBlur](#setshadowblur)
- [setShadowColor](#setshadowcolor)
- [setShadowOffsetX](#setshadowoffsetx)
- [setShadowOffsetY](#setshadowoffsety)
- [setStrokeStyle](#setstrokestyle)
- [setTextAlign](#settextalign)
- [setWidth](#setwidth)
- [stroke](#stroke)
- [strokePath](#strokepath)
- [strokeRect](#strokerect)
- [strokeText](#stroketext)
- [toDataURL](#todataurl)
- [transform](#transform)
- [translate](#translate)
- [unsafeGetCanvasElementById](#unsafegetcanvaselementbyid)
- [unsafeGetContext2D](#unsafegetcontext2d)
- [withContext](#withcontext)

---

# CanvasDimensions (interface)

Represents the dimensions of the HTML canvas.

**Signature**

```ts
export interface CanvasDimensions {
  /**
   * The width of the canvas in CSS pixels.
   */
  readonly width: number

  /**
   * The height of the canvas in CSS pixels.
   */
  readonly height: number
}
```

Added in v1.0.0

# Gradient (interface)

Represents the management of a `CanvasGradient` as _reading_ from the `CanvasGradient` and
returning a type `A` wrapped in an `IO`. In other words, we can say that when we are managing
a `CanvasGradient` we are yielding an `Gradient` effect.

**Signature**

```ts
export interface Gradient<A> extends R.Reader<CanvasGradient, IO.IO<A>> {}
```

Added in v0.0.1

# Html (interface)

Represents the management of an `HTMLCanvasElement` as _reading_ from the `HTMLCanvasElement`
and returning a type `A` wrapped in an `IO`. In other words, we can say that when we are
managing an `HTMLCanvasElement` we are yielding an `Html` effect.

**Signature**

```ts
export interface Html<A> extends R.Reader<HTMLCanvasElement, IO.IO<A>> {}
```

Added in v0.0.1

# Render (interface)

Represents the management of a `CanvasRenderingContext2D` as _reading_ from the
`CanvasRenderingContext2D` and returning a type `A` wrapped in an `IO`. In other words, we can
say that when we are managing a `CanvasRenderingContext2D` we are yielding an `Render` effect.

**Signature**

```ts
export interface Render<A> extends R.Reader<CanvasRenderingContext2D, IO.IO<A>> {}
```

Added in v0.0.1

# TextMetrics (interface)

The dimensions of a piece of text in the canvas.

**Signature**

```ts
export interface TextMetrics {
  /**
   * The calculated width of a segment of inline text in CSS pixels.
   */
  readonly width: number

  /**
   * The distance from the alignment point given by the `text-align` property to the left side
   * of the bounding rectangle of the given text in CSS pixels.
   */
  readonly actualBoundingBoxLeft: number

  /**
   * The distance from the alignment point given by the `text-align` property to the right side
   * of the bounding rectangle of the given text in CSS pixels.
   */
  readonly actualBoundingBoxRight: number

  /**
   * The distance from the horizontal line indicated by the `text-baseline` attribute to the top
   * of the highest bounding rectangle of all the fonts used to render the text in CSS pixels.
   */
  readonly fontBoundingBoxAscent: number

  /**
   * The distance from the horizontal line indicated by the `text-baseline` attribute to the bottom
   * of the bounding rectangle of all the fonts used to render the text in CSS pixels.
   */
  readonly fontBoundingBoxDescent: number

  /**
   * The distance from the horizontal line indicated by the `text-baseline` attribute to the top
   * of the bounding rectangle used to render the text in CSS pixels.
   */
  readonly actualBoundingBoxAscent: number

  /**
   * The distance from the horizontal line indicated by the `text-baseline` attribute to the bottom
   * of the bounding rectangle used to render the text in CSS pixels.
   */
  readonly actualBoundingBoxDescent: number

  /**
   * The distance from the horizontal line indicated by the `text-baseline` property to the top
   * of the *em* square in the line box in CSS pixels.
   */
  readonly emHeightAscent: number

  /**
   * The distance from the horizontal line indicated by the `text-baseline` property to the bottom
   * of the *em* square in the line box, in CSS pixels.
   */
  readonly emHeightDescent: number

  /**
   * The horizontal line indicated by the `text-baseline` property to the hanging baseline of the
   * line box in CSS pixels.
   */
  readonly hangingBaseline: number

  /**
   * The distance from the horizontal line indicated by the `text-baseline` property to the alphabetic
   * baseline of the line box in CSS pixels.
   */
  readonly alphabeticBaseline: number

  /**
   * The distance from the horizontal line indicated by the `text-baseline` property to the ideographic
   * baseline of the line box in CSS pixels.
   */
  readonly ideographicBaseline: number
}
```

Added in v1.0.0

# FillRule (type alias)

The algorithm by which to determine if a point is inside or outside the filling region.

**Signature**

```ts
export type FillRule = 'evenodd' | 'nonzero'
```

Added in v1.0.0

# GlobalCompositeOperation (type alias)

The type of compositing operation to apply when drawing new shapes. Defaults to `source-over`.

**Signature**

```ts
export type GlobalCompositeOperation =
  | 'source-over'
  | 'source-in'
  | 'source-out'
  | 'source-atop'
  | 'destination-over'
  | 'destination-in'
  | 'destination-out'
  | 'destination-atop'
  | 'lighter'
  | 'copy'
  | 'xor'
  | 'multiply'
  | 'screen'
  | 'overlay'
  | 'darken'
  | 'lighten'
  | 'color-dodge'
  | 'color-burn'
  | 'hard-light'
  | 'soft-light'
  | 'difference'
  | 'exclusion'
  | 'hue'
  | 'saturation'
  | 'color'
  | 'luminosity'
```

Added in v1.0.0

# ImageSource (type alias)

An element to draw into the HTML canvas context.

**Signature**

```ts
export type ImageSource = HTMLImageElement | HTMLCanvasElement | HTMLVideoElement
```

Added in v1.0.0

# LineCap (type alias)

The shape used to draw the end points of lines.

**Signature**

```ts
export type LineCap = 'round' | 'square' | 'butt'
```

Added in v1.0.0

# LineJoin (type alias)

The shape used to draw two line segments where they meet.

**Signature**

```ts
export type LineJoin = 'bevel' | 'round' | 'miter'
```

Added in v1.0.0

# PatternRepetition (type alias)

The repetition pattern used to repeat a pattern's image.

**Signature**

```ts
export type PatternRepetition = 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat'
```

Added in v1.0.0

# TextAlign (type alias)

The text alignment used when drawing text.

**Signature**

```ts
export type TextAlign = 'left' | 'right' | 'center' | 'start' | 'end'
```

Added in v1.0.0

# addColorStop

Add a single color stop to a `CanvasGradient` object.

**Signature**

```ts
export declare const addColorStop: (offset: number, color: string) => Gradient<CanvasGradient>
```

Added in v1.0.0

# arc

Render an arc.

**Signature**

```ts
export declare const arc: (arc: Arc) => Render<CanvasRenderingContext2D>
```

Added in v1.0.0

# beginPath

Begin a path on the canvas.

**Signature**

```ts
export declare const beginPath: Render<CanvasRenderingContext2D>
```

Added in v1.0.0

# bezierCurveTo

Draw a cubic Bézier curve.

**Signature**

```ts
export declare const bezierCurveTo: (
  cpx1: number,
  cpy1: number,
  cpx2: number,
  cpy2: number,
  x: number,
  y: number
) => Render<CanvasRenderingContext2D>
```

Added in v1.0.0

# clearRect

Set the pixels in the specified rectangle back to transparent black.

**Signature**

```ts
export declare const clearRect: (rect: Rect) => Render<CanvasRenderingContext2D>
```

Added in v1.0.0

# clip

Clip the current path on the canvas.

**Signature**

```ts
export declare const clip: (fillRule?: FillRule, path?: Path2D) => Render<CanvasRenderingContext2D>
```

Added in v1.0.0

# closePath

Closes the current canvas path.

**Signature**

```ts
export declare const closePath: Render<CanvasRenderingContext2D>
```

Added in v1.0.0

# createImageData

Gets `ImageData` for the specified rectangle.

**Signature**

```ts
export declare const createImageData: (sw: number, sh: number) => Render<ImageData>
```

Added in v1.0.0

# createImageDataCopy

Creates a copy of an existing `ImageData` object.

**Signature**

```ts
export declare const createImageDataCopy: (imageData: ImageData) => Render<ImageData>
```

Added in v1.0.0

# createLinearGradient

Creates a linear `CanvasGradient` object.

**Signature**

```ts
export declare const createLinearGradient: (x0: number, y0: number, x1: number, y1: number) => Render<CanvasGradient>
```

Added in v1.0.0

# createPattern

Creates a new canvas pattern (repeatable image).

**Signature**

```ts
export declare const createPattern: (
  imageSource: ImageSource,
  repetition: PatternRepetition
) => Render<O.Option<CanvasPattern>>
```

Added in v1.0.0

# createRadialGradient

Creates a radial `CanvasGradient` object.

**Signature**

```ts
export declare const createRadialGradient: (
  x0: number,
  y0: number,
  r0: number,
  x1: number,
  y1: number,
  r1: number
) => Render<CanvasGradient>
```

Added in v1.0.0

# drawImage

Render an image.

**Signature**

```ts
export declare const drawImage: (
  imageSource: ImageSource,
  offsetX: number,
  offsetY: number
) => Render<CanvasRenderingContext2D>
```

Added in v1.0.0

# drawImageFull

Draws an image to the canvas.

**Signature**

```ts
export declare const drawImageFull: (
  imageSource: ImageSource,
  offsetX: number,
  offsetY: number,
  width: number,
  height: number,
  canvasOffsetX: number,
  canvasOffsetY: number,
  canvasImageWidth: number,
  canvasImageHeight: number
) => Render<CanvasRenderingContext2D>
```

Added in v1.0.0

# drawImageScale

Draws an image to the canvas.

**Signature**

```ts
export declare const drawImageScale: (
  imageSource: ImageSource,
  offsetX: number,
  offsetY: number,
  width: number,
  height: number
) => Render<CanvasRenderingContext2D>
```

Added in v1.0.0

# fill

Fill the current path on the canvas.

**Signature**

```ts
export declare const fill: (fillRule?: FillRule, path?: Path2D) => Render<CanvasRenderingContext2D>
```

Added in v1.0.0

# fillPath

Convenience function for drawing a filled path.

**Signature**

```ts
export declare const fillPath: <A>(f: Render<A>) => Render<A>
```

Added in v1.0.0

# fillRect

Render a filled rectangle.

**Signature**

```ts
export declare const fillRect: (rect: Rect) => Render<CanvasRenderingContext2D>
```

Added in v1.0.0

# fillText

Render filled text.

**Signature**

```ts
export declare const fillText: (
  text: string,
  x: number,
  y: number,
  maxWidth?: number
) => Render<CanvasRenderingContext2D>
```

Added in v1.0.0

# getCanvasElementById

Gets an canvas element by id, or `None` if the element does not exist or is not an
instance of `HTMLCanvasElement`.

**Signature**

```ts
export declare const getCanvasElementById: (id: string) => IO.IO<O.Option<HTMLCanvasElement>>
```

Added in v1.0.0

# getContext2D

Gets the 2D graphics context for a canvas element.

**Signature**

```ts
export declare const getContext2D: Html<CanvasRenderingContext2D>
```

Added in v1.0.0

# getDimensions

Gets the dimensions of the canvas in pixels.

**Signature**

```ts
export declare const getDimensions: Html<CanvasDimensions>
```

Added in v1.0.0

# getFont

Gets the current font.

**Signature**

```ts
export declare const getFont: Render<string>
```

Added in v1.0.0

# getHeight

Gets the canvas height in pixels.

**Signature**

```ts
export declare const getHeight: Html<number>
```

Added in v1.0.0

# getImageData

Gets the image data for the specified portion of the canvas.

**Signature**

```ts
export declare const getImageData: (rect: Rect) => Render<ImageData>
```

Added in v1.0.0

# getTextAlign

Gets the current text alignment.

**Signature**

```ts
export declare const getTextAlign: Render<TextAlign>
```

Added in v1.0.0

# getWidth

Gets the canvas width in pixels.

**Signature**

```ts
export declare const getWidth: Html<number>
```

Added in v1.0.0

# lineTo

Move the canvas path to the specified point while drawing a line segment.

**Signature**

```ts
export declare const lineTo: (point: Point) => Render<CanvasRenderingContext2D>
```

Added in v1.0.0

# measureText

Get the text measurements for the specified text.

**Signature**

```ts
export declare const measureText: (text: string) => Render<TextMetrics>
```

Added in v1.0.0

# moveTo

Move the canvas path to the specified point without drawing a line segment.

**Signature**

```ts
export declare const moveTo: (point: Point) => Render<CanvasRenderingContext2D>
```

Added in v1.0.0

# putImageData

Sets the image data for the specified portion of the canvas.

**Signature**

```ts
export declare const putImageData: (imageData: ImageData, dx: number, dy: number) => Render<CanvasRenderingContext2D>
```

Added in v1.0.0

# putImageDataFull

Sets the image data for the specified portion of the canvas.

**Signature**

```ts
export declare const putImageDataFull: (
  imageData: ImageData,
  dx: number,
  dy: number,
  dirtyX: number,
  dirtyY: number,
  dirtyWidth: number,
  dirtyHeight: number
) => Render<CanvasRenderingContext2D>
```

Added in v1.0.0

# quadraticCurveTo

Draws a quadratic Bézier curve.d

**Signature**

```ts
export declare const quadraticCurveTo: (
  cpx: number,
  cpy: number,
  x: number,
  y: number
) => Render<CanvasRenderingContext2D>
```

Added in v1.0.0

# rect

Render a rectangle.

**Signature**

```ts
export declare const rect: (rect: Rect) => Render<CanvasRenderingContext2D>
```

Added in v1.0.0

# restore

Restore the previous canvas context.

**Signature**

```ts
export declare const restore: Render<CanvasRenderingContext2D>
```

Added in v1.0.0

# rotate

Apply rotation to the current canvas context transform.

**Signature**

```ts
export declare const rotate: (angle: number) => Render<CanvasRenderingContext2D>
```

Added in v1.0.0

# save

Save the current canvas context.

**Signature**

```ts
export declare const save: Render<CanvasRenderingContext2D>
```

Added in v1.0.0

# scale

Apply scale to the current canvas context transform.

**Signature**

```ts
export declare const scale: (scaleX: number, scaleY: number) => Render<CanvasRenderingContext2D>
```

Added in v1.0.0

# setDimensions

Sets the dimensions of the canvas in pixels.

**Signature**

```ts
export declare const setDimensions: (dimensions: CanvasDimensions) => Html<HTMLCanvasElement>
```

Added in v1.0.0

# setFillStyle

Sets the current fill style for the canvas context.

**Signature**

```ts
export declare const setFillStyle: (style: string | CanvasGradient | CanvasPattern) => Render<CanvasRenderingContext2D>
```

Added in v1.0.0

# setFont

Sets the current font.

**Signature**

```ts
export declare const setFont: (font: string) => Render<CanvasRenderingContext2D>
```

Added in v1.0.0

# setGlobalAlpha

Sets the current global alpha for the canvas context.

**Signature**

```ts
export declare const setGlobalAlpha: (alpha: number) => Render<CanvasRenderingContext2D>
```

Added in v1.0.0

# setGlobalCompositeOperation

Sets the current global composite operation type for the canvas context.

**Signature**

```ts
export declare const setGlobalCompositeOperation: (
  compositeOperation: GlobalCompositeOperation
) => Render<CanvasRenderingContext2D>
```

Added in v1.0.0

# setHeight

Sets the height of the canvas in pixels.

**Signature**

```ts
export declare const setHeight: (height: number) => Html<HTMLCanvasElement>
```

Added in v1.0.0

# setLineCap

Sets the current line cap type for the canvas context.

**Signature**

```ts
export declare const setLineCap: (cap: LineCap) => Render<CanvasRenderingContext2D>
```

Added in v1.0.0

# setLineJoin

Sets the current line join type for the canvas context.

**Signature**

```ts
export declare const setLineJoin: (join: LineJoin) => Render<CanvasRenderingContext2D>
```

Added in v1.0.0

# setLineWidth

Sets the current line width for the canvas context in pixels.

**Signature**

```ts
export declare const setLineWidth: (width: number) => Render<CanvasRenderingContext2D>
```

Added in v1.0.0

# setMiterLimit

Sets the current miter limit for the canvas context.

**Signature**

```ts
export declare const setMiterLimit: (limit: number) => Render<CanvasRenderingContext2D>
```

Added in v1.0.0

# setShadowBlur

Sets the current shadow blur radius for the canvas context.

**Signature**

```ts
export declare const setShadowBlur: (blur: number) => Render<CanvasRenderingContext2D>
```

Added in v1.0.0

# setShadowColor

Sets the current shadow color for the canvas context.

**Signature**

```ts
export declare const setShadowColor: (color: string) => Render<CanvasRenderingContext2D>
```

Added in v1.0.0

# setShadowOffsetX

Sets the current shadow x-offset for the canvas context.

**Signature**

```ts
export declare const setShadowOffsetX: (offsetX: number) => Render<CanvasRenderingContext2D>
```

Added in v1.0.0

# setShadowOffsetY

Sets the current shadow y-offset for the canvas context.

**Signature**

```ts
export declare const setShadowOffsetY: (offsetY: number) => Render<CanvasRenderingContext2D>
```

Added in v1.0.0

# setStrokeStyle

Sets the current stroke style for the canvas context.

**Signature**

```ts
export declare const setStrokeStyle: (style: string) => Render<CanvasRenderingContext2D>
```

Added in v1.0.0

# setTextAlign

Sets the current text alignment.

**Signature**

```ts
export declare const setTextAlign: (textAlign: TextAlign) => Render<CanvasRenderingContext2D>
```

Added in v1.0.0

# setWidth

Sets the width of the canvas in pixels.

**Signature**

```ts
export declare const setWidth: (width: number) => Html<HTMLCanvasElement>
```

Added in v1.0.0

# stroke

Stroke the current path on the canvas.

**Signature**

```ts
export declare const stroke: (path?: Path2D) => Render<CanvasRenderingContext2D>
```

Added in v1.0.0

# strokePath

Convenience function for drawing a stroked path.

**Signature**

```ts
export declare const strokePath: <A>(f: Render<A>) => Render<A>
```

Added in v1.0.0

# strokeRect

Render a stroked rectangle.

**Signature**

```ts
export declare const strokeRect: (r: Rect) => Render<CanvasRenderingContext2D>
```

Added in v1.0.0

# strokeText

Render stroked text.

**Signature**

```ts
export declare const strokeText: (
  text: string,
  x: number,
  y: number,
  maxWidth?: number
) => Render<CanvasRenderingContext2D>
```

Added in v1.0.0

# toDataURL

Create a data URL for the canvas.

**Signature**

```ts
export declare const toDataURL: Html<string>
```

Added in v1.0.0

# transform

Apply the specified transformation matrix to the canvas context.

**Signature**

```ts
export declare const transform: (
  m11: number,
  m12: number,
  m21: number,
  m22: number,
  m31: number,
  m32: number
) => Render<CanvasRenderingContext2D>
```

Added in v1.0.0

# translate

Translate the current canvas context transform.

**Signature**

```ts
export declare const translate: (translateX: number, translateY: number) => Render<CanvasRenderingContext2D>
```

Added in v1.0.0

# unsafeGetCanvasElementById

**[UNSAFE]** Gets a canvas element by id.

**Signature**

```ts
export declare const unsafeGetCanvasElementById: (id: string) => HTMLCanvasElement
```

Added in v1.0.0

# unsafeGetContext2D

**[UNSAFE]** Gets the 2D graphics context for a canvas element.

**Signature**

```ts
export declare const unsafeGetContext2D: (canvas: HTMLCanvasElement) => CanvasRenderingContext2D
```

Added in v1.0.0

# withContext

A convenience function which allows for running an action while preserving the existing
canvas context.

**Signature**

```ts
export declare const withContext: <A>(f: Render<A>) => Render<A>
```

Added in v1.0.0
