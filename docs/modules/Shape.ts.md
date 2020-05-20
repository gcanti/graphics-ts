---
title: Shape.ts
nav_order: 6
parent: Modules
---

# Shape overview

Adapted from https://github.com/purescript-contrib/purescript-drawing

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Arc (interface)](#arc-interface)
- [Composite (interface)](#composite-interface)
- [Path (interface)](#path-interface)
- [Point (interface)](#point-interface)
- [Rect (interface)](#rect-interface)
- [Shape (type alias)](#shape-type-alias)
- [arc](#arc)
- [circle](#circle)
- [closed](#closed)
- [composite](#composite)
- [monoidPath](#monoidpath)
- [path](#path)
- [point](#point)
- [rect](#rect)

---

# Arc (interface)

An arc with center coordinates `x` and `y`, radius `r`, and starting and ending angles `start` and `end`.

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
}
```

Added in v1.0.0

# Composite (interface)

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

# Path (interface)

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

# Point (interface)

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

# Rect (interface)

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

# Shape (type alias)

Represents a shape that can be drawn.

**Signature**

```ts
export type Shape = Path | Rect | Arc | Composite
```

Added in v1.0.0

# arc

Constructs an `Arc` shape.

**Signature**

```ts
export declare const arc: (x: number, y: number, r: number, start: number, end: number) => Arc
```

Added in v1.0.0

# circle

Constructs an `Arc` that forms a circle shape.

**Signature**

```ts
export declare const circle: (x: number, y: number, r: number) => Arc
```

Added in v1.0.0

# closed

Constructs a closed `Path` shape from a `Foldable` of `Point`s.

**Signature**

```ts
export declare function closed<F extends URIS3>(foldable: Foldable3<F>): <E, A>(fa: Kind3<F, E, A, Point>) => Path
export declare function closed<F extends URIS2>(foldable: Foldable2<F>): <A>(fa: Kind2<F, A, Point>) => Path
export declare function closed<F extends URIS>(foldable: Foldable1<F>): (fa: Kind<F, Point>) => Path
export declare function closed<F>(F: Foldable<F>): (fa: HKT<F, Point>) => Path
```

Added in v1.0.0

# composite

Constructs a `Composite` shape.

**Signature**

```ts
export declare const composite: (shapes: readonly Shape[]) => Composite
```

Added in v1.0.0

# monoidPath

The `Monoid` instance for a `Path`.

**Signature**

```ts
export declare const monoidPath: M.Monoid<Path>
```

Added in v1.0.0

# path

Constructs an open `Path` shape from a `Foldable` of `Point`s.

**Signature**

```ts
export declare function path<F extends URIS3>(foldable: Foldable3<F>): <E, A>(fa: Kind3<F, E, A, Point>) => Path
export declare function path<F extends URIS2>(foldable: Foldable2<F>): <A>(fa: Kind2<F, A, Point>) => Path
export declare function path<F extends URIS>(foldable: Foldable1<F>): (fa: Kind<F, Point>) => Path
export declare function path<F>(F: Foldable<F>): (fa: HKT<F, Point>) => Path
```

Added in v1.0.0

# point

Constructs a `Point` from x and y coordinates.

**Signature**

```ts
export declare const point: (x: number, y: number) => Point
```

Added in v1.0.0

# rect

Constructs a `Rectangle` shape.

**Signature**

```ts
export declare const rect: (x: number, y: number, width: number, height: number) => Rect
```

Added in v1.0.0
