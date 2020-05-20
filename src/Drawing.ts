/**
 * The `Drawing` module abstracts away the repetitive calls to the HTML Canvas API that are required
 * when using the `Canvas` module directly and instead allows us to be more declarative with our code.
 *
 * Taking the MDN example from the [Canvas][#canvas] documentation,
 *
 * ```ts
 * import * as IO from 'fp-ts/lib/IO'
 * import * as ROA from 'fp-ts/lib/ReadonlyArray'
 * import { flow } from 'fp-ts/lib/function'
 * import { pipe } from 'fp-ts/lib/pipeable'
 * import * as Color from 'graphics-ts/lib/Color'
 * import * as D from 'graphics-ts/lib/Drawing'
 * import * as S from 'graphics-ts/lib/Shape'
 *
 * const canvasId = 'canvas'
 *
 * pipe(
 *   C.getCanvasElementById(canvasId),
 *   IO.chain(
 *     O.fold(
 *       () => error(`[ERROR]: Unable to find canvas`),
 *       flow(
 *         C.getContext2D,
 *         IO.chain(
 *           C.fillPath(
 *             flow(
 *               C.setFillStyle(pipe(Color.black, Color.toCss)),
 *               IO.chain(C.moveTo(S.point(75, 50))),
 *               IO.chain(C.lineTo(S.point(100, 75))),
 *               IO.chain(C.lineTo(S.point(100, 25)))
 *             )
 *           )
 *         )
 *       )
 *     )
 *   )
 * )()
 * ```
 * the code above becomes the following
 *
 * ```ts
 * pipe(
 *   C.getCanvasElementById(canvasId),
 *   IO.chain(
 *     O.fold(
 *       () => error(`[ERROR]: Unable to find canvas`),
 *       flow(
 *         C.getContext2D,
 *         IO.chain(
 *           D.render(
 *             D.fill(
 *               S.path(ROA.readonlyArray)([S.point(75, 50), S.point(100, 75), S.point(100, 25)]),
 *               D.fillStyle(Color.black)
 *             )
 *           )
 *         )
 *       )
 *     )
 *   )
 * )()
 * ```
 *
 * Adapted from https://github.com/purescript-contrib/purescript-drawing
 *
 * @since 1.0.0
 */
import * as B from 'fp-ts/lib/boolean'
import * as IO from 'fp-ts/lib/IO'
import * as M from 'fp-ts/lib/Monoid'
import * as O from 'fp-ts/lib/Option'
import * as ROA from 'fp-ts/lib/ReadonlyArray'
import { flow } from 'fp-ts/lib/function'
import { pipe } from 'fp-ts/lib/pipeable'

import * as C from './Canvas'
import { toCss, Color } from './Color'
import { showFont, Font } from './Font'
import { Point, Shape } from './Shape'

const readonlyArrayMonoidDrawing = ROA.getMonoid<Drawing>()
const getFirstMonoidColor = O.getFirstMonoid<Color>()
const getFirstMonoidNumber = O.getFirstMonoid<number>()
const getFirstMonoidPoint = O.getFirstMonoid<Point>()

/**
 * Represents a shape that can be drawn to the canvas.
 *
 * @since 1.0.0
 */
export type Drawing = Fill | Outline | Text | Many | Scale | Translate | Rotate | Clipped | WithShadow

/**
 * Represents the styles applied to a filled `Shape`.
 *
 * @since 1.0.0
 */
export interface FillStyle {
  /**
   * The fill color.
   */
  readonly color: O.Option<Color>
}

/**
 * Constructs a `FillStyle`.
 *
 * @since 1.0.0
 */
export const fillStyle: (color: Color) => FillStyle = (c) => ({ color: O.some(c) })

/**
 * Gets a `Monoid` instance for `FillStyle`.
 *
 * @since 1.0.0
 */
export const monoidFillStyle = M.getStructMonoid<FillStyle>({
  color: getFirstMonoidColor
})

