import * as free from 'fp-ts/lib/Free'
import * as canvas from './canvas'
import * as identity from 'fp-ts/lib/Identity'
import { HKT } from 'fp-ts/lib/HKT'

export type ImageSource = HTMLImageElement | HTMLCanvasElement | HTMLVideoElement

export const URI = 'Canvas'

export type URI = typeof URI

export class SetLineWidth<A> {
  readonly _tag: 'SetLineWidth' = 'SetLineWidth'
  readonly _A: A
  readonly _URI = URI
  constructor(public readonly width: number, public readonly more: A) {}
}

export class SetFillStyle<A> {
  readonly _tag: 'SetFillStyle' = 'SetFillStyle'
  readonly _A: A
  readonly _URI = URI
  constructor(public readonly style: string, public readonly more: A) {}
}

export class SetStrokeStyle<A> {
  readonly _tag: 'SetStrokeStyle' = 'SetStrokeStyle'
  readonly _A: A
  readonly _URI = URI
  constructor(public readonly style: string, public readonly more: A) {}
}

export class SetShadowColor<A> {
  readonly _tag: 'SetShadowColor' = 'SetShadowColor'
  readonly _A: A
  readonly _URI = URI
  constructor(public readonly color: string, public readonly more: A) {}
}

export class SetShadowBlur<A> {
  readonly _tag: 'SetShadowBlur' = 'SetShadowBlur'
  readonly _A: A
  readonly _URI = URI
  constructor(public readonly blur: number, public readonly more: A) {}
}

export class SetShadowOffsetX<A> {
  readonly _tag: 'SetShadowOffsetX' = 'SetShadowOffsetX'
  readonly _A: A
  readonly _URI = URI
  constructor(public readonly offsetX: number, public readonly more: A) {}
}

export class SetShadowOffsetY<A> {
  readonly _tag: 'SetShadowOffsetY' = 'SetShadowOffsetY'
  readonly _A: A
  readonly _URI = URI
  constructor(public readonly offsetY: number, public readonly more: A) {}
}

export class SetLineCap<A> {
  readonly _tag: 'SetLineCap' = 'SetLineCap'
  readonly _A: A
  readonly _URI = URI
  constructor(public readonly cap: canvas.LineCap, public readonly more: A) {}
}

export class SetComposite<A> {
  readonly _tag: 'SetComposite' = 'SetComposite'
  readonly _A: A
  readonly _URI = URI
  constructor(public readonly composite: canvas.Composite, public readonly more: A) {}
}

export class SetAlpha<A> {
  readonly _tag: 'SetAlpha' = 'SetAlpha'
  readonly _A: A
  readonly _URI = URI
  constructor(public readonly alpha: number, public readonly more: A) {}
}

export class BeginPath<A> {
  readonly _tag: 'BeginPath' = 'BeginPath'
  readonly _A: A
  readonly _URI = URI
  constructor(public readonly more: A) {}
}

export class Stroke<A> {
  readonly _tag: 'Stroke' = 'Stroke'
  readonly _A: A
  readonly _URI = URI
  constructor(public readonly more: A) {}
}

export class Fill<A> {
  readonly _tag: 'Fill' = 'Fill'
  readonly _A: A
  readonly _URI = URI
  constructor(public readonly more: A) {}
}

export class Clip<A> {
  readonly _tag: 'Clip' = 'Clip'
  readonly _A: A
  readonly _URI = URI
  constructor(public readonly more: A) {}
}

export class LineTo<A> {
  readonly _tag: 'LineTo' = 'LineTo'
  readonly _A: A
  readonly _URI = URI
  constructor(public readonly x: number, public readonly y: number, public readonly more: A) {}
}

export class MoveTo<A> {
  readonly _tag: 'MoveTo' = 'MoveTo'
  readonly _A: A
  readonly _URI = URI
  constructor(public readonly x: number, public readonly y: number, public readonly more: A) {}
}

