// adapted from https://github.com/purescript-contrib/purescript-canvas

import { IO } from 'fp-ts/lib/IO'
import { Option, none, some } from 'fp-ts/lib/Option'

// tryLoadImage

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
export function setWidth(width: number, canvas: HTMLCanvasElement): IO<void> {
  return new IO(() => {
    canvas.width = width
  })
}

/** Set the canvas height in pixels */
export function setHeight(height: number, canvas: HTMLCanvasElement): IO<void> {
  return new IO(() => {
    canvas.height = height
  })
}

/** Canvas dimensions (width and height) in pixels */
export type Dimensions = {
  width: number,
  height: number
}

/** Get the canvas dimensions in pixels */
export function getDimensions(canvas: HTMLCanvasElement): IO<Dimensions> {
  return getWidth(canvas)
    .chain(width => getHeight(canvas)
      .map(height => ({ width, height })))
}

/** Set the canvas dimensions in pixels */
export function setDimensions(dimensions: Dimensions, canvas: HTMLCanvasElement): IO<void> {
  return setWidth(dimensions.width, canvas)
    .chain(() => setHeight(dimensions.height, canvas))
}

// canvasToDataURL

/** Set the current line width */
export function setLineWidth(width: number, ctx: CanvasRenderingContext2D): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.lineWidth = width
    return ctx
  })
}

/** Set the current fill style/color */
export function setFillStyle(style: string, ctx: CanvasRenderingContext2D): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.fillStyle = style
    return ctx
  })
}

/** Set the current stroke style/color */
export function setStrokeStyle(style: string, ctx: CanvasRenderingContext2D): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.strokeStyle = style
    return ctx
  })
}

/** Set the current shadow color */
export function setShadowColor(style: string, ctx: CanvasRenderingContext2D): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.shadowColor = style
    return ctx
  })
}

/** Set the current shadow blur radius */
export function setShadowBlur(blur: number, ctx: CanvasRenderingContext2D): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.shadowBlur = blur
    return ctx
  })
}

/** Set the current shadow x-offset */
export function setShadowOffsetX(offsetX: number, ctx: CanvasRenderingContext2D): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.shadowOffsetX = offsetX
    return ctx
  })
}

/** Set the current shadow y-offset */
export function setShadowOffsetY(offsetY: number, ctx: CanvasRenderingContext2D): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.shadowOffsetY = offsetY
    return ctx
  })
}

/** Set the current miter limit */
export function setMiterLimit(limit: number, ctx: CanvasRenderingContext2D): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.miterLimit = limit
    return ctx
  })
}

/** Enumerates the different types of line cap */
export type LineCap =
  | 'round'
  | 'square'
  | 'butt'

/** Set the current line cap type */
export function setLineCap(cap: LineCap, ctx: CanvasRenderingContext2D): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.lineCap = cap
    return ctx
  })
}

/** Enumerates the different types of line join */
export type LineJoin =
  | 'bevel'
  | 'round'
  | 'miter'

/** Set the current line join type */
export function setLineJoin(join: LineJoin, ctx: CanvasRenderingContext2D): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.lineJoin = join
    return ctx
  })
}

/** Enumerates the different types of composite operations and blend modes */
export type CompositeOperation =
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
export function setGlobalCompositeOperation(operation: CompositeOperation, ctx: CanvasRenderingContext2D): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.globalCompositeOperation = operation
    return ctx
  })
}

/** Set the current global alpha level */
export function setGlobalAlpha(alpha: number, ctx: CanvasRenderingContext2D): IO<CanvasRenderingContext2D> {
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
export function lineTo(x: number, y: number, ctx: CanvasRenderingContext2D): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.lineTo(x, y)
    return ctx
  })
}

