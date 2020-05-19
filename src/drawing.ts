// adapted from https://github.com/purescript-contrib/purescript-drawing

import { HKT, URIS, URIS2, URIS3, Type, Type2, Type3 } from 'fp-ts/lib/HKT'
import { Foldable, Foldable1, Foldable2, Foldable3, toArray } from 'fp-ts/lib/Foldable'
import { Option, some, none } from 'fp-ts/lib/Option'
import { Monoid } from 'fp-ts/lib/Monoid'
import { IO, io } from 'fp-ts/lib/IO'
import * as canvas from './canvas'
import { Color, toCss } from './color'
import * as array from 'fp-ts/lib/Array'
import { Font } from './font'

export type Point = {
  x: number
  y: number
}

export type Shape = Path | Rectangle | Arc | Composite

/** A path is a list of points joined by line segments */
export class Path {
  readonly _tag = 'Path'
  constructor(public readonly closed: boolean, public readonly points: Array<Point>) {}
}

/** A rectangle consisting of the numbers left, top, width and height */
export class Rectangle {
  readonly _tag = 'Rectangle'
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly width: number,
    public readonly height: number
  ) {}
}

export function rectangle(x: number, y: number, width: number, height: number): Rectangle {
  return new Rectangle(x, y, width, height)
}

/** A circular arc consisting of the numbers center-x, center-y, start angle, end angle and radius */
export class Arc {
  readonly _tag = 'Arc'
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly radius: number,
    public readonly start: number,
    public readonly end: number
  ) {}
}

export function arc(x: number, y: number, radius: number, start: number, end: number): Arc {
  return new Arc(x, y, radius, start, end)
}

/** A composite shape */
export class Composite {
  readonly _tag = 'Composite'
  constructor(public readonly shapes: Array<Shape>) {}
}

export function composite(shapes: Array<Shape>): Composite {
  return new Composite(shapes)
}

/** Create a path */
export function path<F extends URIS3>(foldable: Foldable3<F>): <U, L>(points: Type3<F, U, L, Point>) => Shape
export function path<F extends URIS2>(foldable: Foldable2<F>): <L>(points: Type2<F, L, Point>) => Shape
export function path<F extends URIS>(foldable: Foldable1<F>): (points: Type<F, Point>) => Shape
export function path<F>(F: Foldable<F>): (points: HKT<F, Point>) => Shape
export function path<F>(F: Foldable<F>): (points: HKT<F, Point>) => Shape {
  const toArrayF = toArray(F)
  return (points) => new Path(false, toArrayF(points))
}

/** Create a closed path */
export function closed<F extends URIS3>(F: Foldable3<F>): <U, L>(points: Type3<F, U, L, Point>) => Shape
export function closed<F extends URIS2>(F: Foldable2<F>): <L>(points: Type2<F, L, Point>) => Shape
export function closed<F extends URIS>(F: Foldable1<F>): (points: Type<F, Point>) => Shape
export function closed<F>(F: Foldable<F>): (points: HKT<F, Point>) => Shape
export function closed<F>(F: Foldable<F>): (points: HKT<F, Point>) => Shape {
  const toArrayF = toArray(F)
  return (points) => new Path(true, toArrayF(points))
}

/** Create a circle from the left, top and radius parameters */
export function circle(x: number, y: number, radius: number): Shape {
  return new Arc(x, y, radius, 0, Math.PI * 2)
}

export class FillStyle {
  constructor(public readonly color: Option<Color>) {}
  concat(y: FillStyle): FillStyle {
    return new FillStyle(this.color.alt(y.color))
  }
}

export const monoidFillStyle: Monoid<FillStyle> = {
  concat: (x, y) => x.concat(y),
  empty: new FillStyle(none)
}

export function fillColor(color: Color): FillStyle {
  return new FillStyle(some(color))
}

