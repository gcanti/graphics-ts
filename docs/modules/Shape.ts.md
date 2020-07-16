---
title: Shape.ts
nav_order: 6
parent: Modules
---

## Shape overview

Adapted from https://github.com/purescript-contrib/purescript-drawing

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [angle](#angle)
  - [arc](#arc)
  - [circle](#circle)
  - [closed](#closed)
  - [composite](#composite)
  - [degrees](#degrees)
  - [ellipse](#ellipse)
  - [path](#path)
  - [point](#point)
  - [radians](#radians)
  - [rect](#rect)
- [instances](#instances)
  - [monoidPath](#monoidpath)
- [model](#model)
  - [Angle (type alias)](#angle-type-alias)
  - [Arc (interface)](#arc-interface)
  - [Composite (interface)](#composite-interface)
  - [Degrees (interface)](#degrees-interface)
  - [Ellipse (interface)](#ellipse-interface)
  - [Path (interface)](#path-interface)
  - [Point (interface)](#point-interface)
  - [Radians (interface)](#radians-interface)
  - [Rect (interface)](#rect-interface)
  - [Shape (type alias)](#shape-type-alias)

---

# constructors

## angle

Converts an angle into radians for use with the canvas.

**Signature**

```ts
export declare const angle: (angle: Angle) => number
```

Added in v1.0.0

## arc

Constructs an `Arc` shape.

**Signature**

```ts
export declare const arc: (x: number, y: number, r: number, start: Angle, end: Angle, anticlockwise?: boolean) => Arc
```

Added in v1.0.0

## circle

Constructs an `Arc` that forms a circle shape.

**Signature**

```ts
export declare const circle: (x: number, y: number, r: number) => Arc
```

Added in v1.0.0

## closed

Constructs a closed `Path` shape from a `Foldable` of `Point`s.

**Signature**

```ts
export declare function closed<F extends URIS3>(foldable: Foldable3<F>): <E, A>(fa: Kind3<F, E, A, Point>) => Path
export declare function closed<F extends URIS2>(foldable: Foldable2<F>): <A>(fa: Kind2<F, A, Point>) => Path
export declare function closed<F extends URIS>(foldable: Foldable1<F>): (fa: Kind<F, Point>) => Path
export declare function closed<F>(F: Foldable<F>): (fa: HKT<F, Point>) => Path
```

Added in v1.0.0

## composite

Constructs a `Composite` shape.

**Signature**

```ts
export declare const composite: (shapes: readonly Shape[]) => Composite
```

Added in v1.0.0

## degrees

Constructs an angle specified in degrees.

**Signature**

```ts
export declare const degrees: (degrees: number) => Degrees
```

Added in v1.0.0

## ellipse

Constructs an `Ellipse` shape.

**Signature**

```ts
export declare const ellipse: (
  x: number,
  y: number,
  rx: number,
  ry: number,
  rotation: Angle,
  start: Angle,
  end: Angle,
  anticlockwise?: boolean
) => Ellipse
```

Added in v1.0.0

## path

Constructs an open `Path` shape from a `Foldable` of `Point`s.

**Signature**

```ts
export declare function path<F extends URIS3>(foldable: Foldable3<F>): <E, A>(fa: Kind3<F, E, A, Point>) => Path
export declare function path<F extends URIS2>(foldable: Foldable2<F>): <A>(fa: Kind2<F, A, Point>) => Path
export declare function path<F extends URIS>(foldable: Foldable1<F>): (fa: Kind<F, Point>) => Path
export declare function path<F>(F: Foldable<F>): (fa: HKT<F, Point>) => Path
```

Added in v1.0.0

## point

Constructs a `Point` from x and y coordinates.

**Signature**

```ts
export declare const point: (x: number, y: number) => Point
```

Added in v1.0.0

## radians

Constructs an angle specified in degrees.

**Signature**

```ts
export declare const radians: (radians: number) => Radians
```

Added in v1.0.0

## rect

Constructs a `Rectangle` shape.

**Signature**

```ts
export declare const rect: (x: number, y: number, width: number, height: number) => Rect
```

Added in v1.0.0

# instances

## monoidPath

The `Monoid` instance for a `Path`.

**Signature**

```ts
export declare const monoidPath: M.Monoid<Path>
```

Added in v1.0.0

# model

## Angle (type alias)

Represents an angle specified in either degrees or radians.

**Signature**

```ts
export type Angle = Degrees | Radians
```

Added in v1.0.0

## Arc (interface)

An arc with center coordinates `x` and `y`, radius `r`, starting and ending angles `start` and `end`,
and travels in the direction given by `anticlockwise` (defaulting to clockwise)

**Signature**

```ts
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

  /**
   * If `true`, draws the `Arc` in a counter-clockwise direction. Defaults to `false` (clockwise).
   */
  readonly anticlockwise: boolean
}
```

Added in v1.0.0

## Composite (interface)

Represents a shape that is composed of several other shapes.

**Signature**

```ts
export interface Composite {
  readonly _tag: 'Composite'

  /**
   * The list of shapes that compose the composite shape.
   */
  readonly shapes: ReadonlyArray<Shape>
}
```

Added in v1.0.0

## Degrees (interface)

Represents an angle specified in degrees.

**Signature**

```ts
export interface Degrees {
  readonly _tag: 'Degrees'

  /**
   * The angle in degrees.
   */
  readonly degrees: number
}
```

Added in v1.0.0

## Ellipse (interface)

An elliptical arc centered at (`x`, `y`) with the radii radiusX and radiusY specified by `rx` and `ry`.
The path starts at startAngle and ends at endAngle, specified by `start` and `end`, with the specified
`rotation` and travels in the direction given by `anticlockwise` (defaulting to clockwise).

**Signature**

```ts
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
   * The rotation of the ellipse.
   */
  readonly rotation: number

  /**
   * If `true`, draws the `Ellipse` in a counter-clockwise direction. Defaults to `false` (clockwise).
   */
  readonly anticlockwise: boolean
}
```

Added in v1.0.0

## Path (interface)

A path is a list of points joined by line segments.

**Signature**

```ts
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
```

Added in v1.0.0

## Point (interface)

A single point consisting of `x` and `y` coordinates on a two-dimensional plane.

**Signature**

```ts
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
```

Added in v1.0.0

## Radians (interface)

Represents an angle specified in radians.

**Signature**

```ts
export interface Radians {
  readonly _tag: 'Radians'

  /**
   * The angle in radians.
   */
  readonly radians: number
}
```

Added in v1.0.0

## Rect (interface)

Represents a rectangle with top-left corner coordinates at `x` and `y`.

**Signature**

```ts
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
```

Added in v1.0.0

## Shape (type alias)

Represents a shape that can be drawn.

**Signature**

```ts
export type Shape = Arc | Composite | Ellipse | Path | Rect
```

Added in v1.0.0
