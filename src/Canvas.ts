/**
 * The `Canvas` module contains all the functions necessary to interact with the HTML
 * Canvas API. `graphics-ts` wraps all canvas operations in an `IO<A>` to allow for
 * chaining multiple effectful calls to the HTML Canvas API.
 *
 * For example, taking the example of [drawing a triangle](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes) from the MDN Web Docs, the code
 * without `graphics-ts` looks like this.
 *
 * ```ts
 * const draw = () => {
 *   var canvas = document.getElementById('canvas')
 *
 *   if (canvas.getContext) {
 *     var ctx = canvas.getContext('2d')
 *
 *     ctx.beginPath();
 *     ctx.fillStyle = 'black'
 *     ctx.moveTo(75, 50)
 *     ctx.lineTo(100, 75)
 *     ctx.lineTo(100, 25)
 *     ctx.fill()
 *   }
 * }
 * ```
 *
 * With `graphics-ts`, the above code becomes
 *
 * ```ts
 * import * as R from 'fp-ts-contrib/lib/ReaderIO'
 * import * as Console from 'fp-ts/lib/Console'
 * import * as IO from 'fp-ts/lib/IO'
 * import * as O from 'fp-ts/lib/Option'
 * import { flow } from 'fp-ts/lib/function'
 * import { pipe } from 'fp-ts/lib/pipeable'
 * import * as C from 'graphics-ts/lib/Canvas'
 * import * as Color from 'graphics-ts/lib/Color'
 * import * as S from 'graphics-ts/lib/Shape'
 *
 * const canvasId = 'canvas'
 *
 * const render = (canvasId: string) => <A>(r: C.Render<A>): IO.IO<void> =>
 *   pipe(
 *     C.getCanvasElementById(canvasId),
 *     IO.chain(O.fold(() => Console.error(`[ERROR]: Unable to find canvas`), flow(C.getContext2D, IO.chain(r))))
 *   )
 *
 * const triangle: C.Render<void> = C.fillPath(
 *   pipe(
 *     C.setFillStyle(pipe(Color.black, Color.toCss)),
 *     R.chain(() => C.moveTo(S.point(75, 50))),
 *     R.chain(() => C.lineTo(S.point(100, 75))),
 *     R.chain(() => C.lineTo(S.point(100, 25)))
 *   )
 * )
 *
 * render(canvasId)(triangle)()
 * ```
 *
 * While this may seem somewhat verbose compared to its non-functional counterpart above,
 * the real power of the `Canvas` module is apparent when it is abstracted away by the
 * [Drawing](#drawing) module.
 *
 * Adapted from https://github.com/purescript-contrib/purescript-canvas.
 *
 * @since 1.0.0
 */
import * as R from 'fp-ts-contrib/lib/ReaderIO'
import * as IO from 'fp-ts/lib/IO'
import * as O from 'fp-ts/lib/Option'
import { sequenceS } from 'fp-ts/lib/Apply'
import { pipe } from 'fp-ts/lib/pipeable'

import { Arc, Point, Rect } from './Shape'

/**
 * Represents the management of an `HTMLCanvasElement` as *reading* from the `HTMLCanvasElement`
 * and returning a type `A` wrapped in an `IO`. In other words, we can say that when we are
 * managing an `HTMLCanvasElement` we are yielding an `Html` effect.
 *
 * @since 0.0.1
 */
export interface Html<A> extends R.ReaderIO<HTMLCanvasElement, A> {}

/**
 * Represents the management of a `CanvasRenderingContext2D` as *reading* from the
 * `CanvasRenderingContext2D` and returning a type `A` wrapped in an `IO`. In other words, we can
 * say that when we are managing a `CanvasRenderingContext2D` we are yielding an `Render` effect.
 *
 * @since 0.0.1
 */
export interface Render<A> extends R.ReaderIO<CanvasRenderingContext2D, A> {}

/**
 * Represents the management of a `CanvasGradient` as *reading* from the `CanvasGradient` and
 * returning a type `A` wrapped in an `IO`. In other words, we can say that when we are managing
 * a `CanvasGradient` we are yielding an `Gradient` effect.
 *
 * @since 0.0.1
 */
export interface Gradient<A> extends R.ReaderIO<CanvasGradient, A> {}

/**
 * Represents the dimensions of the HTML canvas.
 *
 * @since 1.0.0
 */
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