export class ClosePath<A> {
  readonly _tag: 'ClosePath' = 'ClosePath'
  readonly _A: A
  readonly _URI = URI
  constructor(public readonly more: A) {}
}

export class Arc<A> {
  readonly _tag: 'Arc' = 'Arc'
  readonly _A: A
  readonly _URI = URI
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly radius: number,
    public readonly start: number,
    public readonly end: number,
    public readonly more: A
  ) {}
}

export class Rect<A> {
  readonly _tag: 'Rect' = 'Rect'
  readonly _A: A
  readonly _URI = URI
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly width: number,
    public readonly height: number,
    public readonly more: A
  ) {}
}

export class FillRect<A> {
  readonly _tag: 'FillRect' = 'FillRect'
  readonly _A: A
  readonly _URI = URI
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly width: number,
    public readonly height: number,
    public readonly more: A
  ) {}
}

export class StrokeRect<A> {
  readonly _tag: 'StrokeRect' = 'StrokeRect'
  readonly _A: A
  readonly _URI = URI
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly width: number,
    public readonly height: number,
    public readonly more: A
  ) {}
}

export class ClearRect<A> {
  readonly _tag: 'ClearRect' = 'ClearRect'
  readonly _A: A
  readonly _URI = URI
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly width: number,
    public readonly height: number,
    public readonly more: A
  ) {}
}

export class Scale<A> {
  readonly _tag: 'Scale' = 'Scale'
  readonly _A: A
  readonly _URI = URI
  constructor(public readonly x: number, public readonly y: number, public readonly more: A) {}
}

export class Rotate<A> {
  readonly _tag: 'Rotate' = 'Rotate'
  readonly _A: A
  readonly _URI = URI
  constructor(public readonly angle: number, public readonly more: A) {}
}

export class Translate<A> {
  readonly _tag: 'Translate' = 'Translate'
  readonly _A: A
  readonly _URI = URI
  constructor(public readonly x: number, public readonly y: number, public readonly more: A) {}
}

export class Transform<A> {
  readonly _tag: 'Transform' = 'Transform'
  readonly _A: A
  readonly _URI = URI
  constructor(
    public readonly m11: number,
    public readonly m12: number,
    public readonly m21: number,
    public readonly m22: number,
    public readonly m31: number,
    public readonly m32: number,
    public readonly more: A
  ) {}
}

export class GetTextAlign<A> {
  readonly _tag: 'GetTextAlign' = 'GetTextAlign'
  readonly _A: A
  readonly _URI = URI
  constructor(public readonly more: (textAlign: canvas.TextAlign) => A) {}
}

export class SetTextAlign<A> {
  readonly _tag: 'SetTextAlign' = 'SetTextAlign'
  readonly _A: A
  readonly _URI = URI
  constructor(public readonly textAlign: canvas.TextAlign, public readonly more: A) {}
}

export class GetFont<A> {
  readonly _tag: 'GetFont' = 'GetFont'
  readonly _A: A
  readonly _URI = URI
  constructor(public readonly more: (font: string) => A) {}
}

export class SetFont<A> {
  readonly _tag: 'SetFont' = 'SetFont'
  readonly _A: A
  readonly _URI = URI
  constructor(public readonly font: string, public readonly more: A) {}
}

export class FillText<A> {
  readonly _tag: 'FillText' = 'FillText'
  readonly _A: A
  readonly _URI = URI
  constructor(
    public readonly text: string,
    public readonly x: number,
    public readonly y: number,
    public readonly more: A
  ) {}
}

export class StrokeText<A> {
  readonly _tag: 'StrokeText' = 'StrokeText'
  readonly _A: A
  readonly _URI = URI
  constructor(
    public readonly text: string,
    public readonly x: number,
    public readonly y: number,
    public readonly more: A
  ) {}
}

export class MeasureText<A> {
  readonly _tag: 'MeasureText' = 'MeasureText'
  readonly _A: A
  readonly _URI = URI
  constructor(public readonly text: string, public readonly more: (textMetrics: canvas.TextMetrics) => A) {}
}

