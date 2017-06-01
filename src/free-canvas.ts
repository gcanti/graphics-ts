import * as free from 'fp-ts/lib/Free'
import * as canvas from './canvas'
import * as identity from 'fp-ts/lib/Identity'

export type ImageSource =
  | HTMLImageElement
  | HTMLCanvasElement
  | HTMLVideoElement

export class SetLineWidth {
  readonly _tag = 'SetLineWidth'
  constructor(
    public readonly width: number
  ) { }
}

export class SetFillStyle {
  readonly _tag = 'SetFillStyle'
  constructor(
    public readonly style: string
  ) { }
}

export class SetStrokeStyle {
  readonly _tag = 'SetStrokeStyle'
  constructor(
    public readonly style: string
  ) { }
}

export class SetShadowColor {
  readonly _tag = 'SetShadowColor'
  constructor(
    public readonly color: string
  ) { }
}

export class SetShadowBlur {
  readonly _tag = 'SetShadowBlur'
  constructor(
    public readonly blur: number
  ) { }
}

export class SetShadowOffsetX {
  readonly _tag = 'SetShadowOffsetX'
  constructor(
    public readonly offsetX: number
  ) { }
}

export class SetShadowOffsetY {
  readonly _tag = 'SetShadowOffsetY'
  constructor(
    public readonly offsetY: number
  ) { }
}

export class SetLineCap {
  readonly _tag = 'SetLineCap'
  constructor(
    public readonly cap: canvas.LineCap
  ) { }
}

export class SetComposite {
  readonly _tag = 'SetComposite'
  constructor(
    public readonly composite: canvas.Composite
  ) { }
}

export class SetAlpha {
  readonly _tag = 'SetAlpha'
  constructor(
    public readonly alpha: number
  ) { }
}

export class BeginPath {
  readonly _tag = 'BeginPath'
}

export class Stroke {
  readonly _tag = 'Stroke'
}

export class Fill {
  readonly _tag = 'Fill'
}

export class Clip {
  readonly _tag = 'Clip'
}

export class LineTo {
  readonly _tag = 'LineTo'
  constructor(
    public readonly x: number,
    public readonly y: number
  ) { }
}

export class MoveTo {
  readonly _tag = 'MoveTo'
  constructor(
    public readonly x: number,
    public readonly y: number
  ) { }
}

export class ClosePath {
  readonly _tag = 'ClosePath'
}

export class Arc {
  readonly _tag = 'Arc'
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly radius: number,
    public readonly start: number,
    public readonly end: number
  ) { }
}

export class Rect {
  readonly _tag = 'Rect'
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly width: number,
    public readonly height: number
  ) { }
}

export class FillRect {
  readonly _tag = 'FillRect'
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly width: number,
    public readonly height: number
  ) { }
}

export class StrokeRect {
  readonly _tag = 'StrokeRect'
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly width: number,
    public readonly height: number
  ) { }
}

export class ClearRect {
  readonly _tag = 'ClearRect'
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly width: number,
    public readonly height: number
  ) { }
}

export class Scale {
  readonly _tag = 'Scale'
  constructor(
    public readonly x: number,
    public readonly y: number
  ) { }
}

export class Rotate {
  readonly _tag = 'Rotate'
  constructor(
    public readonly angle: number
  ) { }
}

export class Translate {
  readonly _tag = 'Translate'
  constructor(
    public readonly x: number,
    public readonly y: number
  ) { }
}

export class Transform {
  readonly _tag = 'Transform'
  constructor(
    public readonly m11: number,
    public readonly m12: number,
    public readonly m21: number,
    public readonly m22: number,
    public readonly m31: number,
    public readonly m32: number
  ) { }
}

export class GetTextAlign {
  readonly _tag = 'GetTextAlign'
  readonly _A: canvas.TextAlign
}

export class SetTextAlign {
  readonly _tag = 'SetTextAlign'
  constructor(
    public readonly textAlign: canvas.TextAlign
  ) { }
}

export class GetFont {
  readonly _tag = 'GetFont'
  readonly _A: string
}

export class SetFont {
  readonly _tag = 'SetFont'
  constructor(
    public readonly font: string
  ) { }
}

export class FillText {
  readonly _tag = 'FillText'
  constructor(
    public readonly text: string,
    public readonly x: number,
    public readonly y: number
  ) { }
}

export class StrokeText {
  readonly _tag = 'StrokeText'
  constructor(
    public readonly text: string,
    public readonly x: number,
    public readonly y: number
  ) { }
}

export class MeasureText {
  readonly _tag = 'MeasureText'
  readonly _A: canvas.TextMetrics
  constructor(
    public readonly text: string
  ) { }
}