/**
 * The algorithm by which to determine if a point is inside or outside the filling region.
 *
 * @see [MDN Web Docs](https://mzl.la/2zaDdNu)
 *
 * @since 1.0.0
 */
export type FillRule = 'evenodd' | 'nonzero'

/**
 * The type of compositing operation to apply when drawing new shapes. Defaults to `source-over`.
 *
 * @see [MDN Web Docs](https://mzl.la/36gbsz7)
 *
 * @since 1.0.0
 */
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

/**
 * An element to draw into the HTML canvas context.
 *
 * @see [MDN Web Docs](https://mzl.la/3bKwLu6)
 *
 * @since 1.0.0
 */
export type ImageSource = HTMLImageElement | HTMLCanvasElement | HTMLVideoElement

/**
 * The shape used to draw the end points of lines.
 *
 * @see [MDN Web Docs](https://mzl.la/2zOVZtS)
 *
 * @since 1.0.0
 */
export type LineCap = 'round' | 'square' | 'butt'

/**
 * The shape used to draw two line segments where they meet.
 *
 * @see [MDN Web Docs](https://mzl.la/3cMHqFU)
 *
 * @since 1.0.0
 */
export type LineJoin = 'bevel' | 'round' | 'miter'

/**
 * The repetition pattern used to repeat a pattern's image.
 *
 * @see [MDN Web Docs](https://mzl.la/3bN4nHJ)
 *
 * @since 1.0.0
 */
export type PatternRepetition = 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat'

/**
 * The text alignment used when drawing text.
 *
 * @see [MDN Web Docs](https://mzl.la/2TkO2TY)
 *
 * @since 1.0.0
 */
export type TextAlign = 'left' | 'right' | 'center' | 'start' | 'end'

/**
 * The dimensions of a piece of text in the canvas.
 *
 * @see [MDN Web Docs](https://mzl.la/3g0OCQG)
 *
 * @since 1.0.0
 */
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

/**
 * **[UNSAFE]** Gets a canvas element by id.
 *
 * @since 1.0.0
 */
export const unsafeGetCanvasElementById: (id: string) => HTMLCanvasElement = (id) =>
  document.getElementById(id) as HTMLCanvasElement

/**
 * **[UNSAFE]** Gets the 2D graphics context for a canvas element.
 *
 * @since 1.0.0
 */
export const unsafeGetContext2D: (canvas: HTMLCanvasElement) => CanvasRenderingContext2D = (c) =>
  c.getContext('2d') as CanvasRenderingContext2D

/**
 * Gets an canvas element by id, or `None` if the element does not exist or is not an
 * instance of `HTMLCanvasElement`.
 *
 * @since 1.0.0
 */
export const getCanvasElementById: (id: string) => IO.IO<O.Option<HTMLCanvasElement>> = (id) => () => {
  const canvas = unsafeGetCanvasElementById(id)
  return canvas instanceof HTMLCanvasElement ? O.some(canvas) : O.none
}

/**
 * Gets the 2D graphics context for a canvas element.
 *
 * @since 1.0.0
 */
export const getContext2D: Html<CanvasRenderingContext2D> = (c) => IO.of(unsafeGetContext2D(c))

/**
 * Gets the canvas width in pixels.
 *
 * @since 1.0.0
 */
export const getWidth: Html<number> = (c) => () => c.width

/**
 * Gets the canvas height in pixels.
 *
 * @since 1.0.0
 */
export const getHeight: Html<number> = (c) => () => c.height

/**
 * Sets the width of the canvas in pixels.
 *
 * @since 1.0.0
 */
export const setWidth: (width: number) => Html<HTMLCanvasElement> = (w) => (c) => () => {
  c.width = w
  return c
}

/**
 * Sets the height of the canvas in pixels.
 *
 * @since 1.0.0
 */
export const setHeight: (height: number) => Html<HTMLCanvasElement> = (h) => (c) => () => {
  c.height = h
  return c
}

/**
 * Gets the dimensions of the canvas in pixels.
 *
 * @since 1.0.0
 */
export const getDimensions: Html<CanvasDimensions> = (c) =>
  sequenceS(IO.io)({ height: getHeight(c), width: getWidth(c) })

/**
 * Sets the dimensions of the canvas in pixels.
 *
 * @since 1.0.0
 */