/** Move the path to the specified coordinates, without drawing a line segment */
export function moveTo(x: number, y: number, ctx: CanvasRenderingContext2D): IO<CanvasRenderingContext2D> {
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
export function strokePath<A>(path: IO<A>, ctx: CanvasRenderingContext2D): IO<A> {
  return beginPath(ctx)
    .chain(() => path)
    .chain(a => stroke(ctx).map(() => a))
}

/** A convenience function for drawing a filled path */
export function fillPath<A>(path: IO<A>, ctx: CanvasRenderingContext2D): IO<A> {
  return beginPath(ctx)
    .chain(() => path)
    .chain(a => fill(ctx).map(() => a))
}

/**
 * A type representing an arc object:
 * The center coordinates `x` and `y`,
 * The radius `r`,
 * The starting and ending angles, `start` and `end`
 */
export type Arc = {
  x: number,
  y: number,
  radius: number,
  start: number,
  end: number
}

/** Render an arc object */
export function arc(a: Arc, ctx: CanvasRenderingContext2D): IO<CanvasRenderingContext2D> {
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
  x: number,
  y: number,
  width: number,
  height: number
}

/** Render a rectangle */
export function rect(r: Rectangle, ctx: CanvasRenderingContext2D): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.rect(r.x, r.y, r.width, r.height)
    return ctx
  })
}

/** Fill a rectangle */
export function fillRect(r: Rectangle, ctx: CanvasRenderingContext2D): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.fillRect(r.x, r.y, r.width, r.height)
    return ctx
  })
}

/** Stroke a rectangle */
export function strokeRect(r: Rectangle, ctx: CanvasRenderingContext2D): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.strokeRect(r.x, r.y, r.width, r.height)
    return ctx
  })
}

/** Clear a rectangle */
export function clearRect(r: Rectangle, ctx: CanvasRenderingContext2D): IO<CanvasRenderingContext2D> {
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
  scaleX: number,
  scaleY: number
}

/** Apply a scaling transform */
export function scale(t: ScaleTransform, ctx: CanvasRenderingContext2D): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.scale(t.scaleX, t.scaleY)
    return ctx
  })
}

/** Apply a rotation */
export function rotate(angle: number, ctx: CanvasRenderingContext2D): IO<CanvasRenderingContext2D> {
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
  translateX: number,
  translateY: number
}

/** Apply a translation */
export function translate(t: TranslateTransform, ctx: CanvasRenderingContext2D): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.translate(t.translateX, t.translateY)
    return ctx
  })
}

/** An object representing a general transformation as a homogeneous matrix */
export type Transform = {
  m11: number,
  m12: number,
  m21: number,
  m22: number,
  m31: number,
  m32: number
}

/** Apply a general transformation */
export function transform(t: Transform, ctx: CanvasRenderingContext2D): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.transform(t.m11, t.m12, t.m21, t.m22, t.m31, t.m32)
    return ctx
  })
}

export type TextAlign =
 | 'left'
 | 'right'
 | 'center'
 | 'start'
 | 'end'

/** Get the current text alignment */
export function getTextAlign(ctx: CanvasRenderingContext2D): IO<TextAlign> {
  return new IO(() => ctx.textAlign as TextAlign)
}

/** Set the current text alignment */
export function setTextAlign(textAlign: TextAlign, ctx: CanvasRenderingContext2D): IO<CanvasRenderingContext2D> {
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
export function setFont(font: string, ctx: CanvasRenderingContext2D): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.font = font
    return ctx
  })
}

/** Fill some text */
export function fillText(text: string, x: number, y: number, ctx: CanvasRenderingContext2D): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.fillText(text, x, y)
    return ctx
  })
}

/** Stroke some text */
export function strokeText(text: string, x: number, y: number, ctx: CanvasRenderingContext2D): IO<CanvasRenderingContext2D> {
  return new IO(() => {
    ctx.strokeText(text, x, y)
    return ctx
  })
}

/** Measure some text */
export function measureText(text: string, ctx: CanvasRenderingContext2D): IO<CanvasRenderingContext2D> {
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
  return save(ctx)
    .chain(() => action)
    .chain(a => restore(ctx).map(() => a))
}

// getImageData

// putImageDataFull

// putImageData

// createImageData

// createImageDataCopy

// imageDataWidth

// imageDataHeight

// imageDataBuffer

// drawImage

// drawImageScale

// drawImageFull

// createPattern

// setPatternFillStyle

// createLinearGradient

// createRadialGradient

// addColorStop

// setGradientFillStyle

// quadraticCurveTo

// bezierCurveTo