export class Save<A> {
  readonly _tag: 'Save' = 'Save'
  readonly _A: A
  readonly _URI = URI
  constructor(public readonly more: A) {}
}

export class Restore<A> {
  readonly _tag: 'Restore' = 'Restore'
  readonly _A: A
  readonly _URI = URI
  constructor(public readonly more: A) {}
}

export class GetImageData<A> {
  readonly _tag: 'GetImageData' = 'GetImageData'
  readonly _A: A
  readonly _URI = URI
  constructor(
    public readonly sx: number,
    public readonly sy: number,
    public readonly sw: number,
    public readonly sh: number,
    public readonly more: (imageData: ImageData) => A
  ) {}
}

export class PutImageData<A> {
  readonly _tag: 'PutImageData' = 'PutImageData'
  readonly _A: A
  readonly _URI = URI
  constructor(
    public readonly imageData: ImageData,
    public readonly dx: number,
    public readonly dy: number,
    public readonly more: A
  ) {}
}

export class PutImageDataFull<A> {
  readonly _tag: 'PutImageDataFull' = 'PutImageDataFull'
  readonly _A: A
  readonly _URI = URI
  constructor(
    public readonly imageData: ImageData,
    public readonly dx: number,
    public readonly dy: number,
    public readonly dirtyX: number,
    public readonly dirtyY: number,
    public readonly dirtyWidth: number,
    public readonly dirtyHeight: number,
    public readonly more: A
  ) {}
}

export class CreateImageData<A> {
  readonly _tag: 'CreateImageData' = 'CreateImageData'
  readonly _A: A
  readonly _URI = URI
  constructor(
    public readonly imageData: number | ImageData,
    public readonly sh: number,
    public readonly more: (imageData: ImageData) => A
  ) {}
}

export class CreateImageDataCopy<A> {
  readonly _tag: 'CreateImageDataCopy' = 'CreateImageDataCopy'
  readonly _A: A
  readonly _URI = URI
  constructor(public readonly imageData: ImageData, public readonly more: (imageData: ImageData) => A) {}
}

export class DrawImage<A> {
  readonly _tag: 'DrawImage' = 'DrawImage'
  readonly _A: A
  readonly _URI = URI
  constructor(
    public readonly imageSource: canvas.ImageSource,
    public readonly offsetX: number,
    public readonly offsetY: number,
    public readonly more: A
  ) {}
}

export class DrawImageScale<A> {
  readonly _tag: 'DrawImageScale' = 'DrawImageScale'
  readonly _A: A
  readonly _URI = URI
  constructor(
    public readonly imageSource: canvas.ImageSource,
    public readonly offsetX: number,
    public readonly offsetY: number,
    public readonly width: number,
    public readonly height: number,
    public readonly more: A
  ) {}
}

export class DrawImageFull<A> {
  readonly _tag: 'DrawImageFull' = 'DrawImageFull'
  readonly _A: A
  readonly _URI = URI
  constructor(
    public readonly imageSource: canvas.ImageSource,
    public readonly offsetX: number,
    public readonly offsetY: number,
    public readonly width: number,
    public readonly height: number,
    public readonly canvasOffsetX: number,
    public readonly canvasOffsetY: number,
    public readonly canvasImageWidth: number,
    public readonly canvasImageHeight: number,
    public readonly more: A
  ) {}
}