export const setDimensions: (dimensions: CanvasDimensions) => Html<HTMLCanvasElement> = (d) =>
  pipe(
    setWidth(d.width),
    R.chain(() => setHeight(d.height))
  )

/**
 * Create a data URL for the canvas.
 *
 * @since 1.0.0
 */
export const toDataURL: Html<string> = (c) => () => c.toDataURL()

/**
 * Sets the current line width for the canvas context in pixels.
 *
 * @since 1.0.0
 */
export const setLineWidth: (width: number) => Render<CanvasRenderingContext2D> = (w) => (ctx) => () => {
  ctx.lineWidth = w
  return ctx
}

/**
 * Sets the current fill style for the canvas context.
 *
 * @since 1.0.0
 */
export const setFillStyle: (style: string | CanvasGradient | CanvasPattern) => Render<CanvasRenderingContext2D> = (
  s
) => (ctx) => () => {
  ctx.fillStyle = s
  return ctx
}

/**
 * Sets the current stroke style for the canvas context.
 *
 * @since 1.0.0
 */
export const setStrokeStyle: (style: string) => Render<CanvasRenderingContext2D> = (s) => (ctx) => () => {
  ctx.strokeStyle = s
  return ctx
}

/**
 * Sets the current shadow color for the canvas context.
 *  @since 1.0.0
 */
export const setShadowColor: (color: string) => Render<CanvasRenderingContext2D> = (c) => (ctx) => () => {
  ctx.shadowColor = c
  return ctx
}

/**
 * Sets the current shadow blur radius for the canvas context.
 *
 *  @since 1.0.0
 */
export const setShadowBlur: (blur: number) => Render<CanvasRenderingContext2D> = (b) => (ctx) => () => {
  ctx.shadowBlur = b
  return ctx
}

/**
 * Sets the current shadow x-offset for the canvas context.
 *
 * @since 1.0.0
 */
export const setShadowOffsetX: (offsetX: number) => Render<CanvasRenderingContext2D> = (ox) => (ctx) => () => {
  ctx.shadowOffsetX = ox
  return ctx
}

/**
 * Sets the current shadow y-offset for the canvas context.
 *
 * @since 1.0.0
 */
export const setShadowOffsetY: (offsetY: number) => Render<CanvasRenderingContext2D> = (oy) => (ctx) => () => {
  ctx.shadowOffsetY = oy
  return ctx
}

/**
 * Sets the current miter limit for the canvas context.
 *
 * @since 1.0.0
 */
export const setMiterLimit: (limit: number) => Render<CanvasRenderingContext2D> = (l) => (ctx) => () => {
  ctx.miterLimit = l
  return ctx
}

/**
 * Sets the current line cap type for the canvas context.
 *
 * @since 1.0.0
 */
export const setLineCap: (cap: LineCap) => Render<CanvasRenderingContext2D> = (c) => (ctx) => () => {
  ctx.lineCap = c
  return ctx
}

/**
 * Sets the current line join type for the canvas context.
 *
 * @since 1.0.0
 */
export const setLineJoin: (join: LineJoin) => Render<CanvasRenderingContext2D> = (j) => (ctx) => () => {
  ctx.lineJoin = j
  return ctx
}

/**
 * Sets the current global composite operation type for the canvas context.
 *
 * @since 1.0.0
 */
export const setGlobalCompositeOperation: (
  compositeOperation: GlobalCompositeOperation
) => Render<CanvasRenderingContext2D> = (gco) => (ctx) => () => {
  ctx.globalCompositeOperation = gco
  return ctx
}

/**
 * Sets the current global alpha for the canvas context.
 *
 * @since 1.0.0
 */
export const setGlobalAlpha: (alpha: number) => Render<CanvasRenderingContext2D> = (a) => (ctx) => () => {
  ctx.globalAlpha = a
  return ctx
}

/**
 * Begin a path on the canvas.
 *
 * @since 1.0.0
 */
export const beginPath: Render<CanvasRenderingContext2D> = (ctx) => () => {
  ctx.beginPath()
  return ctx
}

/**
 * Stroke the current path on the canvas.
 *
 * @since 1.0.0
 */
export const stroke: (path?: Path2D) => Render<CanvasRenderingContext2D> = (p) => (ctx) => () => {
  if (typeof p !== 'undefined') {
    ctx.stroke(p)
  } else {
    ctx.stroke()
  }
  return ctx
}