/**
 * Represents the styles applied to an outlined `Shape`.
 *
 * @since 1.0.0
 */
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

/**
 * Gets a `Monoid` instance for `OutlineStyle`.
 *
 * @example
 * import * as O from 'fp-ts/lib/Option'
 * import * as M from 'fp-ts/lib/Monoid'
 * import * as C from 'graphics-ts/lib/Color'
 * import * as D from 'graphics-ts/lib/Drawing'
 *
 * assert.deepStrictEqual(
 *   M.fold(D.monoidOutlineStyle)([
 *     D.outlineColor(C.black),
 *     D.outlineColor(C.white),
 *     D.lineWidth(5)
 *   ]),
 *   {
 *     color: O.some(C.black),
 *     lineWidth: O.some(5)
 *   }
 * )
 *
 * @since 1.0.0
 */
export const monoidOutlineStyle = M.getStructMonoid<OutlineStyle>({
  color: getFirstMonoidColor,
  lineWidth: getFirstMonoidNumber
})

/**
 * Constructs an `OutlineStyle` from a `Color`.
 *
 * @since 1.0.0
 */
export const outlineColor: (color: Color) => OutlineStyle = (c) => ({
  color: O.some(c),
  lineWidth: O.none
})

/**
 * Constructs an `OutlineStyle` from a line width.
 *
 * @since 1.0.0
 */
export const lineWidth: (lineWidth: number) => OutlineStyle = (w) => ({
  color: O.none,
  lineWidth: O.some(w)
})

/**
 * Represents the shadow styles applied to a `Shape`.
 *
 * @since 1.0.0
 */
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

/**
 * Gets a `Monoid` instance for `Shadow`.
 *
 * @since 1.0.0
 */
export const monoidShadow = M.getStructMonoid<Shadow>({
  color: getFirstMonoidColor,
  blur: getFirstMonoidNumber,
  offset: getFirstMonoidPoint
})

/**
 * Constructs a `Shadow` from a `Color`.
 *
 * @since 1.0.0
 */
export const shadowColor: (color: Color) => Shadow = (c) => ({
  color: O.some(c),
  blur: O.none,
  offset: O.none
})

/**
 * Constructs a `Shadow` from a blur radius.
 *
 * @since 1.0.0
 */
export const shadowBlur: (blurRadius: number) => Shadow = (b) => ({
  color: O.none,
  blur: O.some(b),
  offset: O.none
})

/**
 * Constructs a `Shadow` from an offset `Point`.
 *
 * @since 1.0.0
 */
export const shadowOffset: (offsetPoint: Point) => Shadow = (o) => ({
  color: O.none,
  blur: O.none,
  offset: O.some(o)
})

/**
 * Represents a filled `Shape` that can be drawn to the canvas.
 *
 * @since 1.0.0
 */
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

/**
 * Constructs a `Drawing` from a `Fill` `Shape`.
 *
 * @since 1.0.0
 */
export const fill: (shape: Shape, style: FillStyle) => Drawing = (shape, style) => ({ _tag: 'Fill', shape, style })

/**
 * Represents an outlined `Shape` that can be drawn to the canvas.
 *
 * @since 1.0.0
 */
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

/**
 * Constructs a `Drawing` from an `Outline` `Shape`.
 *
 * @since 1.0.0
 */
export const outline: (shape: Shape, style: OutlineStyle) => Drawing = (shape, style) => ({
  _tag: 'Outline',
  shape,
  style
})

/**
 * Represents text that can be drawn to the canvas.
 *
 * @since 1.0.0
 */
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

/**
 * Constructs a `Drawing` from `Text`.
 *
 * @since 1.0.0
 */
export const text: (font: Font, x: number, y: number, style: FillStyle, text: string) => Drawing = (
  font,
  x,
  y,
  style,
  text
) => ({
  _tag: 'Text',
  font,
  x,
  y,
  style,
  text
})

