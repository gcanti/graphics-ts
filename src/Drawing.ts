/**
 * The `Drawing` module abstracts away the repetitive calls to the HTML Canvas API that are required
 * when using the `Canvas` module directly and instead allows us to be more declarative with our code.
 *
 * Taking the MDN example from the [Canvas][#canvas] documentation,
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
 * the `triangle` renderer above becomes the following
 *
 * ```ts
 * (...)
 *
 * import * as D from 'graphics-ts/lib/Drawing'
 *
 * const triangle: C.Render<void> = D.render(
 *   D.fill(
 *     S.path(RA.readonlyArray)([S.point(75, 50), S.point(100, 75), S.point(100, 25)]),
 *     D.fillStyle(Color.black)
 *   )
 * )
 *
 * render(canvasId)(triangle)()
 * ```
 *
 * Adapted from https://github.com/purescript-contrib/purescript-drawing
 *
 * @since 1.0.0
 */
import * as IO from 'fp-ts/lib/IO'
import * as M from 'fp-ts/lib/Monoid'
import * as O from 'fp-ts/lib/Option'
import * as RA from 'fp-ts/lib/ReadonlyArray'
import { flow } from 'fp-ts/lib/function'
import { pipe } from 'fp-ts/lib/pipeable'
import * as R from 'fp-ts-contrib/lib/ReaderIO'

import * as C from './Canvas'
import { toCss, Color } from './Color'
import { showFont, Font } from './Font'
import { Point, Shape } from './Shape'

const readonlyArrayMonoidDrawing = RA.getMonoid<Drawing>()
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

const traverseReaderIO = RA.readonlyArray.traverse(R.readerIO)

const applyStyle: <A>(
  fa: O.Option<A>,
  f: (a: A) => C.Render<CanvasRenderingContext2D>
) => C.Render<CanvasRenderingContext2D> = (fa, f) =>
  pipe(
    fa,
    O.fold(() => IO.of, f)
  )

const renderShape: (shape: Shape) => C.Render<CanvasRenderingContext2D> = (shape) => {
  switch (shape._tag) {
    case 'Arc':
      return C.arc(shape)

    case 'Composite':
      return pipe(
        traverseReaderIO(shape.shapes, renderShape),
        R.chain(() => R.ask())
      )

    case 'Path':
      return pipe(
        shape.points,
        RA.foldLeft(
          () => IO.of,
          (head, tail) =>
            pipe(
              C.moveTo(head),
              R.chain(() => traverseReaderIO(tail, C.lineTo)),
              R.chain(() => (shape.closed ? C.closePath : IO.of))
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
export const render: (drawing: Drawing) => C.Render<CanvasRenderingContext2D> = (drawing) => {
  const go: (drawing: Drawing) => C.Render<CanvasRenderingContext2D> = (d) => {
    switch (d._tag) {
      case 'Clipped':
        return C.withContext(
          pipe(
            C.beginPath,
            R.chain(() => renderShape(d.shape)),
            R.chain(() => C.clip()),
            R.chain(() => go(d.drawing))
          )
        )

      case 'Fill':
        return C.withContext(
          pipe(
            applyStyle(d.style.color, flow(toCss, C.setFillStyle)),
            R.chain(() => C.fillPath(renderShape(d.shape)))
          )
        )

      case 'Many':
        return pipe(
          traverseReaderIO(d.drawings, go),
          R.chain(() => R.ask())
        )

      case 'Outline':
        return C.withContext(
          pipe(
            applyStyle(d.style.color, flow(toCss, C.setStrokeStyle)),
            R.chain(() => applyStyle(d.style.lineWidth, C.setLineWidth)),
            R.chain(() => C.strokePath(renderShape(d.shape)))
          )
        )

      case 'Rotate':
        return C.withContext(
          pipe(
            C.rotate(d.angle),
            R.chain(() => go(d.drawing))
          )
        )

      case 'Scale':
        return C.withContext(
          pipe(
            C.scale(d.scaleX, d.scaleY),
            R.chain(() => go(d.drawing))
          )
        )

      case 'Text':
        return C.withContext(
          pipe(
            C.setFont(showFont.show(d.font)),
            R.chain(() => applyStyle(d.style.color, flow(toCss, C.setFillStyle))),
            R.chain(() => C.fillText(d.text, d.x, d.y))
          )
        )

      case 'Translate':
        return C.withContext(
          pipe(
            C.translate(d.translateX, d.translateY),
            R.chain(() => go(d.drawing))
          )
        )

      case 'WithShadow':
        return C.withContext(
          pipe(
            applyStyle(d.shadow.color, flow(toCss, C.setShadowColor)),
            R.chain(() => applyStyle(d.shadow.blur, C.setShadowBlur)),
            R.chain(() =>
              applyStyle(d.shadow.offset, (o) =>
                pipe(
                  C.setShadowOffsetX(o.x),
                  R.chain(() => C.setShadowOffsetY(o.y))
                )
              )
            ),
            R.chain(() => go(d.drawing))
          )
        )
    }
  }

  return go(drawing)
}

/**
 * Executes a `Render` effect for a canvas with the specified `canvasId`, or `onCanvasNotFound()` if a canvas with
 * the specified `canvasId` does not exist.
 *
 * @since 1.0.0
 */
export const renderTo = (canvasId: string, onCanvasNotFound: () => IO.IO<void>) => <A>(r: C.Render<A>): IO.IO<void> =>
  pipe(C.getCanvasElementById(canvasId), IO.chain(O.fold(onCanvasNotFound, flow(C.getContext2D, IO.chain(r)))))
