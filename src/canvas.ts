// adapted from https://github.com/purescript-contrib/purescript-canvas

import { IO } from 'fp-ts/lib/IO'
import { Option, none, some } from 'fp-ts/lib/Option'

export type ImageSource = HTMLImageElement | HTMLCanvasElement | HTMLVideoElement

export function unsafeGetCanvasElementById(elementId: string): HTMLCanvasElement {
  return document.getElementById(elementId) as HTMLCanvasElement
}

/** Get a canvas element by ID, or `None` if the element does not exist or is not a canvas */
export function getCanvasElementById(elementId: string): IO<Option<HTMLCanvasElement>> {
  return new IO(() => {
    const canvas = document.getElementById(elementId)
    if (canvas && canvas instanceof HTMLCanvasElement) {
      return some(canvas)
    }
    return none
  })
}

export function unsafeGetContext2D(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  return canvas.getContext('2d') as CanvasRenderingContext2D
}

/** Get the 2D graphics context for a canvas element */
export function getContext2D(canvas: HTMLCanvasElement): IO<CanvasRenderingContext2D> {
  return new IO(() => unsafeGetContext2D(canvas))
}

/** Get the canvas width in pixels */
export function getWidth(canvas: HTMLCanvasElement): IO<number> {
  return new IO(() => canvas.width)
}

/** Get the canvas height in pixels */
export function getHeight(canvas: HTMLCanvasElement): IO<number> {
  return new IO(() => canvas.height)
}

/** Set the canvas width in pixels */
export function setWidth(canvas: HTMLCanvasElement, width: number): IO<void> {
  return new IO(() => {
    canvas.width = width
  })
}

/** Set the canvas height in pixels */
export function setHeight(canvas: HTMLCanvasElement, height: number): IO<void> {
  return new IO(() => {
    canvas.height = height
  })
}

/** Canvas dimensions (width and height) in pixels */
export type Dimensions = {
  width: number
  height: number
}

/** Get the canvas dimensions in pixels */
export function getDimensions(canvas: HTMLCanvasElement): IO<Dimensions> {
  return getWidth(canvas).chain(width => getHeight(canvas).map(height => ({ width, height })))
}

/** Set the canvas dimensions in pixels */
export function setDimensions(canvas: HTMLCanvasElement, dimensions: Dimensions): IO<void> {
  return setWidth(canvas, dimensions.width).chain(() => setHeight(canvas, dimensions.height))
}

/** Create a data URL for the current canvas contents */
export function toDataURL(canvas: HTMLCanvasElement): IO<string> {
  return new IO(() => canvas.toDataURL())
}

/** Set the current line width */
export function setLineWidth(ctx: CanvasRenderingContext2D, width: number): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.lineWidth = width
    return ctx
  })
}

/** Set the current fill style/color */
export function setFillStyle(ctx: CanvasRenderingContext2D, style: string): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.fillStyle = style
    return ctx
  })
}

/** Set the current stroke style/color */
export function setStrokeStyle(ctx: CanvasRenderingContext2D, style: string): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.strokeStyle = style
    return ctx
  })
}

/** Set the current shadow color */
export function setShadowColor(ctx: CanvasRenderingContext2D, style: string): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.shadowColor = style
    return ctx
  })
}

/** Set the current shadow blur radius */
export function setShadowBlur(ctx: CanvasRenderingContext2D, blur: number): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.shadowBlur = blur
    return ctx
  })
}

/** Set the current shadow x-offset */
export function setShadowOffsetX(ctx: CanvasRenderingContext2D, offsetX: number): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.shadowOffsetX = offsetX
    return ctx
  })
}

/** Set the current shadow y-offset */
export function setShadowOffsetY(ctx: CanvasRenderingContext2D, offsetY: number): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.shadowOffsetY = offsetY
    return ctx
  })
}

/** Set the current miter limit */
export function setMiterLimit(ctx: CanvasRenderingContext2D, limit: number): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.miterLimit = limit
    return ctx
  })
}

/** Enumerates the different types of line cap */
export type LineCap = 'round' | 'square' | 'butt'

/** Set the current line cap type */
export function setLineCap(ctx: CanvasRenderingContext2D, cap: LineCap): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.lineCap = cap
    return ctx
  })
}