/**
 * Fill the current path on the canvas.
 *
 * @since 1.0.0
 */
export const fill: (fillRule?: FillRule, path?: Path2D) => Render<CanvasRenderingContext2D> = (f, p) => (ctx) => () => {
  if (typeof p !== 'undefined') {
    ctx.fill(p, f)
  } else if (typeof f !== 'undefined') {
    ctx.fill(f)
  } else {
    ctx.fill()
  }
  return ctx
}

/**
 * Clip the current path on the canvas.
 *
 * @since 1.0.0
 */
export const clip: (fillRule?: FillRule, path?: Path2D) => Render<CanvasRenderingContext2D> = (f, p) => (ctx) => () => {
  if (typeof p !== 'undefined') {
    ctx.clip(p, f)
  } else if (typeof f !== 'undefined') {
    ctx.clip(f)
  } else {
    ctx.clip()
  }
  return ctx
}

/**
 * Move the canvas path to the specified point while drawing a line segment.
 *
 * @since 1.0.0
 */
export const lineTo: (point: Point) => Render<CanvasRenderingContext2D> = (p) => (ctx) => () => {
  ctx.lineTo(p.x, p.y)
  return ctx
}

/**
 * Move the canvas path to the specified point without drawing a line segment.
 *
 * @since 1.0.0
 */
export const moveTo: (point: Point) => Render<CanvasRenderingContext2D> = (p) => (ctx) => () => {
  ctx.moveTo(p.x, p.y)
  return ctx
}

/**
 * Closes the current canvas path.
 *
 * @since 1.0.0
 */
export const closePath: Render<CanvasRenderingContext2D> = (ctx) => () => {
  ctx.closePath()
  return ctx
}

/**
 * Convenience function for drawing a stroked path.
 *
 * @since 1.0.0
 */
export const strokePath: <A>(f: Render<A>) => Render<A> = (f) =>
  pipe(
    beginPath,
    R.chain(() => f),
    R.chainFirst(() => stroke())
  )

/**
 * Convenience function for drawing a filled path.
 *
 * @since 1.0.0
 */
export const fillPath: <A>(f: Render<A>) => Render<A> = (f) =>
  pipe(
    beginPath,
    R.chain(() => f),
    R.chainFirst(() => fill())
  )

/**
 * Render an arc.
 *
 * @since 1.0.0
 */
export const arc: (arc: Arc) => Render<CanvasRenderingContext2D> = (a) => (ctx) => () => {
  ctx.arc(a.x, a.y, a.r, a.start, a.end)
  return ctx
}

/**
 * Render a rectangle.
 *
 * @since 1.0.0
 */
export const rect: (rect: Rect) => Render<CanvasRenderingContext2D> = (r) => (ctx) => () => {
  ctx.rect(r.x, r.y, r.width, r.height)
  return ctx
}

/**
 * Render a filled rectangle.
 *
 * @since 1.0.0
 */
export const fillRect: (rect: Rect) => Render<CanvasRenderingContext2D> = (r) => (ctx) => () => {
  ctx.fillRect(r.x, r.y, r.width, r.height)
  return ctx
}

/**
 * Render a stroked rectangle.
 *
 * @since 1.0.0
 */
export const strokeRect: (r: Rect) => Render<CanvasRenderingContext2D> = (r) => (ctx) => () => {
  ctx.strokeRect(r.x, r.y, r.width, r.height)
  return ctx
}

/**
 * Set the pixels in the specified rectangle back to transparent black.
 *
 * @since 1.0.0
 */
export const clearRect: (rect: Rect) => Render<CanvasRenderingContext2D> = (r) => (ctx) => () => {
  ctx.clearRect(r.x, r.y, r.width, r.height)
  return ctx
}

/**
 * Apply scale to the current canvas context transform.
 *
 * @since 1.0.0
 */
export const scale: (scaleX: number, scaleY: number) => Render<CanvasRenderingContext2D> = (x, y) => (ctx) => () => {
  ctx.scale(x, y)
  return ctx
}

/**
 * Apply rotation to the current canvas context transform.
 *
 * @since 1.0.0
 */
export const rotate: (angle: number) => Render<CanvasRenderingContext2D> = (a) => (ctx) => () => {
  ctx.rotate(a)
  return ctx
}