export class OutlineStyle {
  constructor(public readonly color: Option<Color>, public readonly lineWidth: Option<number>) {}
  concat(y: OutlineStyle): OutlineStyle {
    return new OutlineStyle(this.color.alt(y.color), this.lineWidth.alt(y.lineWidth))
  }
}

export const monoidOutlineStyle: Monoid<OutlineStyle> = {
  concat: (x, y) => x.concat(y),
  empty: new OutlineStyle(none, none)
}

export function outlineColor(color: Color): OutlineStyle {
  return new OutlineStyle(some(color), none)
}

export function lineWidth(lineWidth: number): OutlineStyle {
  return new OutlineStyle(none, some(lineWidth))
}

export class Shadow {
  constructor(
    public readonly color: Option<Color>,
    public readonly blur: Option<number>,
    public readonly offset: Option<{ x: number; y: number }>
  ) {}
  concat(y: Shadow): Shadow {
    return new Shadow(this.color.alt(y.color), this.blur.alt(y.blur), this.offset.alt(y.offset))
  }
}

export const monoidShadow: Monoid<Shadow> = {
  concat: (x, y) => x.concat(y),
  empty: new Shadow(none, none, none)
}

export function shadowColor(color: Color): Shadow {
  return new Shadow(some(color), none, none)
}

export function shadowBlur(blur: number): Shadow {
  return new Shadow(none, some(blur), none)
}

export function shadowOffset(x: number, y: number): Shadow {
  return new Shadow(none, none, some({ x, y }))
}

export type Drawing = Fill | Outline | Text | Many | Scale | Translate | Rotate | Clipped | WithShadow

export class Fill {
  readonly _tag = 'Fill'
  constructor(public readonly shape: Shape, public readonly style: FillStyle) {}
}

export function fill(shape: Shape, style: FillStyle): Drawing {
  return new Fill(shape, style)
}

export class Outline {
  readonly _tag = 'Outline'
  constructor(public readonly shape: Shape, public readonly style: OutlineStyle) {}
}

export function outline(shape: Shape, style: OutlineStyle): Drawing {
  return new Outline(shape, style)
}

export class Text {
  readonly _tag = 'Text'
  constructor(
    public readonly font: Font,
    public readonly x: number,
    public readonly y: number,
    public readonly style: FillStyle,
    public readonly text: string
  ) {}
}

export function text(font: Font, x: number, y: number, style: FillStyle, text: string): Drawing {
  return new Text(font, x, y, style, text)
}

export class Many {
  readonly _tag = 'Many'
  constructor(public readonly drawings: Array<Drawing>) {}
}

export function many(drawings: Array<Drawing>): Drawing {
  return new Many(drawings)
}

export class Scale {
  readonly _tag = 'Scale'
  constructor(public readonly scaleX: number, public readonly scaleY: number, public readonly drawing: Drawing) {}
}

export function scale(scaleX: number, scaleY: number, drawing: Drawing): Drawing {
  return new Scale(scaleX, scaleY, drawing)
}

export class Translate {
  readonly _tag = 'Translate'
  constructor(
    public readonly translateX: number,
    public readonly translateY: number,
    public readonly drawing: Drawing
  ) {}
}

export function translate(translateX: number, translateY: number, drawing: Drawing): Drawing {
  return new Translate(translateX, translateY, drawing)
}

export class Rotate {
  readonly _tag = 'Rotate'
  constructor(public readonly angle: number, public readonly drawing: Drawing) {}
}

export function rotate(angle: number, drawing: Drawing): Drawing {
  return new Rotate(angle, drawing)
}

export class Clipped {
  readonly _tag = 'Clipped'
  constructor(public readonly shape: Shape, public readonly drawing: Drawing) {}
}

export function clipped(shape: Shape, drawing: Drawing): Drawing {
  return new Clipped(shape, drawing)
}

export class WithShadow {
  readonly _tag = 'WithShadow'
  constructor(public readonly shadow: Shadow, public readonly drawing: Drawing) {}
}

export function withShadow(shadow: Shadow, drawing: Drawing): Drawing {
  return new WithShadow(shadow, drawing)
}