export class Save {
  readonly _tag = 'Save'
}

export class Restore {
  readonly _tag = 'Restore'
}

export class GetImageData {
  readonly _tag = 'GetImageData'
  readonly _A: ImageData
  constructor(
    public readonly sx: number,
    public readonly sy: number,
    public readonly sw: number,
    public readonly sh: number
  ) { }
}

export class PutImageData {
  readonly _tag = 'PutImageData'
  constructor(
    public readonly imageData: ImageData,
    public readonly dx: number,
    public readonly dy: number
  ) { }
}

export class PutImageDataFull {
  readonly _tag = 'PutImageDataFull'
  constructor(
    public readonly imageData: ImageData,
    public readonly dx: number,
    public readonly dy: number,
    public readonly dirtyX: number,
    public readonly dirtyY: number,
    public readonly dirtyWidth: number,
    public readonly dirtyHeight: number
  ) { }
}

export class CreateImageData {
  readonly _tag = 'CreateImageData'
  readonly _A: ImageData
  constructor(
    public readonly imageData: number | ImageData,
    public readonly sh: number
  ) { }
}

export class CreateImageDataCopy {
  readonly _tag = 'CreateImageDataCopy'
  readonly _A: ImageData
  constructor(
    public readonly imageData: ImageData
  ) { }
}

export class DrawImage {
  readonly _tag = 'DrawImage'
  constructor(
    public readonly imageSource: canvas.ImageSource,
    public readonly offsetX: number,
    public readonly offsetY: number
  ) { }
}

export class DrawImageScale {
  readonly _tag = 'DrawImageScale'
  constructor(
    public readonly imageSource: canvas.ImageSource,
    public readonly offsetX: number,
    public readonly offsetY: number,
    public readonly width: number,
    public readonly height: number
  ) { }
}

export class DrawImageFull {
  readonly _tag = 'DrawImageFull'
  constructor(
    public readonly imageSource: canvas.ImageSource,
    public readonly offsetX: number,
    public readonly offsetY: number,
    public readonly width: number,
    public readonly height: number,
    public readonly canvasOffsetX: number,
    public readonly canvasOffsetY: number,
    public readonly canvasImageWidth: number,
    public readonly canvasImageHeight: number
  ) { }
}

export type Canvas =
  | SetLineWidth
  | SetFillStyle
  | SetStrokeStyle
  | SetShadowColor
  | SetShadowBlur
  | SetShadowOffsetX
  | SetShadowOffsetY
  | SetLineCap
  | SetComposite
  | SetAlpha
  | BeginPath
  | Stroke
  | Fill
  | Clip
  | LineTo
  | MoveTo
  | ClosePath
  | Arc
  | Rect
  | FillRect
  | StrokeRect
  | ClearRect
  | Scale
  | Rotate
  | Translate
  | Transform
  | GetTextAlign
  | SetTextAlign
  | GetFont
  | SetFont
  | FillText
  | StrokeText
  | MeasureText
  | Save
  | Restore
  | GetImageData
  | PutImageData
  | PutImageDataFull
  | CreateImageData
  | CreateImageDataCopy
  | DrawImage
  | DrawImageScale
  | DrawImageFull