/**
 * Translate the current canvas context transform.
 *
 * @since 1.0.0
 */
export const translate: (translateX: number, translateY: number) => Render<CanvasRenderingContext2D> = (x, y) => (
  ctx
) => () => {
  ctx.translate(x, y)
  return ctx
}

/**
 * Apply the specified transformation matrix to the canvas context.
 *
 * @since 1.0.0
 */
export const transform: (
  m11: number,
  m12: number,
  m21: number,
  m22: number,
  m31: number,
  m32: number
) => Render<CanvasRenderingContext2D> = (m11, m12, m21, m22, m31, m32) => (ctx) => () => {
  ctx.transform(m11, m12, m21, m22, m31, m32)
  return ctx
}

/**
 * Gets the current text alignment.
 *
 * @since 1.0.0
 */
export const getTextAlign: Render<TextAlign> = (ctx) => () => ctx.textAlign

/**
 * Sets the current text alignment.
 *
 * @since 1.0.0
 */
export const setTextAlign: (textAlign: TextAlign) => Render<CanvasRenderingContext2D> = (ta) => (ctx) => () => {
  ctx.textAlign = ta
  return ctx
}

/**
 * Gets the current font.
 *
 * @since 1.0.0
 */
export const getFont: Render<string> = (ctx) => () => ctx.font

/**
 * Sets the current font.
 *
 * @since 1.0.0
 */
export const setFont: (font: string) => Render<CanvasRenderingContext2D> = (f) => (ctx) => () => {
  ctx.font = f
  return ctx
}

/**
 * Render filled text.
 *
 * @since 1.0.0
 */
export const fillText: (text: string, x: number, y: number, maxWidth?: number) => Render<CanvasRenderingContext2D> = (
  t,
  x,
  y,
  mw
) => (ctx) => () => {
  if (typeof mw !== 'undefined') {
    ctx.fillText(t, x, y, mw)
  } else {
    ctx.fillText(t, x, y)
  }
  return ctx
}

/**
 * Render stroked text.
 *
 * @since 1.0.0
 */
export const strokeText: (text: string, x: number, y: number, maxWidth?: number) => Render<CanvasRenderingContext2D> = (
  t,
  x,
  y,
  mw
) => (ctx) => () => {
  if (typeof mw !== 'undefined') {
    ctx.strokeText(t, x, y, mw)
  } else {
    ctx.strokeText(t, x, y)
  }
  return ctx
}

/**
 * Get the text measurements for the specified text.
 *
 * @since 1.0.0
 */
export const measureText: (text: string) => Render<TextMetrics> = (t) => (ctx) => () => ctx.measureText(t)

/**
 * Save the current canvas context.
 *
 * @since 1.0.0
 */
export const save: Render<CanvasRenderingContext2D> = (ctx) => () => {
  ctx.save()
  return ctx
}

/**
 * Restore the previous canvas context.
 *
 * @since 1.0.0
 */
export const restore: Render<CanvasRenderingContext2D> = (ctx) => () => {
  ctx.restore()
  return ctx
}

/**
 * A convenience function which allows for running an action while preserving the existing
 * canvas context.
 *
 * @since 1.0.0
 */
export const withContext: <A>(f: Render<A>) => Render<A> = (f) =>
  pipe(
    save,
    R.chain(() => f),
    R.chainFirst(() => restore)
  )

/**
 * Gets the image data for the specified portion of the canvas.
 *
 * @since 1.0.0
 */
export const getImageData: (rect: Rect) => Render<ImageData> = (r) => (ctx) => () =>
  ctx.getImageData(r.x, r.y, r.width, r.height)

/**
 * Sets the image data for the specified portion of the canvas.
 *
 * @since 1.0.0
 */
export const putImageData: (imageData: ImageData, dx: number, dy: number) => Render<CanvasRenderingContext2D> = (
  data,
  dx,
  dy
) => (ctx) => () => {
  ctx.putImageData(data, dx, dy)
  return ctx
}

/**
 * Sets the image data for the specified portion of the canvas.
 *
 * @since 1.0.0
 */