/** Enumerates the different types of line join */
export type LineJoin = 'bevel' | 'round' | 'miter'

/** Set the current line join type */
export function setLineJoin(ctx: CanvasRenderingContext2D, join: LineJoin): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.lineJoin = join
    return ctx
  })
}

/** Enumerates the different types of composite operations and blend modes */
export type Composite =
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

/** Set the current composite operation */
export function setGlobalCompositeOperation(
  ctx: CanvasRenderingContext2D,
  operation: Composite
): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.globalCompositeOperation = operation
    return ctx
  })
}

/** Set the current global alpha level */
export function setGlobalAlpha(ctx: CanvasRenderingContext2D, alpha: number): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.globalAlpha = alpha
    return ctx
  })
}

/** Begin a path object */
export function beginPath(ctx: CanvasRenderingContext2D): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.beginPath()
    return ctx
  })
}

/** Stroke the current object */
export function stroke(ctx: CanvasRenderingContext2D): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.stroke()
    return ctx
  })
}

/** Fill the current object */
export function fill(ctx: CanvasRenderingContext2D): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.fill()
    return ctx
  })
}

/** Clip the current object */
export function clip(ctx: CanvasRenderingContext2D): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.clip()
    return ctx
  })
}

// Move the path to the specified coordinates, drawing a line segment
export function lineTo(ctx: CanvasRenderingContext2D, x: number, y: number): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.lineTo(x, y)
    return ctx
  })
}

/** Move the path to the specified coordinates, without drawing a line segment */
export function moveTo(ctx: CanvasRenderingContext2D, x: number, y: number): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.moveTo(x, y)
    return ctx
  })
}

/** Close the current path */
export function closePath(ctx: CanvasRenderingContext2D): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.closePath()
    return ctx
  })
}

/** A convenience function for drawing a stroked path */
export function strokePath<A>(ctx: CanvasRenderingContext2D, path: IO<A>): IO<A> {
  return beginPath(ctx).chain(() => path).chain(a => stroke(ctx).map(() => a))
}

/** A convenience function for drawing a filled path */
export function fillPath<A>(ctx: CanvasRenderingContext2D, path: IO<A>): IO<A> {
  return beginPath(ctx).chain(() => path).chain(a => fill(ctx).map(() => a))
}

/**
 * A type representing an arc object:
 * The center coordinates `x` and `y`,
 * The radius `r`,
 * The starting and ending angles, `start` and `end`
 */
export type Arc = {
  x: number
  y: number
  radius: number
  start: number
  end: number
}

/** Render an arc object */
export function arc(ctx: CanvasRenderingContext2D, a: Arc): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.arc(a.x, a.y, a.radius, a.start, a.end)
    return ctx
  })
}

/**
 * A type representing a rectangle object:
 * The top-left corner coordinates `x` and `y`,
 * The width and height `w` and `h`
 */
export type Rectangle = {
  x: number
  y: number
  width: number
  height: number
}

/** Render a rectangle */
export function rect(ctx: CanvasRenderingContext2D, r: Rectangle): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.rect(r.x, r.y, r.width, r.height)
    return ctx
  })
}

/** Fill a rectangle */
export function fillRect(ctx: CanvasRenderingContext2D, r: Rectangle): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.fillRect(r.x, r.y, r.width, r.height)
    return ctx
  })
}

/** Stroke a rectangle */
export function strokeRect(ctx: CanvasRenderingContext2D, r: Rectangle): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.strokeRect(r.x, r.y, r.width, r.height)
    return ctx
  })
}

/** Clear a rectangle */
export function clearRect(ctx: CanvasRenderingContext2D, r: Rectangle): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.clearRect(r.x, r.y, r.width, r.height)
    return ctx
  })
}

/**
 * An object representing a scaling transform:
 * The scale factors in the `x` and `y` directions, `scaleX` and `scaleY`
 */
export type ScaleTransform = {
  scaleX: number
  scaleY: number
}

/** Apply a scaling transform */
export function scale(ctx: CanvasRenderingContext2D, t: ScaleTransform): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.scale(t.scaleX, t.scaleY)
    return ctx
  })
}

