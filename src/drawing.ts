// adapted from https://github.com/purescript-contrib/purescript-drawing

import { HKT, HKTS } from 'fp-ts/lib/HKT'
import { StaticFoldable, toArray } from 'fp-ts/lib/Foldable'
import { Option, some, none } from 'fp-ts/lib/Option'
import { StaticMonoid } from 'fp-ts/lib/Monoid'
import { IO } from 'fp-ts/lib/IO'
import * as canvas from './canvas'
import { Color, toCss } from './color'
import * as array from 'fp-ts/lib/Array'
import { Font } from './font'

export type Point = {
  x: number,
  y: number
}

export type Shape =
  | Path
  | Rectangle
  | Arc
  | Composite

/** A path is a list of points joined by line segments */
export class Path {
  readonly _tag = 'Path'
  constructor(
    public readonly closed: boolean,
    public readonly points: Array<Point>
  ) {}
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

/** A composite shape */
export class Composite {
  readonly _tag = 'Composite'
  constructor(
    public readonly shapes: Array<Shape>
  ) {}
}

/** Create a path */
export function path<F extends HKTS>(foldable: StaticFoldable<F>, points: HKT<Point>[F]): Shape {
  return new Path(false, toArray<F, Point>(foldable, points))
}

/** Create a closed path */
export function closed<F extends HKTS>(foldable: StaticFoldable<F>, points: HKT<Point>[F]): Shape {
  return new Path(true, toArray<F, Point>(foldable, points))
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

const emptyFillStyle = new FillStyle(none)

export const monoidFillStyle: StaticMonoid<FillStyle> = {
  empty: () => emptyFillStyle,
  concat: (x, y) => x.concat(y)
}

export function fillColor(color: Color): FillStyle {
  return new FillStyle(some(color))
}

export class OutlineStyle {
  constructor(
    public readonly color: Option<Color>,
    public readonly lineWidth: Option<number>
  ) {}
  concat(y: OutlineStyle): OutlineStyle {
    return new OutlineStyle(
      this.color.alt(y.color),
      this.lineWidth.alt(y.lineWidth)
    )
  }
}

const emptyOutileStyle = new OutlineStyle(none, none)

export const monoidOutlineStyle: StaticMonoid<OutlineStyle> = {
  empty: () => emptyOutileStyle,
  concat: (x, y) => x.concat(y)
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
    public readonly offset: Option<{ x: number, y: number }>
  ) {}
  concat(y: Shadow): Shadow {
    return new Shadow(
      this.color.alt(y.color),
      this.blur.alt(y.blur),
      this.offset.alt(y.offset)
    )
  }
}

const emptyShadow = new Shadow(none, none, none)

export const monoidShadow: StaticMonoid<Shadow> = {
  empty: () => emptyShadow,
  concat: (x, y) => x.concat(y)
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

export type Drawing =
  | Fill
  | Outline
  | Text
  | Many
  | Scale
  | Translate
  | Rotate
  | Clipped
  | WithShadow

export class Fill {
  readonly _tag = 'Fill'
  constructor(
    public readonly shape: Shape,
    public readonly style: FillStyle
  ) {}
}

export class Outline {
  readonly _tag = 'Outline'
  constructor(
    public readonly shape: Shape,
    public readonly style: OutlineStyle
  ) {}
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

export class Many {
  readonly _tag = 'Many'
  constructor(
    public readonly drawings: Array<Drawing>
  ) {}
}

export class Scale {
  readonly _tag = 'Scale'
  constructor(
    public readonly scaleX: number,
    public readonly scaleY: number,
    public readonly drawing: Drawing
  ) {}
}

export class Translate {
  readonly _tag = 'Translate'
  constructor(
    public readonly translateX: number,
    public readonly translateY: number,
    public readonly drawing: Drawing
  ) {}
}

export class Rotate {
  readonly _tag = 'Rotate'
  constructor(
    public readonly angle: number,
    public readonly drawing: Drawing
  ) {}
}

export class Clipped {
  readonly _tag = 'Clipped'
  constructor(
    public readonly shape: Shape,
    public readonly drawing: Drawing
  ) {}
}

export class WithShadow {
  readonly _tag = 'WithShadow'
  constructor(
    public readonly shadow: Shadow,
    public readonly drawing: Drawing
  ) {}
}

export const monoidDrawing: StaticMonoid<Drawing> = {
  empty: () => new Many([]),
  concat: (x, y) => {
    if (x._tag === 'Many') {
      return new Many(x.drawings.concat(y))
    }
    if (y._tag === 'Many') {
      return new Many([x as Drawing].concat(y.drawings))
    }
    return new Many([x, y])
  }
}

/** Render a `Drawing` to a canvas */
export function render(drawing: Drawing, ctx: CanvasRenderingContext2D): IO<void> {

  function go(drawing: Drawing): IO<void> {
    switch (drawing._tag) {
      case 'Fill' :
        return canvas.withContext(ctx, applyFillStyle(drawing.style)
          .chain(() => {
            return canvas.fillPath(renderShape(drawing.shape), ctx)
          }))
      case 'Outline' :
        return canvas.withContext(ctx, applyOutlineStyle(drawing.style)
          .chain(() => canvas.strokePath(renderShape(drawing.shape), ctx)))
      case 'Many' :
        return new IO(() => {
          drawing.drawings.forEach(drawing => go(drawing).run())
        })
      case 'Scale' :
        return canvas.withContext(ctx, canvas.scale(drawing, ctx).chain(() => go(drawing.drawing)))
      case 'Translate' :
        return canvas.withContext(ctx, canvas.translate(drawing, ctx).chain(() => go(drawing.drawing)))
      case 'Rotate' :
        return canvas.withContext(ctx, canvas.rotate(drawing.angle, ctx).chain(() => go(drawing.drawing)))
      case 'Clipped' :
        return canvas.withContext(ctx, renderShape(drawing.shape).chain(() => go(drawing.drawing)))
      case 'WithShadow' :
        return canvas.withContext(ctx, applyShadow(drawing.shadow).chain(() => go(drawing.drawing)))
      case 'Text' :
        return canvas.withContext(ctx, canvas.setFont(drawing.font.toString(), ctx))
          .chain(() => applyFillStyle(drawing.style))
          .chain(() => canvas.fillText(drawing.text, drawing.x, drawing.y, ctx))
          .map(() => undefined)
    }
  }

  function applyShadow(s: Shadow): IO<void> {
    return new IO(() => {
      s.color.map(color => canvas.setShadowColor(toCss(color), ctx).run())
      s.blur.map(blur => canvas.setShadowBlur(blur, ctx).run())
      s.offset.map(offset => {
        canvas.setShadowOffsetX(offset.x, ctx).run()
        canvas.setShadowOffsetY(offset.y, ctx).run()
      })
    })
  }

  function applyFillStyle(style: FillStyle): IO<void> {
    return new IO(() => {
      style.color.map(color => canvas.setFillStyle(toCss(color), ctx).run())
    })
  }

  function applyOutlineStyle(style: OutlineStyle): IO<void> {
    return new IO(() => {
      style.color.map(color => canvas.setStrokeStyle(toCss(color), ctx).run())
      style.lineWidth.map(lineWidth => canvas.setLineWidth(lineWidth, ctx).run())
    })
  }

  function renderShape(shape: Shape): IO<void> {
    switch (shape._tag) {
      case 'Path' :
        return array.fold(
          () => IO.of(undefined),
          (p, tail) => {
            return new IO(() => {
              canvas.moveTo(p.x, p.y, ctx).run()
              tail.forEach(p => canvas.lineTo(p.x, p.y, ctx).run())
              if (shape.closed) {
                canvas.closePath(ctx).run()
              }
            })
          },
          shape.points
        )
      case 'Rectangle' :
        return canvas.rect(shape, ctx).map(() => undefined)
      case 'Arc' :
        return canvas.arc(shape, ctx).map(() => undefined)
      case 'Composite' :
        return new IO(() => shape.shapes.forEach(shape => renderShape(shape).run()))
    }
  }

  return go(drawing)
}
