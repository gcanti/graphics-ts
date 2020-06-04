# Changelog

> **Tags:**
>
> - [New Feature]
> - [Bug Fix]
> - [Breaking Change]
> - [Documentation]
> - [Internal]
> - [Polish]
> - [Experimental]

**Note**: Gaps between patch versions are faulty/broken releases. **Note**: A feature tagged as Experimental is in a
high state of flux, you're at risk of it changing without notice.

# 1.0.0

- **Breaking Change**

  - upgrade to `fp-ts@2.x.x` and latest TypeScript (3.9.3) (@IMax153)
  - remove `free-canvas`
  - rename `canvas` module to `Canvas` (@IMax153)
    - inject the current `CanvasRenderingContext2D` into the `ReaderIO` wrapped by `withContext`, `fillPath`, and `strokePath` for convenience (@IMax153)
    - add `getLineDash`, `setLineDash`, and `setLineDashOffset` (@IMax153)
    - add `setImageSmoothingEnabled` (@IMax153)
    - add `isPointInPath` and `isPointInStroke` (@IMax153)
    - add `arcTo` and `ellipse` (@IMax153)
    - add `getTransform`, `setTransform`, and `setTransformMatrix` (@IMax153)
    - add `getTextBaseline` and `setTextBaseline` (@IMax153)
    - add `drawFocusIfNeeded` (@IMax153)
    - add `bind` (@IMax153)
  - rename `color` module to `Color` (@IMax153)
    - fix implementation of `toCss` (@IMax153)
    - fix `white` color
    - add `hex` (@IMax153)
  - rename `drawing` module to `Drawing` (@IMax153)
    - convert from classes to static interfaces with associated constructors for all `Drawings`s
    - fixed implementation of `Clipped` drawings (@IMax153)
    - add `renderTo` helper for executing a `Render` effect on a given canvas (@IMax153)
  - rename `font` module to `Font` (@IMax153)
    - convert from classes to static interfaces with associated constructors for `Font` and `FontOptions`
    - add `Show` instance for `FontOptions` (`showFontOptions`) (@IMax153)
    - add `Show` instance for `Font` (`showFont`) (@IMax153)
  - add `Shape` module (@IMax153)
    - move `path`, `closed`, `rect`, `arc`, `circle`, and `composite` to `Shape` module (@IMax153)
    - convert from classes to static interfaces with associated constructors for all `Shape`s (@IMax153)
    - add `Ellipse` shape with associated `ellipse` constructor (@IMax153)
    - add `degrees`, `radians`, and `angle` constructors for working with `Angle`s (@IMax153)

# 0.5.0

- **Breaking Change**
  - upgrade to `fp-ts@1.x.x` (@gcanti)

# 0.4.0

- **Breaking Change**
  - upgrade to latest `fp-ts` (0.6) and latest TypeScript (2.6) (@gcanti)

# 0.3.0

- **Breaking Change**
  - upgrade to latest `fp-ts` (0.5.1) and latest TypeScript (2.5.2) (@gcanti)

# 0.2.0

- **Breaking Change**
  - upgrade to latest `fp-ts` (@gcanti)

# 0.1.0

- **Breaking Change**
  - upgrade to latest `fp-ts` (`graphics-ts` APIs are not changed though) (@gcanti)
  - drop `lib-jsnext` folder