/** Apply a rotation */
export function rotate(ctx: CanvasRenderingContext2D, angle: number): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.rotate(angle)
    return ctx
  })
}

/**
 * An object representing a translation:
 * The translation amounts in the `x` and `y` directions, `translateX` and `translateY`
 */
export type TranslateTransform = {
  translateX: number
  translateY: number
}

/** Apply a translation */
export function translate(ctx: CanvasRenderingContext2D, t: TranslateTransform): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.translate(t.translateX, t.translateY)
    return ctx
  })
}

/** An object representing a general transformation as a homogeneous matrix */
export type Transform = {
  m11: number
  m12: number
  m21: number
  m22: number
  m31: number
  m32: number
}

/** Apply a general transformation */
export function transform(ctx: CanvasRenderingContext2D, t: Transform): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.transform(t.m11, t.m12, t.m21, t.m22, t.m31, t.m32)
    return ctx
  })
}

export type TextAlign = 'left' | 'right' | 'center' | 'start' | 'end'

/** Get the current text alignment */
export function getTextAlign(ctx: CanvasRenderingContext2D): IO<TextAlign> {
  return new IO(() => ctx.textAlign as TextAlign)
}

/** Set the current text alignment */
export function setTextAlign(ctx: CanvasRenderingContext2D, textAlign: TextAlign): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.textAlign = textAlign
    return ctx
  })
}

/**
 * Text metrics:
 * The text width in pixels
 */
export type TextMetrics = {
  width: number
}

/** Get the current font */
export function getFont(ctx: CanvasRenderingContext2D): IO<string> {
  return new IO(() => ctx.font)
}

/** Set the current font */
export function setFont(ctx: CanvasRenderingContext2D, font: string): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.font = font
    return ctx
  })
}

/** Fill some text */
export function fillText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number
): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.fillText(text, x, y)
    return ctx
  })
}

/** Stroke some text */
export function strokeText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number
): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.strokeText(text, x, y)
    return ctx
  })
}

/** Measure some text */
export function measureText(ctx: CanvasRenderingContext2D, text: string): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.measureText(text)
    return ctx
  })
}

/** Save the current context */
export function save(ctx: CanvasRenderingContext2D): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.save()
    return ctx
  })
}

/** Restore the previous context */
export function restore(ctx: CanvasRenderingContext2D): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.restore()
    return ctx
  })
}

/** A convenience function: run the action, preserving the existing context */
export function withContext<A>(ctx: CanvasRenderingContext2D, action: IO<A>): IO<A> {
  return save(ctx).chain(() => action).chain(a => restore(ctx).map(() => a))
}

/** Get image data for a portion of the canvas */
export function getImageData(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number): IO<ImageData> {
  return new IO(() => ctx.getImageData(x, y, w, h))
}

/** Set image data for a portion of the canvas */
export function putImageData(
  ctx: CanvasRenderingContext2D,
  imageData: ImageData,
  dx: number,
  dy: number
): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.putImageData(imageData, dx, dy)
    return ctx
  })
}

/** Set image data for a portion of the canvas */
export function putImageDataFull(
  ctx: CanvasRenderingContext2D,
  imageData: ImageData,
  dx: number,
  dy: number,
  dirtyX: number,
  dirtyY: number,
  dirtyWidth: number,
  dirtyHeight: number
): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.putImageData(imageData, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight)
    return ctx
  })
}

/** Create an image data object */
export function createImageData(ctx: CanvasRenderingContext2D, sw: number, sh: number): IO<ImageData> {
  return new IO(() => ctx.createImageData(sw, sh))
}

/** Create a copy of an image data object */
export function createImageDataCopy(ctx: CanvasRenderingContext2D, imageData: ImageData): IO<ImageData> {
  return new IO(() => ctx.createImageData(imageData))
}

export function drawImage(
  ctx: CanvasRenderingContext2D,
  imageSource: ImageSource,
  offsetX: number,
  offsetY: number
): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.drawImage(imageSource, offsetX, offsetY)
    return ctx
  })
}

export function drawImageScale(
  ctx: CanvasRenderingContext2D,
  imageSource: ImageSource,
  offsetX: number,
  offsetY: number,
  width: number,
  height: number
): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.drawImage(imageSource, offsetX, offsetY, width, height)
    return ctx
  })
}