export type Canvas<A> =
  | SetLineWidth<A>
  | SetFillStyle<A>
  | SetStrokeStyle<A>
  | SetShadowColor<A>
  | SetShadowBlur<A>
  | SetShadowOffsetX<A>
  | SetShadowOffsetY<A>
  | SetLineCap<A>
  | SetComposite<A>
  | SetAlpha<A>
  | BeginPath<A>
  | Stroke<A>
  | Fill<A>
  | Clip<A>
  | LineTo<A>
  | MoveTo<A>
  | ClosePath<A>
  | Arc<A>
  | Rect<A>
  | FillRect<A>
  | StrokeRect<A>
  | ClearRect<A>
  | Scale<A>
  | Rotate<A>
  | Translate<A>
  | Transform<A>
  | GetTextAlign<A>
  | SetTextAlign<A>
  | GetFont<A>
  | SetFont<A>
  | FillText<A>
  | StrokeText<A>
  | MeasureText<A>
  | Save<A>
  | Restore<A>
  | GetImageData<A>
  | PutImageData<A>
  | PutImageDataFull<A>
  | CreateImageData<A>
  | CreateImageDataCopy<A>
  | DrawImage<A>
  | DrawImageScale<A>
  | DrawImageFull<A>

export const setLineWidth = (width: number) => free.liftF(new SetLineWidth(width, undefined))

export const setFillStyle = (style: string) => free.liftF(new SetFillStyle(style, undefined))

export const setStrokeStyle = (style: string) => free.liftF(new SetStrokeStyle(style, undefined))

export const setShadowColor = (color: string) => free.liftF(new SetShadowColor(color, undefined))

export const setShadowBlur = (blur: number) => free.liftF(new SetShadowBlur(blur, undefined))

export const setShadowOffsetX = (offsetX: number) => free.liftF(new SetShadowOffsetX(offsetX, undefined))

export const setShadowOffsetY = (offsetY: number) => free.liftF(new SetShadowOffsetY(offsetY, undefined))

export const setLineCap = (cap: canvas.LineCap) => free.liftF(new SetLineCap(cap, undefined))

export const setComposite = (compisite: canvas.Composite) => free.liftF(new SetComposite(compisite, undefined))

export const setAlpha = (alpha: number) => free.liftF(new SetAlpha(alpha, undefined))

export const beginPath = () => free.liftF(new BeginPath(undefined))

export const stroke = () => free.liftF(new Stroke(undefined))

export const fill = () => free.liftF(new Fill(undefined))

export const clip = () => free.liftF(new Clip(undefined))

export const lineTo = (x: number, y: number) => free.liftF(new LineTo(x, y, undefined))

export const moveTo = (x: number, y: number) => free.liftF(new MoveTo(x, y, undefined))

export const closePath = () => free.liftF(new ClosePath(undefined))

export const arc = (x: number, y: number, radius: number, start: number, end: number) =>
  free.liftF(new Arc(x, y, radius, start, end, undefined))

export const rect = (x: number, y: number, width: number, height: number) =>
  free.liftF(new Rect(x, y, width, height, undefined))

export const fillRect = (x: number, y: number, width: number, height: number) =>
  free.liftF(new FillRect(x, y, width, height, undefined))

export const strokeRect = (x: number, y: number, width: number, height: number) =>
  free.liftF(new StrokeRect(x, y, width, height, undefined))

export const clearRect = (x: number, y: number, width: number, height: number) =>
  free.liftF(new ClearRect(x, y, width, height, undefined))

export const scale = (x: number, y: number) => free.liftF(new Scale(x, y, undefined))

export const rotate = (angle: number) => free.liftF(new Rotate(angle, undefined))

export const translate = (x: number, y: number) => free.liftF(new Translate(x, y, undefined))

export const transform = (m11: number, m12: number, m21: number, m22: number, m31: number, m32: number) =>
  free.liftF(new Transform(m11, m12, m21, m22, m31, m32, undefined))

export const getTextAlign = () => free.liftF(new GetTextAlign(a => a))

export const setTextAlign = (textAlign: canvas.TextAlign) => free.liftF(new SetTextAlign(textAlign, undefined))

export const getFont = () => free.liftF(new GetFont(a => a))

export const setFont = (font: string) => free.liftF(new SetFont(font, undefined))

export const fillText = (text: string, x: number, y: number) => free.liftF(new FillText(text, x, y, undefined))

export const strokeText = (text: string, x: number, y: number) => free.liftF(new StrokeText(text, x, y, undefined))

export const measureText = (text: string) => free.liftF(new MeasureText(text, a => a))

