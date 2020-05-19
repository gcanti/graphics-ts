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
  - upgrade to `fp-ts@2.x.x` and latest TypeScript (3.9.2) (@IMax153)
  - remove `free-canvas`
  - rename `canvas` module to `Canvas` (@IMax153)
    - inject the current `CanvasRenderingContext2D` into the `IO` wrapped by `withContext` (@IMax153)
  - rename `color` module to `Color` (@IMax153)
    - fix implementation of `toCss` (@IMax153)
    - fix `white` color
  - rename `font` module to `Font` (@IMax153)
    - convert `FontOptions` into static interface (@IMax153)
    - convert `Font` into static interface (@IMax153)
    - add `fontOptions` constructor (@IMax153)
    - add `font` constructor (@IMax153)
    - add `Show` instance for `FontOptions` (`ShowFontOptions`) (@IMax153)
    - add convenience function `showFontOptions` (@IMax153)
    - add `Show` instance for `Font` (`ShowFont`) (@IMax153)
    - add convenience function `showFont` (@IMax153)
  - add `Shape` module (@IMax153)
    - move `path` to `Shape` module (@IMax153)
    - move `closed` to `Shape` module (@IMax153)
    - move `rect` to `Shape` module (@IMax153)
    - move `arc` to `Shape` module (@IMax153)
    - move `circle` to `Shape` module (@IMax153)
    - move `composite` to `Shape` module (@IMax153)

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
