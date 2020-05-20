import * as assert from 'assert'
import * as IO from 'fp-ts/lib/IO'
import * as M from 'fp-ts/lib/Monoid'
import * as O from 'fp-ts/lib/Option'
import * as ROA from 'fp-ts/lib/ReadonlyArray'
import { pipe } from 'fp-ts/lib/pipeable'

import { getContext2D } from '../src/Canvas'
import * as C from '../src/Color'
import * as D from '../src/Drawing'
import * as F from '../src/Font'
import * as S from '../src/Shape'

describe('Drawing', () => {
  describe('fillStyle', () => {
    it('should construct a fill style', () => {
      const color = C.hsla(140, 0.3, 0.5, 0.9)

      assert.deepStrictEqual(D.fillStyle(color), {
        color: O.some(color)
      })
    })
  })

  describe('monoidOutlineStyle', () => {
    it('should combine outline styles', () => {
      const color = C.hsla(140, 0.3, 0.5, 0.9)
      const lineWidth = 10

      assert.deepStrictEqual(D.monoidOutlineStyle.concat(D.outlineColor(color), D.lineWidth(lineWidth)), {
        color: O.some(color),
        lineWidth: O.some(lineWidth)
      })
    })
  })

  describe('outlineColor', () => {
    it('should construct an outline style from a color', () => {
      const color = C.hsla(140, 0.3, 0.5, 0.9)

      assert.deepStrictEqual(D.outlineColor(color), {
        color: O.some(color),
        lineWidth: O.none
      })
    })
  })

  describe('lineWidth', () => {
    it('should construct an outline style from a lineWidth', () => {
      const lineWidth = 10

      assert.deepStrictEqual(D.lineWidth(lineWidth), {
        color: O.none,
        lineWidth: O.some(lineWidth)
      })
    })
  })

  describe('monoidShadow', () => {
    it('should combine shadow styles', () => {
      const color = C.hsla(140, 0.3, 0.5, 0.9)
      const blur = 5
      const offset = S.point(5, 5)

      assert.deepStrictEqual(
        M.fold(D.monoidShadow)([D.shadowColor(color), D.shadowBlur(blur), D.shadowOffset(offset)]),
        {
          color: O.some(color),
          blur: O.some(blur),
          offset: O.some(offset)
        }
      )
    })
  })

  describe('shadowColor', () => {
    it('should construct a shadow from a color', () => {
      const color = C.hsla(140, 0.3, 0.5, 0.9)

      assert.deepStrictEqual(D.shadowColor(color), {
        color: O.some(color),
        blur: O.none,
        offset: O.none
      })
    })
  })

  describe('shadowBlur', () => {
    it('should construct a shadow from a blur radius', () => {
      const blur = 5

      assert.deepStrictEqual(D.shadowBlur(blur), {
        color: O.none,
        blur: O.some(blur),
        offset: O.none
      })
    })
  })

  describe('shadowOffset', () => {
    it('should construct a shadow from an offset point', () => {
      const offset = S.point(5, 5)

      assert.deepStrictEqual(D.shadowOffset(offset), {
        color: O.none,
        blur: O.none,
        offset: O.some(offset)
      })
    })
  })

  describe('fill', () => {
    it('should construct a fill', () => {
      const color = C.hsla(150, 0.5, 0.5, 0.8)
      const shape = S.rect(10, 20, 100, 200)
      const style = D.fillStyle(color)

      assert.deepStrictEqual(D.fill(shape, style), {
        _tag: 'Fill',
        shape,
        style
      })
    })
  })

  describe('outline', () => {
    it('should construct an outline', () => {
      const color = C.hsla(150, 0.5, 0.5, 0.8)
      const shape = S.rect(10, 20, 100, 200)
      const style = D.outlineColor(color)

      assert.deepStrictEqual(D.outline(shape, style), {
        _tag: 'Outline',
        shape,
        style
      })
    })
  })

  describe('text', () => {
    it('should construct a text', () => {
      const font = F.font('serif', 28)
      const style = D.fillStyle(C.black)

      assert.deepStrictEqual(D.text(font, 10, 100, style, 'Hello world!'), {
        _tag: 'Text',
        font,
        x: 10,
        y: 100,
        style,
        text: 'Hello world!'
      })
    })
  })

  describe('many', () => {
    it('should construct an object containing many drawings', () => {
      const fill = D.fill(S.rect(10, 20, 100, 200), D.fillStyle(C.white))
      const outline = D.outline(S.rect(10, 20, 100, 200), D.outlineColor(C.black))
      const text = D.text(F.font('serif', 28), 10, 100, D.fillStyle(C.black), 'Hello world!')

      assert.deepStrictEqual(D.many([fill, outline, text]), {
        _tag: 'Many',
        drawings: [fill, outline, text]
      })
    })
  })

  describe('scale', () => {
    it('should construct a scaled drawing', () => {
      const drawing = D.outline(S.rect(10, 20, 100, 200), D.outlineColor(C.black))
      const scale = D.scale(10, 20, drawing)

      assert.deepStrictEqual(scale, {
        _tag: 'Scale',
        scaleX: 10,
        scaleY: 20,
        drawing
      })
    })
  })

  describe('translate', () => {
    it('should construct a translated drawing', () => {
      const drawing = D.outline(S.rect(10, 20, 100, 200), D.outlineColor(C.black))
      const translate = D.translate(10, 20, drawing)

      assert.deepStrictEqual(translate, {
        _tag: 'Translate',
        translateX: 10,
        translateY: 20,
        drawing
      })
    })
  })

  describe('rotate', () => {
    it('should construct a rotated drawing', () => {
      const drawing = D.outline(S.rect(10, 20, 100, 200), D.outlineColor(C.black))
      const rotate = D.rotate(90, drawing)

      assert.deepStrictEqual(rotate, {
        _tag: 'Rotate',
        angle: 90,
        drawing
      })
    })
  })

  describe('clipped', () => {
    it('should construct a clipped drawing', () => {
      const shape = S.rect(50, 50, 100, 100)
      const drawing = D.outline(S.rect(10, 20, 100, 200), D.outlineColor(C.black))
      const clipped = D.clipped(shape, drawing)

      assert.deepStrictEqual(clipped, {
        _tag: 'Clipped',
        shape,
        drawing
      })
    })
  })

  describe('withShadow', () => {
    it('should construct a drawing with a shadow', () => {
      const shadow = M.fold(D.monoidShadow)([D.shadowColor(C.black), D.shadowBlur(5), D.shadowOffset(S.point(5, 5))])
      const drawing = D.outline(S.rect(10, 20, 100, 200), D.outlineColor(C.black))
      const withShadow = D.withShadow(shadow, drawing)

      assert.deepStrictEqual(withShadow, {
        _tag: 'WithShadow',
        shadow,
        drawing
      })
    })
  })

  describe('monoidDrawing', () => {
    it('should combine several drawings', () => {
      const fill = D.fill(S.rect(10, 20, 100, 200), D.fillStyle(C.white))
      const outline = D.outline(S.rect(10, 20, 100, 200), D.outlineColor(C.black))
      const text = D.text(F.font('serif', 28), 10, 100, D.fillStyle(C.black), 'Hello world!')
      const many = D.many([fill, outline])

      // concat(Drawing, Drawing)
      assert.deepStrictEqual(D.monoidDrawing.concat(fill, outline), {
        _tag: 'Many',
        drawings: [fill, outline]
      })

      // concat(Many, Drawing)
      assert.deepStrictEqual(D.monoidDrawing.concat(many, text), {
        _tag: 'Many',
        drawings: [fill, outline, text]
      })

      // concat(Drawing, Many)
      assert.deepStrictEqual(D.monoidDrawing.concat(text, many), {
        _tag: 'Many',
        drawings: [text, fill, outline]
      })

      // concat(Many, Many)
      assert.deepStrictEqual(D.monoidDrawing.concat(many, many), {
        _tag: 'Many',
        drawings: [fill, outline, fill, outline]
      })
    })
  })

  describe('render', () => {
    const CANVAS_ID = 'canvas'
    const TEST_CANVAS_ID = 'test-canvas'
    const CANVAS_WIDTH = 400
    const CANVAS_HEIGHT = 600

    let canvas: HTMLCanvasElement
    let ctx: CanvasRenderingContext2D
    let testCtx: CanvasRenderingContext2D

    beforeEach(() => {
      document.body.innerHTML = `
        <canvas
          id="${CANVAS_ID}"
          width="${CANVAS_WIDTH}"
          height="${CANVAS_HEIGHT}"
        />
        <canvas
          id="${TEST_CANVAS_ID}"
          width="${CANVAS_WIDTH}"
          height="${CANVAS_HEIGHT}"
        />
      `
      canvas = document.getElementById(CANVAS_ID) as HTMLCanvasElement
      const testCanvas = document.getElementById(TEST_CANVAS_ID) as HTMLCanvasElement
      ctx = canvas.getContext('2d') as CanvasRenderingContext2D
      testCtx = testCanvas.getContext('2d') as CanvasRenderingContext2D
    })

    it('should render a clipped drawing', () => {
      const mask = S.rect(50, 50, 50, 50)
      const outline = S.rect(10, 20, 20, 20)
      const color = D.outlineColor(C.black)
      const outlineRect = D.outline(outline, color)
      const drawing = D.clipped(mask, outlineRect)

      // Test
      pipe(canvas, getContext2D, IO.chain(D.render(drawing)))()

      // Actual
      testCtx.save()
      testCtx.beginPath()
      testCtx.rect(mask.x, mask.y, mask.width, mask.height)
      testCtx.clip()
      testCtx.save()
      testCtx.strokeStyle = pipe(C.black, C.toCss)
      testCtx.beginPath()
      testCtx.rect(outline.x, outline.y, outline.width, outline.height)
      testCtx.stroke()
      testCtx.restore()
      testCtx.restore()

      assert.deepStrictEqual(ctx.__getEvents(), testCtx.__getEvents())
    })

    it('should render a filled drawing', () => {
      const shape = S.rect(50, 50, 100, 100)
      const drawing = D.fill(shape, D.fillStyle(C.white))

      // Test
      pipe(canvas, getContext2D, IO.chain(D.render(drawing)))()

      // Actual
      testCtx.save()
      testCtx.fillStyle = pipe(C.white, C.toCss)
      testCtx.beginPath()
      testCtx.rect(shape.x, shape.y, shape.width, shape.height)
      testCtx.fill()
      testCtx.restore()

      assert.deepStrictEqual(ctx.__getEvents(), testCtx.__getEvents())
    })

    it('should render many drawings', () => {
      const rect = S.rect(10, 20, 100, 200)
      const fill = D.fill(rect, D.fillStyle(C.white))
      const outline = D.outline(rect, D.outlineColor(C.black))
      const emptyLine = D.fill(S.path(ROA.readonlyArray)([]), D.fillStyle(C.black))
      const line = D.fill(
        S.closed(ROA.readonlyArray)([S.point(1, 2), S.point(3, 4), S.point(5, 6)]),
        D.fillStyle(C.black)
      )
      const many = D.many([fill, outline, emptyLine, line])

      // Test
      pipe(canvas, getContext2D, IO.chain(D.render(many)))()

      // Actual
      testCtx.save()
      testCtx.fillStyle = pipe(C.white, C.toCss)
      testCtx.beginPath()
      testCtx.rect(rect.x, rect.y, rect.width, rect.height)
      testCtx.fill()
      testCtx.restore()
      testCtx.save()
      testCtx.strokeStyle = pipe(C.black, C.toCss)
      testCtx.beginPath()
      testCtx.rect(rect.x, rect.y, rect.width, rect.height)
      testCtx.stroke()
      testCtx.restore()
      testCtx.save()
      testCtx.fillStyle = pipe(C.black, C.toCss)
      testCtx.beginPath()
      testCtx.fill()
      testCtx.restore()
      testCtx.save()
      testCtx.fillStyle = pipe(C.black, C.toCss)
      testCtx.beginPath()
      testCtx.moveTo(1, 2)
      testCtx.lineTo(3, 4)
      testCtx.lineTo(5, 6)
      testCtx.closePath()
      testCtx.fill()
      testCtx.restore()

      assert.deepStrictEqual(ctx.__getEvents(), testCtx.__getEvents())
    })

    it('should render an outlined drawing', () => {
      const shape = S.rect(50, 50, 100, 100)
      const drawing = D.outline(shape, D.outlineColor(C.white))

      // Test
      pipe(canvas, getContext2D, IO.chain(D.render(drawing)))()

      // Actual
      testCtx.save()
      testCtx.strokeStyle = pipe(C.white, C.toCss)
      testCtx.beginPath()
      testCtx.rect(shape.x, shape.y, shape.width, shape.height)
      testCtx.stroke()
      testCtx.restore()

      assert.deepStrictEqual(ctx.__getEvents(), testCtx.__getEvents())
    })

    it('should render a rotated drawing', () => {
      const shape = S.rect(50, 50, 100, 100)
      const drawing = D.rotate(90, D.outline(shape, D.outlineColor(C.white)))

      // Test
      pipe(canvas, getContext2D, IO.chain(D.render(drawing)))()

      // Actual
      testCtx.save()
      testCtx.rotate(90)
      testCtx.save()
      testCtx.strokeStyle = pipe(C.white, C.toCss)
      testCtx.beginPath()
      testCtx.rect(shape.x, shape.y, shape.width, shape.height)
      testCtx.stroke()
      testCtx.restore()
      testCtx.restore()

      assert.deepStrictEqual(ctx.__getEvents(), testCtx.__getEvents())
    })

    it('should render a scaled drawing', () => {
      const scaleX = 5
      const scaleY = 5
      const shape = S.arc(10, 20, 5, 100, 200)
      const drawing = D.scale(scaleX, scaleY, D.outline(shape, D.outlineColor(C.white)))

      // Test
      pipe(canvas, getContext2D, IO.chain(D.render(drawing)))()

      // Actual
      testCtx.save()
      testCtx.scale(scaleX, scaleY)
      testCtx.save()
      testCtx.strokeStyle = pipe(C.white, C.toCss)
      testCtx.beginPath()
      testCtx.arc(shape.x, shape.y, shape.r, shape.start, shape.end)
      testCtx.stroke()
      testCtx.restore()
      testCtx.restore()

      assert.deepStrictEqual(ctx.__getEvents(), testCtx.__getEvents())
    })

    it('should render text', () => {
      const x = 10
      const y = 100
      const text = 'Hello world!'
      const font = F.font('serif', 28)
      const style = D.fillStyle(C.black)
      const drawing = D.text(font, x, y, style, text)

      // Test
      pipe(canvas, getContext2D, IO.chain(D.render(drawing)))()

      // Actual
      testCtx.save()
      testCtx.font = pipe(font, F.showFont)
      testCtx.fillStyle = pipe(C.black, C.toCss)
      testCtx.fillText(text, x, y)
      testCtx.restore()

      assert.deepStrictEqual(ctx.__getEvents(), testCtx.__getEvents())
    })

    it('should render a translated drawing', () => {
      const translateX = 5
      const translateY = 5
      const shape = S.rect(50, 50, 100, 100)
      const drawing = D.translate(translateX, translateY, D.outline(shape, D.outlineColor(C.white)))

      // Test
      pipe(canvas, getContext2D, IO.chain(D.render(drawing)))()

      // Actual
      testCtx.save()
      testCtx.translate(translateX, translateY)
      testCtx.save()
      testCtx.strokeStyle = pipe(C.white, C.toCss)
      testCtx.beginPath()
      testCtx.rect(shape.x, shape.y, shape.width, shape.height)
      testCtx.stroke()
      testCtx.restore()
      testCtx.restore()

      assert.deepStrictEqual(ctx.__getEvents(), testCtx.__getEvents())
    })

    it('should render a drawing with a shadow', () => {
      const blurRadius = 10
      const offset = S.point(2, 2)
      const rect = S.rect(10, 20, 100, 200)
      const path = S.path(ROA.readonlyArray)([S.point(1, 2), S.point(3, 4), S.point(5, 6)])
      const shape = S.composite([rect, path])
      const shadow = M.fold(D.monoidShadow)([D.shadowColor(C.black), D.shadowBlur(blurRadius), D.shadowOffset(offset)])
      const drawing = D.withShadow(shadow, D.outline(shape, D.outlineColor(C.white)))

      // Test
      pipe(canvas, getContext2D, IO.chain(D.render(drawing)))()

      // Actual
      testCtx.save()
      testCtx.shadowColor = pipe(C.black, C.toCss)
      testCtx.shadowBlur = blurRadius
      testCtx.shadowOffsetX = offset.x
      testCtx.shadowOffsetY = offset.y
      testCtx.save()
      testCtx.strokeStyle = pipe(C.white, C.toCss)
      testCtx.beginPath()
      testCtx.rect(rect.x, rect.y, rect.width, rect.height)
      testCtx.moveTo(1, 2)
      testCtx.lineTo(3, 4)
      testCtx.lineTo(5, 6)
      testCtx.stroke()
      testCtx.restore()
      testCtx.restore()

      assert.deepStrictEqual(ctx.__getEvents(), testCtx.__getEvents())
    })
  })
})