/**
 * Represents a collection of `Drawing`s that can be drawn to the canvas.
 *
 * @since 1.0.0
 */
export interface Many {
  readonly _tag: 'Many'

  /**
   * The collection of drawings.
   */
  readonly drawings: ReadonlyArray<Drawing>
}

/**
 * Construct a single `Drawing` from a collection of `Many` `Drawing`s.
 *
 * @since 1.0.0
 */
export const many: (drawings: ReadonlyArray<Drawing>) => Drawing = (drawings) => ({ _tag: 'Many', drawings })

/**
 * Represents a `Drawing` that has had scale applied to its transform.
 *
 * @since 1.0.0
 */
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

/**
 * Applies scale to the transform of a `Drawing`.
 *
 * @since 1.0.0
 */
export const scale: (scaleX: number, scaleY: number, drawing: Drawing) => Drawing = (scaleX, scaleY, drawing) => ({
  _tag: 'Scale',
  scaleX,
  scaleY,
  drawing
})

/**
 * Represents a `Drawing` that has had its transform translated.
 *
 * @since 1.0.0
 */
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

/**
 * Applies translation to the transform of a `Drawing`.
 *
 * @since 1.0.0
 */
export const translate: (translateX: number, translateY: number, drawing: Drawing) => Drawing = (
  translateX,
  translateY,
  drawing
) => ({
  _tag: 'Translate',
  translateX,
  translateY,
  drawing
})

/**
 * Represents a `Drawing` that has had its transform rotated.
 *
 * @since 1.0.0
 */
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

/**
 * Applies rotation to the transform of a `Drawing`.
 *
 * @since 1.0.0
 */
export const rotate: (angle: number, drawing: Drawing) => Drawing = (angle, drawing) => ({
  _tag: 'Rotate',
  angle,
  drawing
})

/**
 * Represents a `Drawing` that has been clipped by a `Shape`.
 *
 * @since 1.0.0
 */
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

/**
 * Clips a `Drawing` using the specified `Shape`.
 *
 * @since 1.0.0
 */
export const clipped: (shape: Shape, drawing: Drawing) => Drawing = (shape, drawing) => ({
  _tag: 'Clipped',
  shape,
  drawing
})

/**
 * Represents a `Drawing` that has had a shadow applied to it.
 *
 * @since 1.0.0
 */
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

/**
 * Applies `Shadow` to a `Drawing`.
 *
 * @since 1.0.0
 */
export const withShadow: (shadow: Shadow, drawing: Drawing) => Drawing = (shadow, drawing) => ({
  _tag: 'WithShadow',
  shadow,
  drawing
})

/**
 * Gets a `Monoid` instance for `Drawing`.
 *
 * @since 1.0.0
 */
export const monoidDrawing: M.Monoid<Drawing> = {
  concat: (x, y) =>
    x._tag === 'Many' && y._tag === 'Many'
      ? many(M.fold(readonlyArrayMonoidDrawing)([x.drawings, y.drawings]))
      : x._tag === 'Many'
      ? many(M.fold(readonlyArrayMonoidDrawing)([x.drawings, [y]]))
      : y._tag === 'Many'
      ? many(M.fold(readonlyArrayMonoidDrawing)([[x], y.drawings]))
      : many([x, y]),
  empty: many(readonlyArrayMonoidDrawing.empty)
}

const readOnlyArrayTraverseIO = ROA.readonlyArray.traverse(IO.io)

const applyStyle: <A>(
  oa: O.Option<A>,
  f: (a: A) => (ctx: CanvasRenderingContext2D) => IO.IO<CanvasRenderingContext2D>
) => (ctx: CanvasRenderingContext2D) => IO.IO<CanvasRenderingContext2D> = (fa, f) => (ctx) =>
  pipe(
    fa,
    O.fold(
      () => IO.of(ctx),
      (a) => pipe(ctx, f(a))
    )
  )

