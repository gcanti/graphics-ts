/**
 * Adapted from https://github.com/purescript-contrib/purescript-drawing
 *
 * @since 1.0.0
 */
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from 'fp-ts/lib/HKT'
import { Foldable, Foldable1, Foldable2, Foldable3 } from 'fp-ts/lib/Foldable'
import * as RA from 'fp-ts/lib/ReadonlyArray'
import * as M from 'fp-ts/lib/Monoid'

/**
 * Represents a shape that can be drawn.
 *
 * @since 1.0.0
 */
export type Shape = Arc | Composite | Ellipse | Path | Rect

/**
 * A single point consisting of `x` and `y` coordinates on a two-dimensional plane.
 *
 * @since 1.0.0
 */
export interface Point {
  /**
   * The x-axis coordinate.
   */
  readonly x: number

  /**
   * The y-axis coordinate.
   */
  readonly y: number
}

/**
 * Constructs a `Point` from x and y coordinates.
 *
 * @since 1.0.0
 */
export const point = (x: number, y: number): Point => ({ x, y })

/**
 * An arc with center coordinates `x` and `y`, radius `r`, and starting and ending angles `start` and `end`.
 *
 * @since 1.0.0
 */
export interface Arc {
  readonly _tag: 'Arc'

  /**
   * The position of the center of the arc on the x-axis.
   */
  readonly x: number

  /**
   * The position of the center of the arc on the y-axis.
   */
  readonly y: number

  /**
   * The radius of the arc.
   */
  readonly r: number

  /**
   * The starting angle of the arc.
   */
  readonly start: number

  /**
   * The ending angle of the arc.
   */
  readonly end: number
}

/**
 * Constructs an `Arc` shape.
 *
 * @since 1.0.0
 */
export const arc = (x: number, y: number, r: number, start: number, end: number): Arc => ({
  _tag: 'Arc',
  x,
  y,
  r,
  start,
  end
})

/**
 * Constructs an `Arc` that forms a circle shape.
 *
 * @since 1.0.0
 */
export const circle = (x: number, y: number, r: number): Arc => ({
  _tag: 'Arc',
  x,
  y,
  r,
  start: 0,
  end: Math.PI * 2
})

/**
 * Represents a shape that is composed of several other shapes.
 *
 * @since 1.0.0
 */
export interface Composite {
  readonly _tag: 'Composite'

  /**
   * The list of shapes that compose the composite shape.
   */
  readonly shapes: ReadonlyArray<Shape>
}

/**
 * Constructs a `Composite` shape.
 *
 * @since 1.0.0
 */
export const composite = (shapes: ReadonlyArray<Shape>): Composite => ({
  _tag: 'Composite',
  shapes
})

/**
 * An elliptical arc centered at (`x`, `y`) with the radii radiusX and radiusY specified by `rx` and `ry`.
 * The path starts at startAngle and ends at endAngle, specified by `start` and `end`, with the specified
 * `rotation` and travels in the direction given by `anticlockwise` (defaulting to clockwise).
 *
 * @since 1.0.0
 */
export interface Ellipse {
  readonly _tag: 'Ellipse'

  /**
   * The position of the center of the ellipse on the x-axis.
   */
  readonly x: number

  /**
   * The position of the center of the ellipse on the y-axis.
   */
  readonly y: number

  /**
   * The major-axis radius of the ellipse.
   */
  readonly rx: number

  /**
   * The minor-axis radius of the ellipse.
   */
  readonly ry: number

  /**
   * The starting angle of the arc.
   */
  readonly start: number

  /**
   * The ending angle of the arc.
   */
  readonly end: number

  /**
   * The rotation of the ellipse (specified in radians).
   */
  readonly rotation: number

  /**
   * If `true`, draws the `Ellipse` in a counter-clockwise direction. Defaults to `false` (clockwise).
   */
  readonly anticlockwise: boolean
}

/**
 * Constructs an `Ellipse` shape.
 *
 * @since 1.0.0
 */
export const ellipse = (
  x: number,
  y: number,
  rx: number,
  ry: number,
  rotation: number,
  start: number,
  end: number,
  anticlockwise: boolean = false
): Ellipse => ({
  _tag: 'Ellipse',
  x,
  y,
  rx,
  ry,
  rotation,
  start,
  end,
  anticlockwise
})

/**
 * A path is a list of points joined by line segments.
 *
 * @since 1.0.0
 */
export interface Path {
  readonly _tag: 'Path'

  /**
   * Indicates if the path is closed or open.
   */
  readonly closed: boolean

  /**
   * The list of points that make up the path.
   */
  readonly points: ReadonlyArray<Point>
}

/**
 * The `Monoid` instance for a `Path`.
 *
 * @since 1.0.0
 */
export const monoidPath: M.Monoid<Path> = M.getStructMonoid({
  _tag: { concat: () => 'Path', empty: 'Path' },
  closed: M.monoidAny,
  points: RA.getMonoid<Point>()
})

/**
 * Constructs a closed `Path` shape from a `Foldable` of `Point`s.
 *
 * @since 1.0.0
 */
export function closed<F extends URIS3>(foldable: Foldable3<F>): <E, A>(fa: Kind3<F, E, A, Point>) => Path
export function closed<F extends URIS2>(foldable: Foldable2<F>): <A>(fa: Kind2<F, A, Point>) => Path
export function closed<F extends URIS>(foldable: Foldable1<F>): (fa: Kind<F, Point>) => Path
export function closed<F>(F: Foldable<F>): (fa: HKT<F, Point>) => Path
export function closed<F>(F: Foldable<F>): (fa: HKT<F, Point>) => Path {
  return (fa) =>
    F.reduce(fa, monoidPath.empty, (b, a) => ({
      _tag: 'Path',
      closed: true,
      points: RA.snoc(b.points, a)
    }))
}

/**
 * Constructs an open `Path` shape from a `Foldable` of `Point`s.
 *
 * @since 1.0.0
 */
export function path<F extends URIS3>(foldable: Foldable3<F>): <E, A>(fa: Kind3<F, E, A, Point>) => Path
export function path<F extends URIS2>(foldable: Foldable2<F>): <A>(fa: Kind2<F, A, Point>) => Path
export function path<F extends URIS>(foldable: Foldable1<F>): (fa: Kind<F, Point>) => Path
export function path<F>(F: Foldable<F>): (fa: HKT<F, Point>) => Path
export function path<F>(F: Foldable<F>): (fa: HKT<F, Point>) => Path {
  return (fa) =>
    F.reduce(fa, monoidPath.empty, (b, a) => ({
      _tag: 'Path',
      closed: false,
      points: RA.snoc(b.points, a)
    }))
}

/**
 * Represents a rectangle with top-left corner coordinates at `x` and `y`.
 *
 * @since 1.0.0
 */
export interface Rect {
  readonly _tag: 'Rect'

  /**
   * The position of the top-left corner of the rectangle on the x-axis.
   */
  readonly x: number

  /**
   * The position of the top-left corner of the rectangle on the x-axis.
   */
  readonly y: number

  /**
   * The width of the rectangle.
   */
  readonly width: number

  /**
   * The height of the rectangle.
   */
  readonly height: number
}

/**
 * Constructs a `Rectangle` shape.
 *
 * @since 1.0.0
 */
export const rect = (x: number, y: number, width: number, height: number): Rect => ({
  _tag: 'Rect',
  x,
  y,
  width,
  height
})