export const putImageDataFull: (
  imageData: ImageData,
  dx: number,
  dy: number,
  dirtyX: number,
  dirtyY: number,
  dirtyWidth: number,
  dirtyHeight: number
) => Render<CanvasRenderingContext2D> = (data, dx, dy, dirtyX, dirtyY, dirtyW, dirtyH) => (ctx) => () => {
  ctx.putImageData(data, dx, dy, dirtyX, dirtyY, dirtyW, dirtyH)
  return ctx
}

/**
 * Gets `ImageData` for the specified rectangle.
 *
 * @since 1.0.0
 */
export const createImageData: (sw: number, sh: number) => Render<ImageData> = (sw, sh) => (ctx) => () =>
  ctx.createImageData(sw, sh)

/**
 * Creates a copy of an existing `ImageData` object.
 *
 * @since 1.0.0
 */
export const createImageDataCopy: (imageData: ImageData) => Render<ImageData> = (data) => (ctx) => () =>
  ctx.createImageData(data)

/**
 * Render an image.
 *
 * @since 1.0.0
 */
export const drawImage: (
  imageSource: ImageSource,
  offsetX: number,
  offsetY: number
) => Render<CanvasRenderingContext2D> = (s, ox, oy) => (ctx) => () => {
  ctx.drawImage(s, ox, oy)
  return ctx
}

/**
 * Draws an image to the canvas.
 *
 * @since 1.0.0
 */
export const drawImageScale: (
  imageSource: ImageSource,
  offsetX: number,
  offsetY: number,
  width: number,
  height: number
) => Render<CanvasRenderingContext2D> = (s, ox, oy, w, h) => (ctx) => () => {
  ctx.drawImage(s, ox, oy, w, h)
  return ctx
}

/**
 * Draws an image to the canvas.
 *
 * @since 1.0.0
 */
export const drawImageFull: (
  imageSource: ImageSource,
  offsetX: number,
  offsetY: number,
  width: number,
  height: number,
  canvasOffsetX: number,
  canvasOffsetY: number,
  canvasImageWidth: number,
  canvasImageHeight: number
) => Render<CanvasRenderingContext2D> = (s, ox, oy, w, h, cox, coy, ciw, cih) => (ctx) => () => {
  ctx.drawImage(s, ox, oy, w, h, cox, coy, ciw, cih)
  return ctx
}

/**
 * Creates a new canvas pattern (repeatable image).
 *
 * @since 1.0.0
 */
export const createPattern: (
  imageSource: ImageSource,
  repetition: PatternRepetition
) => Render<O.Option<CanvasPattern>> = (s, r) => (ctx) => () => O.fromNullable(ctx.createPattern(s, r))

/**
 * Creates a linear `CanvasGradient` object.
 *
 * @since 1.0.0
 */
export const createLinearGradient: (x0: number, y0: number, x1: number, y1: number) => Render<CanvasGradient> = (
  x0,
  y0,
  x1,
  y1
) => (ctx) => () => ctx.createLinearGradient(x0, y0, x1, y1)

/**
 * Creates a radial `CanvasGradient` object.
 *
 * @since 1.0.0
 */
export const createRadialGradient: (
  x0: number,
  y0: number,
  r0: number,
  x1: number,
  y1: number,
  r1: number
) => Render<CanvasGradient> = (x0, y0, r0, x1, y1, r1) => (ctx) => () =>
  ctx.createRadialGradient(x0, y0, r0, x1, y1, r1)

/**
 * Add a single color stop to a `CanvasGradient` object.
 *
 * @since 1.0.0
 */
export const addColorStop: (offset: number, color: string) => Gradient<CanvasGradient> = (o, c) => (g) => () => {
  g.addColorStop(o, c)
  return g
}

/**
 * Draws a quadratic Bézier curve.d
 *
 * @since 1.0.0
 */
export const quadraticCurveTo: (cpx: number, cpy: number, x: number, y: number) => Render<CanvasRenderingContext2D> = (
  cpx,
  cpy,
  x,
  y
) => (ctx) => () => {
  ctx.quadraticCurveTo(cpx, cpy, x, y)
  return ctx
}

/**
 * Draw a cubic Bézier curve.
 *
 * @since 1.0.0
 */
export const bezierCurveTo: (
  cpx1: number,
  cpy1: number,
  cpx2: number,
  cpy2: number,
  x: number,
  y: number
) => Render<CanvasRenderingContext2D> = (cpx1, cpy1, cpx2, cpy2, x, y) => (ctx) => () => {
  ctx.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, x, y)
  return ctx
}