const renderShape: (shape: Shape) => (ctx: CanvasRenderingContext2D) => IO.IO<CanvasRenderingContext2D> = (shape) => {
  switch (shape._tag) {
    case 'Arc':
      return C.arc(shape)

    case 'Composite':
      return (ctx) =>
        pipe(
          readOnlyArrayTraverseIO(shape.shapes, (s) => pipe(ctx, renderShape(s))),
          IO.chain(() => IO.of(ctx))
        )

    case 'Path':
      return (ctx) =>
        pipe(
          shape.points,
          ROA.foldLeft(
            () => IO.of(ctx),
            (first, nexts) =>
              pipe(
                ctx,
                C.moveTo(first),
                IO.chain((ctx) => readOnlyArrayTraverseIO(nexts, (next) => pipe(ctx, C.lineTo(next)))),
                IO.chain(() =>
                  pipe(
                    shape.closed,
                    B.fold(
                      () => IO.of(ctx),
                      () => C.closePath(ctx)
                    )
                  )
                )
              )
          )
        )

    case 'Rect':
      return C.rect(shape)
  }
}

/**
 * Renders a `Drawing`.
 *
 * @since 1.0.0
 */
export const render: (drawing: Drawing) => (ctx: CanvasRenderingContext2D) => IO.IO<CanvasRenderingContext2D> = (
  drawing
) => {
  const go: (drawing: Drawing) => (ctx: CanvasRenderingContext2D) => IO.IO<CanvasRenderingContext2D> = (drawing) => {
    switch (drawing._tag) {
      case 'Clipped':
        return C.withContext(
          flow(C.beginPath, IO.chain(renderShape(drawing.shape)), IO.chain(C.clip()), IO.chain(go(drawing.drawing)))
        )

      case 'Fill':
        return C.withContext(
          flow(
            applyStyle(drawing.style.color, flow(toCss, C.setFillStyle)),
            IO.chain(C.fillPath(renderShape(drawing.shape)))
          )
        )

      case 'Many':
        return (ctx) =>
          pipe(
            readOnlyArrayTraverseIO(drawing.drawings, (d) => go(d)(ctx)),
            IO.chain(() => IO.of(ctx))
          )

      case 'Outline':
        return C.withContext(
          flow(
            applyStyle(drawing.style.color, flow(toCss, C.setStrokeStyle)),
            IO.chain(applyStyle(drawing.style.lineWidth, C.setLineWidth)),
            IO.chain(C.strokePath(renderShape(drawing.shape)))
          )
        )

      case 'Rotate':
        return C.withContext(flow(C.rotate(drawing.angle), IO.chain(go(drawing.drawing))))

      case 'Scale':
        return C.withContext(flow(C.scale(drawing.scaleX, drawing.scaleY), IO.chain(go(drawing.drawing))))

      case 'Text':
        return C.withContext(
          flow(
            pipe(showFont.show(drawing.font), C.setFont),
            IO.chain(applyStyle(drawing.style.color, flow(toCss, C.setFillStyle))),
            IO.chain(C.fillText(drawing.text, drawing.x, drawing.y))
          )
        )

      case 'Translate':
        return C.withContext(flow(C.translate(drawing.translateX, drawing.translateY), IO.chain(go(drawing.drawing))))

      case 'WithShadow':
        return C.withContext(
          flow(
            applyStyle(drawing.shadow.color, flow(toCss, C.setShadowColor)),
            IO.chain(applyStyle(drawing.shadow.blur, C.setShadowBlur)),
            IO.chain(
              applyStyle(drawing.shadow.offset, (o) => flow(C.setShadowOffsetX(o.x), IO.chain(C.setShadowOffsetY(o.y))))
            ),
            IO.chain(go(drawing.drawing))
          )
        )
    }
  }

  return go(drawing)
}