export const save = () => free.liftF(new Save(undefined))

export const restore = () => free.liftF(new Restore(undefined))

export const getImageData = (sx: number, sy: number, sw: number, sh: number) =>
  free.liftF(new GetImageData(sx, sy, sw, sh, a => a))

export const putImageData = (imageData: ImageData, dx: number, dy: number) =>
  free.liftF(new PutImageData(imageData, dx, dy, undefined))

export const putImageDataFull = (
  imageData: ImageData,
  dx: number,
  dy: number,
  dirtyX: number,
  dirtyY: number,
  dirtyWidth: number,
  dirtyHeight: number
) => free.liftF(new PutImageDataFull(imageData, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight, undefined))

export const createImageData = (imageData: number | ImageData, sh: number) =>
  free.liftF(new CreateImageData(imageData, sh, a => a))

export const createImageDataCopy = (imageData: ImageData) => free.liftF(new CreateImageDataCopy(imageData, a => a))

export const drawImage = (imageSource: ImageSource, offsetX: number, offsetY: number) =>
  free.liftF(new DrawImage(imageSource, offsetX, offsetY, undefined))

export const drawImageScale = (
  imageSource: ImageSource,
  offsetX: number,
  offsetY: number,
  width: number,
  height: number
) => free.liftF(new DrawImageScale(imageSource, offsetX, offsetY, width, height, undefined))

export const drawImageFull = (
  imageSource: ImageSource,
  offsetX: number,
  offsetY: number,
  width: number,
  height: number,
  canvasOffsetX: number,
  canvasOffsetY: number,
  canvasImageWidth: number,
  canvasImageHeight: number
) =>
  free.liftF(
    new DrawImageFull(
      imageSource,
      offsetX,
      offsetY,
      width,
      height,
      canvasOffsetX,
      canvasOffsetY,
      canvasImageWidth,
      canvasImageHeight,
      undefined
    )
  )