export const setLineWidth = (width: number) => free.liftF<Canvas, void>(new SetLineWidth(width))
export const setFillStyle = (style: string) => free.liftF<Canvas, void>(new SetFillStyle(style))
export const setStrokeStyle = (style: string) => free.liftF<Canvas, void>(new SetStrokeStyle(style))
export const setShadowColor = (color: string) => free.liftF<Canvas, void>(new SetShadowColor(color))
export const setShadowBlur = (blur: number) => free.liftF<Canvas, void>(new SetShadowBlur(blur))
export const setShadowOffsetX = (offsetX: number) => free.liftF<Canvas, void>(new SetShadowOffsetX(offsetX))
export const setShadowOffsetY = (offsetY: number) => free.liftF<Canvas, void>(new SetShadowOffsetY(offsetY))
export const setLineCap = (cap: canvas.LineCap) => free.liftF<Canvas, void>(new SetLineCap(cap))
export const setComposite = (compisite: canvas.Composite) => free.liftF<Canvas, void>(new SetComposite(compisite))
export const setAlpha = (alpha: number) => free.liftF<Canvas, void>(new SetAlpha(alpha))
export const beginPath = () => free.liftF<Canvas, void>(new BeginPath())
export const stroke = () => free.liftF<Canvas, void>(new Stroke())
export const fill = () => free.liftF<Canvas, void>(new Fill())
export const clip = () => free.liftF<Canvas, void>(new Clip())
export const lineTo = (x: number, y: number) => free.liftF<Canvas, void>(new LineTo(x, y))
export const moveTo = (x: number, y: number) => free.liftF<Canvas, void>(new MoveTo(x, y))
export const closePath = () => free.liftF<Canvas, void>(new ClosePath())
export const arc = (x: number, y: number, radius: number, start: number, end: number) => free.liftF<Canvas, void>(new Arc(x, y, radius, start, end))
export const rect = (x: number, y: number, width: number, height: number) => free.liftF<Canvas, void>(new Rect(x, y, width, height))
export const fillRect = (x: number, y: number, width: number, height: number) => free.liftF<Canvas, void>(new FillRect(x, y, width, height))
export const strokeRect = (x: number, y: number, width: number, height: number) => free.liftF<Canvas, void>(new StrokeRect(x, y, width, height))
export const clearRect = (x: number, y: number, width: number, height: number) => free.liftF<Canvas, void>(new ClearRect(x, y, width, height))
export const scale = (x: number, y: number) => free.liftF<Canvas, void>(new Scale(x, y))
export const rotate = (angle: number) => free.liftF<Canvas, void>(new Rotate(angle))
export const translate = (x: number, y: number) => free.liftF<Canvas, void>(new Translate(x, y))
export const transform = (m11: number, m12: number, m21: number, m22: number, m31: number, m32: number) => free.liftF<Canvas, void>(new Transform(m11, m12, m21, m22, m31, m32))
export const getTextAlign = () => free.liftF<Canvas, canvas.TextAlign>(new GetTextAlign())
export const setTextAlign = (textAlign: canvas.TextAlign) => free.liftF<Canvas, void>(new SetTextAlign(textAlign))
export const getFont = () => free.liftF<Canvas, string>(new GetFont())
export const setFont = (font: string) => free.liftF<Canvas, void>(new SetFont(font))
export const fillText = (text: string, x: number, y: number) => free.liftF<Canvas, void>(new FillText(text, x, y))
export const strokeText = (text: string, x: number, y: number) => free.liftF<Canvas, void>(new StrokeText(text, x, y))
export const measureText = (text: string) => free.liftF<Canvas, canvas.TextMetrics>(new MeasureText(text))
export const save = () => free.liftF<Canvas, void>(new Save())
export const restore = () => free.liftF<Canvas, void>(new Restore())
export const getImageData = (sx: number, sy: number, sw: number, sh: number) => free.liftF<Canvas, ImageData>(new GetImageData(sx, sy, sw, sh))
export const putImageData = (imageData: ImageData, dx: number, dy: number) => free.liftF<Canvas, void>(new PutImageData(imageData, dx, dy))
export const putImageDataFull = (imageData: ImageData, dx: number, dy: number, dirtyX: number, dirtyY: number, dirtyWidth: number, dirtyHeight: number) => free.liftF<Canvas, void>(new PutImageDataFull(imageData, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight))
export const createImageData = (imageData: number | ImageData, sh: number) => free.liftF<Canvas, ImageData>(new CreateImageData(imageData, sh))
export const createImageDataCopy = (imageData: ImageData) => free.liftF<Canvas, ImageData>(new CreateImageDataCopy(imageData))
export const drawImage = (imageSource: ImageSource, offsetX: number, offsetY: number) => free.liftF<Canvas, void>(new DrawImage(imageSource, offsetX, offsetY))
export const drawImageScale = (imageSource: ImageSource, offsetX: number, offsetY: number, width: number, height: number) => free.liftF<Canvas, void>(new DrawImageScale(imageSource, offsetX, offsetY, width, height))
export const drawImageFull = (imageSource: ImageSource, offsetX: number, offsetY: number, width: number, height: number, canvasOffsetX: number, canvasOffsetY: number, canvasImageWidth: number, canvasImageHeight: number) => free.liftF<Canvas, void>(new DrawImageFull(imageSource, offsetX, offsetY, width, height, canvasOffsetX, canvasOffsetY, canvasImageWidth, canvasImageHeight))

const undef = identity.of(undefined)