export const monoidDrawing: Monoid<Drawing> = {
  concat: (x, y) => {
    if (x._tag === 'Many') {
      return new Many(x.drawings.concat(y))
    }
    if (y._tag === 'Many') {
      return new Many([x as Drawing].concat(y.drawings))
    }
    return new Many([x, y])
  },
  empty: new Many([])
}

/** Render a `Drawing` to a canvas */
export function render(drawing: Drawing, ctx: CanvasRenderingContext2D): IO<void> {
  function go(drawing: Drawing): IO<void> {
    switch (drawing._tag) {
      case 'Fill':
        return canvas.withContext(
          ctx,
          applyFillStyle(drawing.style).chain(() => {
            return canvas.fillPath(ctx, renderShape(drawing.shape))
          })
        )
      case 'Outline':
        return canvas.withContext(
          ctx,
          applyOutlineStyle(drawing.style).chain(() => canvas.strokePath(ctx, renderShape(drawing.shape)))
        )
      case 'Many':
        return new IO(() => {
          drawing.drawings.forEach((drawing) => go(drawing).run())
        })
      case 'Scale':
        return canvas.withContext(
          ctx,
          canvas.scale(ctx, drawing).chain(() => go(drawing.drawing))
        )
      case 'Translate':
        return canvas.withContext(
          ctx,
          canvas.translate(ctx, drawing).chain(() => go(drawing.drawing))
        )
      case 'Rotate':
        return canvas.withContext(
          ctx,
          canvas.rotate(ctx, drawing.angle).chain(() => go(drawing.drawing))
        )
      case 'Clipped':
        return canvas.withContext(
          ctx,
          renderShape(drawing.shape).chain(() => go(drawing.drawing))
        )
      case 'WithShadow':
        return canvas.withContext(
          ctx,
          applyShadow(drawing.shadow).chain(() => go(drawing.drawing))
        )
      case 'Text':
        return canvas
          .withContext(ctx, canvas.setFont(ctx, drawing.font.toString()))
          .chain(() => applyFillStyle(drawing.style))
          .chain(() => canvas.fillText(ctx, drawing.text, drawing.x, drawing.y))
          .map(() => undefined)
    }
  }

  function applyShadow(s: Shadow): IO<void> {
    return new IO(() => {
      s.color.map((color) => canvas.setShadowColor(ctx, toCss(color)).run())
      s.blur.map((blur) => canvas.setShadowBlur(ctx, blur).run())
      s.offset.map((offset) => {
        canvas.setShadowOffsetX(ctx, offset.x).run()
        canvas.setShadowOffsetY(ctx, offset.y).run()
      })
    })
  }

  function applyFillStyle(style: FillStyle): IO<void> {
    return new IO(() => {
      style.color.map((color) => canvas.setFillStyle(ctx, toCss(color)).run())
    })
  }

  function applyOutlineStyle(style: OutlineStyle): IO<void> {
    return new IO(() => {
      style.color.map((color) => canvas.setStrokeStyle(ctx, toCss(color)).run())
      style.lineWidth.map((lineWidth) => canvas.setLineWidth(ctx, lineWidth).run())
    })
  }

  function renderShape(shape: Shape): IO<void> {
    switch (shape._tag) {
      case 'Path':
        return array.foldL(
          shape.points,
          () => io.of(undefined),
          (p, tail) => {
            return new IO(() => {
              canvas.moveTo(ctx, p.x, p.y).run()
              tail.forEach((p) => canvas.lineTo(ctx, p.x, p.y).run())
              if (shape.closed) {
                canvas.closePath(ctx).run()
              }
            })
          }
        )
      case 'Rectangle':
        return canvas.rect(ctx, shape).map(() => undefined)
      case 'Arc':
        return canvas.arc(ctx, shape).map(() => undefined)
      case 'Composite':
        return new IO(() => shape.shapes.forEach((shape) => renderShape(shape).run()))
    }
  }

  return go(drawing)
}