function getInterpretCanvas(ctx: CanvasRenderingContext2D): <A>(hktfa: HKT<URI, A>) => identity.Identity<A> {
  return function interpretCanvas<A>(hktfa: HKT<URI, A>): identity.Identity<A> {
    const fa = hktfa as Canvas<A>
    switch (fa._tag) {
      case 'BeginPath':
        ctx.beginPath()
        return identity.of(fa.more)
      case 'ClosePath':
        ctx.closePath()
        return identity.of(fa.more)
      case 'Fill':
        ctx.fill()
        return identity.of(fa.more)
      case 'FillRect':
        ctx.fillRect(fa.x, fa.y, fa.width, fa.height)
        return identity.of(fa.more)
      case 'MoveTo':
        ctx.moveTo(fa.x, fa.y)
        return identity.of(fa.more)
      case 'LineTo':
        ctx.lineTo(fa.x, fa.y)
        return identity.of(fa.more)
      case 'Restore':
        ctx.restore()
        return identity.of(fa.more)
      case 'Rotate':
        ctx.rotate(fa.angle)
        return identity.of(fa.more)
      case 'Save':
        ctx.save()
        return identity.of(fa.more)
      case 'Scale':
        ctx.scale(fa.x, fa.y)
        return identity.of(fa.more)
      case 'SetFillStyle':
        ctx.fillStyle = fa.style
        return identity.of(fa.more)
      case 'SetLineWidth':
        ctx.lineWidth = fa.width
        return identity.of(fa.more)
      case 'SetShadowBlur':
        ctx.shadowBlur = fa.blur
        return identity.of(fa.more)
      case 'SetShadowColor':
        ctx.shadowColor = fa.color
        return identity.of(fa.more)
      case 'SetShadowOffsetX':
        ctx.shadowOffsetX = fa.offsetX
        return identity.of(fa.more)
      case 'SetShadowOffsetY':
        ctx.shadowOffsetY = fa.offsetY
        return identity.of(fa.more)
      case 'StrokeText':
        ctx.strokeText(fa.text, fa.x, fa.y)
        return identity.of(fa.more)
      case 'Translate':
        ctx.translate(fa.x, fa.y)
        return identity.of(fa.more)
      case 'SetStrokeStyle':
        ctx.strokeStyle = fa.style
        return identity.of(fa.more)
      case 'SetLineCap':
        ctx.lineCap = fa.cap
        return identity.of(fa.more)
      case 'SetComposite':
        ctx.globalCompositeOperation = fa.composite
        return identity.of(fa.more)
      case 'SetAlpha':
        ctx.globalAlpha = fa.alpha
        return identity.of(fa.more)
      case 'Stroke':
        ctx.stroke()
        return identity.of(fa.more)
      case 'Clip':
        ctx.clip()
        return identity.of(fa.more)
      case 'Arc':
        ctx.arc(fa.x, fa.y, fa.radius, fa.start, fa.end)
        return identity.of(fa.more)
      case 'Rect':
        ctx.rect(fa.x, fa.y, fa.width, fa.height)
        return identity.of(fa.more)
      case 'StrokeRect':
        ctx.strokeRect(fa.x, fa.y, fa.width, fa.height)
        return identity.of(fa.more)
      case 'ClearRect':
        ctx.clearRect(fa.x, fa.y, fa.width, fa.height)
        return identity.of(fa.more)
      case 'Transform':
        ctx.transform(fa.m11, fa.m12, fa.m21, fa.m22, fa.m31, fa.m32)
        return identity.of(fa.more)
      case 'GetTextAlign':
        return identity.of(fa.more(ctx.textAlign as canvas.TextAlign))
      case 'SetTextAlign':
        ctx.textAlign = fa.textAlign
        return identity.of(fa.more)
      case 'GetFont':
        return identity.of(fa.more(ctx.font))
      case 'SetFont':
        ctx.font = fa.font
        return identity.of(fa.more)
      case 'FillText':
        ctx.fillText(fa.text, fa.x, fa.y)
        return identity.of(fa.more)
      case 'MeasureText':
        return identity.of(fa.more(ctx.measureText(fa.text)))
      case 'GetImageData':
        return identity.of(fa.more(ctx.getImageData(fa.sx, fa.sy, fa.sw, fa.sh)))
      case 'PutImageData':
        ctx.putImageData(fa.imageData, fa.dx, fa.dy)
        return identity.of(fa.more)
      case 'PutImageDataFull':
        ctx.putImageData(fa.imageData, fa.dx, fa.dy, fa.dirtyX, fa.dirtyY, fa.dirtyWidth, fa.dirtyHeight)
        return identity.of(fa.more)
      case 'CreateImageData':
        return identity.of(fa.more(ctx.createImageData(fa.imageData, fa.sh)))
      case 'CreateImageDataCopy':
        return identity.of(fa.more(ctx.createImageData(fa.imageData)))
      case 'DrawImage':
        ctx.drawImage(fa.imageSource, fa.offsetX, fa.offsetY)
        return identity.of(fa.more)
      case 'DrawImageScale':
        ctx.drawImage(fa.imageSource, fa.offsetX, fa.offsetY, fa.width, fa.height)
        return identity.of(fa.more)
      case 'DrawImageFull':
        ctx.drawImage(
          fa.imageSource,
          fa.offsetX,
          fa.offsetY,
          fa.width,
          fa.height,
          fa.canvasOffsetX,
          fa.canvasOffsetY,
          fa.canvasImageWidth,
          fa.canvasImageHeight
        )
        return identity.of(fa.more)
    }
  }
}

/** A convenience function: run the action, preserving the existing context */
export function withContext<A>(drawning: Drawing<A>): Drawing<A> {
  return save().chain(() => drawning).chain(a => restore().map(() => a))
}

export type Drawing<A> = free.Free<URI, A>

export function run<A>(drawing: Drawing<A>, ctx: CanvasRenderingContext2D): A {
  return drawing.foldFree(identity)(getInterpretCanvas(ctx)).value
}