export function drawImageFull(
  ctx: CanvasRenderingContext2D,
  imageSource: ImageSource,
  offsetX: number,
  offsetY: number,
  width: number,
  height: number,
  canvasOffsetX: number,
  canvasOffsetY: number,
  canvasImageWidth: number,
  canvasImageHeight: number
): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.drawImage(
      imageSource,
      offsetX,
      offsetY,
      width,
      height,
      canvasOffsetX,
      canvasOffsetY,
      canvasImageWidth,
      canvasImageHeight
    )
    return ctx
  })
}

export type PatternRepeat = 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat'

/** Create a new canvas pattern (repeatable image) */
export function createPattern(
  ctx: CanvasRenderingContext2D,
  imageSource: ImageSource,
  repetition: PatternRepeat
): IO<CanvasPattern> {
  return new IO(() => ctx.createPattern(imageSource, repetition))
}

/** Set the Context2D fillstyle to the CanvasPattern */
export function setPatternFillStyle(
  ctx: CanvasRenderingContext2D,
  pattern: CanvasPattern
): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.fillStyle = pattern
    return ctx
  })
}

/**
 * A type representing a linear gradient
 * -  Starting point coordinates: (`x0`, `y0`)
 * -  Ending point coordinates: (`x1`, `y1`)
 */
export type LinearGradient = {
  x0: number
  y0: number
  x1: number
  y1: number
}

/** Create a linear CanvasGradient */
export function createLinearGradient(ctx: CanvasRenderingContext2D, gradient: LinearGradient): IO<CanvasGradient> {
  return new IO(() => ctx.createLinearGradient(gradient.x0, gradient.y0, gradient.x1, gradient.y1))
}

/**
 * A type representing a radial gradient.
 * -  Starting circle center coordinates: (`x0`, `y0`)
 * -  Starting circle radius: `r0`
 * -  Ending circle center coordinates: (`x1`, `y1`)
 * -  Ending circle radius: `r1`
 */
export type RadialGradient = {
  x0: number
  y0: number
  r0: number
  x1: number
  y1: number
  r1: number
}

/** Create a radial CanvasGradient */
export function createRadialGradient(ctx: CanvasRenderingContext2D, gradient: RadialGradient): IO<CanvasGradient> {
  return new IO(() =>
    ctx.createRadialGradient(gradient.x0, gradient.y0, gradient.r0, gradient.x1, gradient.y1, gradient.r1)
  )
}

/** Add a single color stop to a CanvasGradient */
export function addColorStop(
  ctx: CanvasRenderingContext2D,
  offset: number,
  color: string,
  gradient: CanvasGradient
): IO<CanvasGradient> {
  return new IO(() => {
    gradient.addColorStop(offset, color)
    return gradient
  })
}

/** Set the Context2D fillstyle to the CanvasGradient */
export function setGradientFillStyle(
  ctx: CanvasRenderingContext2D,
  gradient: CanvasGradient
): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.fillStyle = gradient
    return ctx
  })
}

/**
 * A type representing a quadratic Bézier curve
 * - Bézier control point: (`cpx`, `cpy`)
 * - Ending point coordinates: (`x`, `y`)
 */
export type QuadraticCurve = {
  cpx: number
  cpy: number
  x: number
  y: number
}

/** Draw a quadratic Bézier curve */
export function quadraticCurveTo(ctx: CanvasRenderingContext2D, curve: QuadraticCurve): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.quadraticCurveTo(curve.cpx, curve.cpy, curve.x, curve.y)
    return ctx
  })
}

/**
 * A type representing a cubic Bézier curve
 * - First Bézier control point: (`cp1x`, `cp1y`)
 * - Second Bézier control point: (`cp2x`, `cp2y`)
 * - Ending point: (`x`, `y`)
 */
export type BezierCurve = {
  cp1x: number
  cp1y: number
  cp2x: number
  cp2y: number
  x: number
  y: number
}

/** Draw a cubic Bézier curve */
export function bezierCurveTo(ctx: CanvasRenderingContext2D, curve: BezierCurve): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.bezierCurveTo(curve.cp1x, curve.cp1y, curve.cp2x, curve.cp2y, curve.x, curve.y)
    return ctx
  })
}