function getInterpretCanvas(ctx: CanvasRenderingContext2D): (fa: Canvas) => identity.Identity<TextMetrics | string | void> {
  return function interpretCanvas(fa: Canvas): identity.Identity<TextMetrics | string | void> {
    switch (fa._tag) {
      case 'BeginPath' :
        ctx.beginPath()
        return undef
      case 'ClosePath' :
        ctx.closePath()
        return undef
      case 'Fill' :
        ctx.fill()
        return undef
      case 'FillRect' :
        ctx.fillRect(fa.x, fa.y, fa.width, fa.height)
        return undef
      case 'MoveTo' :
        ctx.moveTo(fa.x, fa.y)
        return undef
      case 'LineTo' :
        ctx.lineTo(fa.x, fa.y)
        return undef
      case 'Restore' :
        ctx.restore()
        return undef
      case 'Rotate' :
        ctx.rotate(fa.angle)
        return undef
      case 'Save' :
        ctx.save()
        return undef
      case 'Scale' :
        ctx.scale(fa.x, fa.y)
        return undef
      case 'SetFillStyle' :
        ctx.fillStyle = fa.style
        return undef
      case 'SetLineWidth' :
        ctx.lineWidth = fa.width
        return undef
      case 'SetShadowBlur' :
        ctx.shadowBlur = fa.blur
        return undef
      case 'SetShadowColor' :
        ctx.shadowColor = fa.color
        return undef
      case 'SetShadowOffsetX' :
        ctx.shadowOffsetX = fa.offsetX
        return undef
      case 'SetShadowOffsetY' :
        ctx.shadowOffsetY = fa.offsetY
        return undef
      case 'StrokeText' :
        ctx.strokeText(fa.text, fa.x, fa.y)
        return undef
      case 'Translate' :
        ctx.translate(fa.x, fa.y)
        return undef
      case 'SetStrokeStyle' :
        ctx.strokeStyle = fa.style
        return undef
      case 'SetLineCap' :
        ctx.lineCap = fa.cap
        return undef
      case 'SetComposite' :
        ctx.globalCompositeOperation = fa.composite
        return undef
      case 'SetAlpha' :
        ctx.globalAlpha = fa.alpha
        return undef
      case 'Stroke' :
        ctx.stroke()
        return undef
      case 'Clip' :
        ctx.clip()
        return undef
      case 'Arc' :
        ctx.arc(fa.x, fa.y, fa.radius, fa.start, fa.end)
        return undef
      case 'Rect' :
        ctx.rect(fa.x, fa.y, fa.width, fa.height)
        return undef
      case 'StrokeRect' :
        ctx.strokeRect(fa.x, fa.y, fa.width, fa.height)
        return undef
      case 'ClearRect' :
        ctx.clearRect(fa.x, fa.y, fa.width, fa.height)
        return undef
      case 'Transform' :
        ctx.transform(fa.m11, fa.m12, fa.m21, fa.m22, fa.m31, fa.m32)
        return undef
      case 'GetTextAlign' :
        return identity.of(ctx.textAlign)
      case 'SetTextAlign' :
        ctx.textAlign = fa.textAlign
        return undef
      case 'GetFont' :
        return identity.of(ctx.font)
      case 'SetFont' :
        ctx.font = fa.font
        return undef
      case 'FillText' :
        ctx.fillText(fa.text, fa.x, fa.y)
        return undef
      case 'MeasureText' :
        return identity.of(ctx.measureText(fa.text))
      case 'GetImageData' :
        return identity.of(ctx.getImageData(fa.sx, fa.sy, fa.sw, fa.sh))
      case 'PutImageData' :
        ctx.putImageData(fa.imageData, fa.dx, fa.dy)
        return undef
      case 'PutImageDataFull' :
        ctx.putImageData(fa.imageData, fa.dx, fa.dy, fa.dirtyX, fa.dirtyY, fa.dirtyWidth, fa.dirtyHeight)
        return undef
      case 'CreateImageData' :
        ctx.createImageData(fa.imageData, fa.sh)
        return undef
      case 'CreateImageDataCopy' :
        return identity.of(ctx.createImageData(fa.imageData))
      case 'DrawImage' :
        ctx.drawImage(fa.imageSource, fa.offsetX, fa.offsetY)
        return undef
      case 'DrawImageScale' :
        ctx.drawImage(fa.imageSource, fa.offsetX, fa.offsetY, fa.width, fa.height)
        return undef
      case 'DrawImageFull' :
        ctx.drawImage(fa.imageSource, fa.offsetX, fa.offsetY, fa.width, fa.height, fa.canvasOffsetX, fa.canvasOffsetY, fa.canvasImageWidth, fa.canvasImageHeight)
        return undef
    }
  }
}

/** A convenience function: run the action, preserving the existing context */
export function withContext<A>(drawning: Drawing<A>): Drawing<A> {
  return save()
    .chain(() => drawning)
    .chain(a => restore().map(() => a))
}

export type Drawing<A> = free.Free<Canvas, A>

export function run<A>(drawing: Drawing<A>, ctx: CanvasRenderingContext2D): A {
  return drawing.foldMap(identity, (fa: Canvas) => getInterpretCanvas(ctx)(fa)).value
}
