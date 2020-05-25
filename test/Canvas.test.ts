import * as assert from 'assert'
import * as O from 'fp-ts/lib/Option'
import * as IO from 'fp-ts/lib/IO'
import { pipe } from 'fp-ts/lib/pipeable'

import * as C from '../src/Canvas'
import * as Color from '../src/Color'
import * as F from '../src/Font'
import * as S from '../src/Shape'
import { assertCalledWith } from './utils'
import { flow } from 'fp-ts/lib/function'

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

describe('Canvas', () => {
  describe('unsafeGetCanvasElementById', () => {
    it('should unsafely return the canvas element if it exists', () => {
      assert.ok(C.unsafeGetCanvasElementById(CANVAS_ID) instanceof HTMLCanvasElement)
    })
  })

  describe('unsafeGetContext2D', () => {
    it('should unsafely return the two-dimensional canvas context', () => {
      assert.ok(C.unsafeGetContext2D(canvas) instanceof CanvasRenderingContext2D)
    })
  })

  describe('getCanvasElementById', () => {
    it('should return the canvas if it exists', () => {
      assert.deepStrictEqual(C.getCanvasElementById(CANVAS_ID)(), O.some(canvas))
    })

    it('should return None if the canvas does not exist', () => {
      assert.deepStrictEqual(C.getCanvasElementById('non-existant')(), O.none)
    })
  })

  describe('getContext2D', () => {
    it('should return the two-dimensional canvas context', () => {
      assert.deepStrictEqual(C.getContext2D(canvas)(), canvas.getContext('2d'))
    })
  })

  describe('getWidth', () => {
    it('should get the width of the canvas', () => {
      assert.strictEqual(C.getWidth(canvas)(), canvas.width)
    })
  })

  describe('getHeight', () => {
    it('should get the height of the canvas', () => {
      assert.strictEqual(C.getHeight(canvas)(), canvas.height)
    })
  })

  describe('setWidth', () => {
    it('should set the width of the canvas', () => {
      const width = 800

      C.setWidth(width)(canvas)()

      assert.strictEqual(width, canvas.width)
    })
  })

  describe('setHeight', () => {
    it('should set the height of the canvas', () => {
      const height = 1000

      C.setHeight(height)(canvas)()

      assert.strictEqual(height, canvas.height)
    })
  })

  describe('getDimensions', () => {
    it('should get the dimensions of the canvas', () => {
      const { height, width } = canvas

      assert.deepStrictEqual(C.getDimensions(canvas)(), { height, width })
    })
  })

  describe('setDimensions', () => {
    it('should set the dimensions of the canvas', () => {
      const dimensions = { height: 1000, width: 800 }

      C.setDimensions(dimensions)(canvas)()

      assert.deepStrictEqual(dimensions, { height: canvas.height, width: canvas.width })
    })
  })

  describe('toDataURL', () => {
    it('should get a data URL for the canvas', () => {
      const dataURL = C.toDataURL(canvas)()

      assert.deepStrictEqual(dataURL, 'data:image/png;base64,00')
    })
  })

  describe('setLineWidth', () => {
    it('should set the current line width', () => {
      const lineWidth = 5

      pipe(canvas, C.getContext2D, IO.chain(C.setLineWidth(lineWidth)))()

      assert.strictEqual(ctx.lineWidth, lineWidth)
    })
  })

  describe('setFillStyle', () => {
    it('should set the current fill style', () => {
      const fillStyle = '#00f'

      pipe(canvas, C.getContext2D, IO.chain(C.setFillStyle(fillStyle)))()

      assert.strictEqual(ctx.fillStyle, fillStyle)
    })
  })

  describe('setStrokeStyle', () => {
    it('should set the current stroke style', () => {
      const strokeStyle = '#00f'

      pipe(canvas, C.getContext2D, IO.chain(C.setStrokeStyle(strokeStyle)))()

      assert.strictEqual(ctx.strokeStyle, strokeStyle)
    })
  })

  describe('setShadowColor', () => {
    it('should set the current shadow color', () => {
      const shadowColor = '#00f'

      pipe(canvas, C.getContext2D, IO.chain(C.setShadowColor(shadowColor)))()

      assert.strictEqual(ctx.shadowColor, shadowColor)
    })
  })

  describe('setShadowBlur', () => {
    it('should set the current shadow blur', () => {
      const blur = 10

      pipe(canvas, C.getContext2D, IO.chain(C.setShadowBlur(blur)))()

      assert.strictEqual(ctx.shadowBlur, blur)
    })
  })

  describe('setShadowOffsetX', () => {
    it('should set the current x-axis shadow offset', () => {
      const shadowOffsetX = 20

      pipe(canvas, C.getContext2D, IO.chain(C.setShadowOffsetX(shadowOffsetX)))()

      assert.strictEqual(ctx.shadowOffsetX, shadowOffsetX)
    })
  })

  describe('setShadowOffsetY', () => {
    it('should set the current y-axis shadow offset', () => {
      const shadowOffsetY = 20

      pipe(canvas, C.getContext2D, IO.chain(C.setShadowOffsetY(shadowOffsetY)))()

      assert.strictEqual(ctx.shadowOffsetY, shadowOffsetY)
    })
  })

  describe('setMiterLimit', () => {
    it('should set the current miter limit', () => {
      const miterLimit = 10

      pipe(canvas, C.getContext2D, IO.chain(C.setMiterLimit(miterLimit)))()

      assert.strictEqual(ctx.miterLimit, miterLimit)
    })
  })

  describe('setLineCap', () => {
    it('should set the current line cap', () => {
      const lineCap = 'round'

      pipe(canvas, C.getContext2D, IO.chain(C.setLineCap(lineCap)))()

      assert.strictEqual(ctx.lineCap, lineCap)
    })
  })

  describe('setLineJoin', () => {
    it('should set the current line join', () => {
      const lineJoin = 'round'

      pipe(canvas, C.getContext2D, IO.chain(C.setLineJoin(lineJoin)))()

      assert.strictEqual(ctx.lineJoin, lineJoin)
    })
  })

  describe('setGlobalCompositeOperation', () => {
    it('should set the current global composite operation', () => {
      const globalCompositeOperation = 'multiply'

      pipe(canvas, C.getContext2D, IO.chain(C.setGlobalCompositeOperation(globalCompositeOperation)))()

      assert.strictEqual(ctx.globalCompositeOperation, globalCompositeOperation)
    })
  })

  describe('setGlobalAlpha', () => {
    it('should set the current global alpha', () => {
      const globalAlpha = 0.5

      pipe(canvas, C.getContext2D, IO.chain(C.setGlobalAlpha(globalAlpha)))()

      assert.strictEqual(ctx.globalAlpha, globalAlpha)
    })
  })

  describe('beginPath', () => {
    it('should begin drawing a path', () => {
      // Test
      pipe(canvas, C.getContext2D, IO.chain(C.beginPath))()

      // Actual
      testCtx.beginPath()

      assertCalledWith(ctx.beginPath as jest.Mock)

      assert.deepStrictEqual(ctx.__getEvents(), testCtx.__getEvents())
    })
  })

  describe('stroke', () => {
    it('should stroke a path', () => {
      // Test
      pipe(canvas, C.getContext2D, IO.chain(C.beginPath), IO.chain(C.stroke()))()

      // Actual
      testCtx.beginPath()
      testCtx.stroke()

      assertCalledWith(ctx.stroke as jest.Mock)

      assert.deepStrictEqual(ctx.__getDrawCalls(), testCtx.__getDrawCalls())
    })

    it('should stroke a specified path', () => {
      const path = new Path2D()
      path.rect(10, 10, 100, 100)

      // Test
      pipe(canvas, C.getContext2D, IO.chain(C.beginPath), IO.chain(C.stroke(path)))()

      // Actual
      testCtx.beginPath()
      testCtx.stroke(path)

      assertCalledWith(ctx.stroke as jest.Mock, path)

      assert.deepStrictEqual(ctx.__getDrawCalls(), testCtx.__getDrawCalls())
    })
  })

  describe('fill', () => {
    it('should fill a path', () => {
      const fillRule = 'nonzero'

      // Test
      pipe(canvas, C.getContext2D, IO.chain(C.beginPath), IO.chain(C.fill(fillRule)))()

      // Actual
      testCtx.beginPath()
      testCtx.fill(fillRule)

      assertCalledWith(ctx.fill as jest.Mock, fillRule)

      assert.deepStrictEqual(ctx.__getDrawCalls(), testCtx.__getDrawCalls())
    })

    it('should fill a specified path', () => {
      const fillRule = 'nonzero'
      const path = new Path2D()
      path.rect(10, 10, 100, 100)

      // Test
      pipe(canvas, C.getContext2D, IO.chain(C.beginPath), IO.chain(C.fill(fillRule, path)))()

      // Actual
      testCtx.beginPath()
      testCtx.fill(path, fillRule)

      assertCalledWith(ctx.fill as jest.Mock, path, fillRule)

      assert.deepStrictEqual(ctx.__getDrawCalls(), testCtx.__getDrawCalls())
    })
  })

  describe('clip', () => {
    it('should clip a path', () => {
      // Test
      pipe(canvas, C.getContext2D, IO.chain(C.beginPath), IO.chain(C.clip()))()

      // Actual
      testCtx.beginPath()
      testCtx.clip()

      assertCalledWith(ctx.clip as jest.Mock)

      assert.deepStrictEqual(ctx.__getDrawCalls(), testCtx.__getDrawCalls())
    })

    it('should clip a path with a specified fill rule', () => {
      const fillRule = 'nonzero'

      // Test
      pipe(canvas, C.getContext2D, IO.chain(C.beginPath), IO.chain(C.clip(fillRule)))()

      // Actual
      testCtx.beginPath()
      testCtx.clip(fillRule)

      assertCalledWith(ctx.clip as jest.Mock, fillRule)

      assert.deepStrictEqual(ctx.__getDrawCalls(), testCtx.__getDrawCalls())
    })

    it('should clip a specified path', () => {
      const fillRule = 'nonzero'
      const path = new Path2D()
      path.rect(10, 10, 100, 100)

      // Test
      pipe(canvas, C.getContext2D, IO.chain(C.beginPath), IO.chain(C.clip(fillRule, path)))()

      // Actual
      testCtx.beginPath()
      testCtx.clip(path, fillRule)

      assertCalledWith(ctx.clip as jest.Mock, path, fillRule)

      assert.deepStrictEqual(ctx.__getDrawCalls(), testCtx.__getDrawCalls())
    })
  })

  describe('lineTo', () => {
    it('should draw a line to the specified point', () => {
      const p = S.point(10, 10)

      // Test
      pipe(canvas, C.getContext2D, IO.chain(C.beginPath), IO.chain(C.lineTo(p)), IO.chain(C.stroke()))()

      // Actual
      testCtx.beginPath()
      testCtx.lineTo(p.x, p.y)
      testCtx.stroke()

      assertCalledWith(ctx.lineTo as jest.Mock, 10, 10)

      assert.deepStrictEqual(ctx.__getDrawCalls(), testCtx.__getDrawCalls())
    })
  })

  describe('moveTo', () => {
    it('should draw a line to the specified point', () => {
      const p = S.point(10, 10)

      // Test
      pipe(canvas, C.getContext2D, IO.chain(C.beginPath), IO.chain(C.moveTo(p)), IO.chain(C.stroke()))()

      // Actual
      testCtx.beginPath()
      testCtx.moveTo(p.x, p.y)
      testCtx.stroke()

      assertCalledWith(ctx.moveTo as jest.Mock, 10, 10)

      assert.deepStrictEqual(ctx.__getDrawCalls(), testCtx.__getDrawCalls())
    })
  })

  describe('closePath', () => {
    it('should close the current path', () => {
      // Test
      pipe(canvas, C.getContext2D, IO.chain(C.beginPath), IO.chain(C.stroke()), IO.chain(C.closePath))()

      // Actual
      testCtx.beginPath()
      testCtx.stroke()
      testCtx.closePath()

      assertCalledWith(ctx.closePath as jest.Mock)

      assert.deepStrictEqual(ctx.__getDrawCalls(), testCtx.__getDrawCalls())
    })
  })

  describe('strokePath', () => {
    it('should begin and stroke a path', () => {
      const color = pipe(Color.white, Color.toCss)
      const first = S.point(20, 20)
      const second = S.point(10, 10)

      pipe(
        canvas,
        C.getContext2D,
        IO.chain(C.strokePath(flow(C.setStrokeStyle(color), IO.chain(C.moveTo(first)), IO.chain(C.lineTo(second)))))
      )()

      // Actual
      testCtx.beginPath()
      testCtx.strokeStyle = color
      testCtx.moveTo(first.x, first.y)
      testCtx.lineTo(second.x, second.y)
      testCtx.stroke()

      assert.deepStrictEqual(ctx.__getDrawCalls(), testCtx.__getDrawCalls())
    })
  })

  describe('fillPath', () => {
    it('should begin and stroke a path', () => {
      const color = pipe(Color.black, Color.toCss)
      const first = S.point(20, 20)
      const second = S.point(10, 10)

      // Test
      pipe(
        canvas,
        C.getContext2D,
        IO.chain(C.fillPath(flow(C.setFillStyle(color), IO.chain(C.moveTo(first)), IO.chain(C.lineTo(second)))))
      )()

      // Actual
      testCtx.beginPath()
      testCtx.fillStyle = color
      testCtx.moveTo(first.x, first.y)
      testCtx.lineTo(second.x, second.y)
      testCtx.fill()

      assert.deepStrictEqual(ctx.__getDrawCalls(), testCtx.__getDrawCalls())
    })
  })

  describe('arc', () => {
    it('should render an arc to the canvas', () => {
      const arc = S.arc(100, 75, 50, 0, 2 * Math.PI)

      // Test
      pipe(canvas, C.getContext2D, IO.chain(C.arc(arc)), IO.chain(C.stroke()))()

      // Actual
      testCtx.arc(arc.x, arc.y, arc.r, arc.start, arc.end)
      testCtx.stroke()

      assertCalledWith(ctx.arc as jest.Mock, arc.x, arc.y, arc.r, arc.start, arc.end)

      assert.deepStrictEqual(ctx.__getDrawCalls(), testCtx.__getDrawCalls())
    })
  })

  describe('rect', () => {
    it('should render a rectangle to the canvas', () => {
      const rect = S.rect(10, 20, 150, 100)

      // Test
      pipe(canvas, C.getContext2D, IO.chain(C.rect(rect)), IO.chain(C.fill()))()

      // Actual
      testCtx.rect(rect.x, rect.y, rect.width, rect.height)
      testCtx.fill()

      assertCalledWith(ctx.rect as jest.Mock, rect.x, rect.y, rect.width, rect.height)

      assert.deepStrictEqual(ctx.__getDrawCalls(), testCtx.__getDrawCalls())
    })
  })

  describe('fillRect', () => {
    it('should render a filled rectangle to the canvas', () => {
      const rect = S.rect(10, 20, 150, 100)

      // Test
      pipe(canvas, C.getContext2D, IO.chain(C.fillRect(rect)))()

      // Actual
      testCtx.fillRect(rect.x, rect.y, rect.width, rect.height)

      assertCalledWith(ctx.fillRect as jest.Mock, rect.x, rect.y, rect.width, rect.height)

      assert.deepStrictEqual(ctx.__getDrawCalls(), testCtx.__getDrawCalls())
    })
  })

  describe('strokeRect', () => {
    it('should render an outlined rectangle to the canvas', () => {
      const rect = S.rect(10, 20, 150, 100)

      // Test
      pipe(canvas, C.getContext2D, IO.chain(C.strokeRect(rect)))()

      // Actual
      testCtx.strokeRect(rect.x, rect.y, rect.width, rect.height)

      assertCalledWith(ctx.strokeRect as jest.Mock, rect.x, rect.y, rect.width, rect.height)

      assert.deepStrictEqual(ctx.__getDrawCalls(), testCtx.__getDrawCalls())
    })
  })

  describe('clearRect', () => {
    it('should render a filled rectangle to the canvas', () => {
      const rect = S.rect(10, 20, 150, 100)

      // Test
      pipe(canvas, C.getContext2D, IO.chain(C.clearRect(rect)))()

      // Actual
      testCtx.clearRect(rect.x, rect.y, rect.width, rect.height)

      assertCalledWith(ctx.clearRect as jest.Mock, rect.x, rect.y, rect.width, rect.height)

      assert.deepStrictEqual(ctx.__getDrawCalls(), testCtx.__getDrawCalls())
    })
  })

  describe('scale', () => {
    it('should apply scale to the canvas', () => {
      const scaleX = 9
      const scaleY = 3
      const rect = S.rect(10, 10, 8, 20)

      // Test
      pipe(canvas, C.getContext2D, IO.chain(C.scale(scaleX, scaleY)), IO.chain(C.fillRect(rect)))()

      // Actual
      testCtx.scale(scaleX, scaleY)
      testCtx.fillRect(rect.x, rect.y, rect.width, rect.height)

      assertCalledWith(ctx.scale as jest.Mock, scaleX, scaleY)

      assert.deepStrictEqual(ctx.__getDrawCalls(), testCtx.__getDrawCalls())
    })
  })

  describe('rotate', () => {
    it('should apply rotation to the canvas', () => {
      const angle = (45 * Math.PI) / 180
      const rect = S.rect(10, 10, 8, 20)

      // Test
      pipe(canvas, C.getContext2D, IO.chain(C.rotate(angle)), IO.chain(C.fillRect(rect)))()

      // Actual
      testCtx.rotate(angle)
      testCtx.fillRect(rect.x, rect.y, rect.width, rect.height)

      assertCalledWith(ctx.rotate as jest.Mock, angle)

      assert.deepStrictEqual(ctx.__getDrawCalls(), testCtx.__getDrawCalls())
    })
  })

  describe('translate', () => {
    it('should apply translation to the canvas context', () => {
      const translateX = 110
      const translateY = 30
      const rect = S.rect(10, 10, 8, 20)

      // Test
      pipe(canvas, C.getContext2D, IO.chain(C.translate(translateX, translateY)), IO.chain(C.fillRect(rect)))()

      // Actual
      testCtx.translate(translateX, translateY)
      testCtx.fillRect(rect.x, rect.y, rect.width, rect.height)

      assertCalledWith(ctx.translate as jest.Mock, translateX, translateY)

      assert.deepStrictEqual(ctx.__getDrawCalls(), testCtx.__getDrawCalls())
    })
  })

  describe('transform', () => {
    it('should apply the specified transformation matrix to the canvas context', () => {
      const m11 = 1
      const m12 = 0.2
      const m21 = 0.8
      const m22 = 1
      const m31 = 0
      const m32 = 0
      const rect = S.rect(10, 10, 8, 20)

      // Test
      pipe(canvas, C.getContext2D, IO.chain(C.transform(m11, m12, m21, m22, m31, m32)), IO.chain(C.fillRect(rect)))()

      // Actual
      testCtx.transform(m11, m12, m21, m22, m31, m32)
      testCtx.fillRect(rect.x, rect.y, rect.width, rect.height)

      assertCalledWith(ctx.transform as jest.Mock, m11, m12, m21, m22, m31, m32)

      assert.deepStrictEqual(ctx.__getDrawCalls(), testCtx.__getDrawCalls())
    })
  })

  describe('getTextAlign', () => {
    it('should get the current text align', () => {
      assert.strictEqual(pipe(canvas, C.getContext2D, IO.chain(C.getTextAlign))(), ctx.textAlign)
    })
  })

  describe('setTextAlign', () => {
    it('should set the current text align', () => {
      const textAlign = 'center'

      pipe(canvas, C.getContext2D, IO.chain(C.setTextAlign(textAlign)))()

      assert.strictEqual(ctx.textAlign, textAlign)
    })
  })

  describe('getFont', () => {
    it('should get the current font', () => {
      assert.strictEqual(pipe(canvas, C.getContext2D, IO.chain(C.getFont))(), ctx.font)
    })
  })

  describe('setFont', () => {
    it('should set the current font', () => {
      const font = pipe(F.font('serif', 14), F.showFont.show)

      pipe(canvas, C.getContext2D, IO.chain(C.setFont(font)))()

      assert.strictEqual(ctx.font, font)
    })
  })

  describe('fillText', () => {
    it('should render filled text to the canvas', () => {
      const fillText = 'Hello World!'
      const font = pipe(F.font('serif', 14), F.showFont.show)
      const x = 50
      const y = 90

      // Test
      pipe(canvas, C.getContext2D, IO.chain(C.setFont(font)), IO.chain(C.fillText(fillText, x, y)))()

      // // Actual
      testCtx.font = font
      testCtx.fillText(fillText, x, y)

      assertCalledWith(ctx.fillText as jest.Mock, fillText, x, y)

      assert.deepStrictEqual(ctx.__getEvents(), testCtx.__getEvents())
    })

    it('should render filled text with a max width to the canvas', () => {
      const fillText = 'Hello World!'
      const font = pipe(F.font('serif', 14), F.showFont.show)
      const x = 50
      const y = 90
      const maxWidth = 150

      // Test
      pipe(canvas, C.getContext2D, IO.chain(C.setFont(font)), IO.chain(C.fillText(fillText, x, y, maxWidth)))()

      // // Actual
      testCtx.font = font
      testCtx.fillText(fillText, x, y, maxWidth)

      assertCalledWith(ctx.fillText as jest.Mock, fillText, x, y, maxWidth)

      assert.deepStrictEqual(ctx.__getEvents(), testCtx.__getEvents())
    })
  })

  describe('strokeText', () => {
    it('should render outlined text to the canvas', () => {
      const strokeText = 'Hello World!'
      const font = pipe(F.font('serif', 14), F.showFont.show)
      const x = 50
      const y = 90

      // Test
      pipe(canvas, C.getContext2D, IO.chain(C.setFont(font)), IO.chain(C.strokeText(strokeText, x, y)))()

      // Actual
      testCtx.font = font
      testCtx.strokeText(strokeText, x, y)

      assertCalledWith(ctx.strokeText as jest.Mock, strokeText, x, y)

      assert.deepStrictEqual(ctx.__getEvents(), testCtx.__getEvents())
    })

    it('should render outlined text with a max width to the canvas', () => {
      const strokeText = 'Hello World!'
      const font = pipe(F.font('serif', 14), F.showFont.show)
      const x = 50
      const y = 90
      const maxWidth = 150

      // Test
      pipe(canvas, C.getContext2D, IO.chain(C.setFont(font)), IO.chain(C.strokeText(strokeText, x, y, maxWidth)))()

      // Actual
      testCtx.font = font
      testCtx.strokeText(strokeText, x, y, maxWidth)

      assertCalledWith(ctx.strokeText as jest.Mock, strokeText, x, y, maxWidth)

      assert.deepStrictEqual(ctx.__getEvents(), testCtx.__getEvents())
    })
  })

  describe('measureText', () => {
    it('should get text metrics for the specified text', () => {
      const text = 'Hello World!'

      // Test
      const textMetrics = pipe(canvas, C.getContext2D, IO.chain(C.measureText(text)))()

      // Actual
      const testTextMetrics = testCtx.measureText(text)

      assertCalledWith(ctx.measureText as jest.Mock, text)

      assert.deepStrictEqual(textMetrics, testTextMetrics)
    })
  })

  describe('save/restore', () => {
    it('should save and restore the current context', () => {
      const scaleX = 10
      const scaleY = 5
      const first = S.rect(10, 10, 100, 100)
      const second = S.rect(150, 40, 100, 100)

      // Test
      pipe(
        canvas,
        C.getContext2D,
        // Save the context
        IO.chain(C.save),
        // Apply scale after saving
        IO.chain(C.scale(scaleX, scaleY)),
        IO.chain(C.fillRect(first)),
        // Restore the previous context
        IO.chain(C.restore),
        // Scale is reset to default
        IO.chain(C.fillRect(second))
      )()

      // Actual
      testCtx.save()
      testCtx.scale(scaleX, scaleY)
      testCtx.fillRect(first.x, first.y, first.width, first.height)
      testCtx.restore()
      testCtx.fillRect(second.x, second.y, second.width, second.height)

      assertCalledWith(ctx.save as jest.Mock)
      assertCalledWith(ctx.restore as jest.Mock)

      assert.deepStrictEqual(ctx.__getEvents(), testCtx.__getEvents())
    })
  })

  describe('withContext', () => {
    it('should allow for execution of an action while preserving the existing canvas context', () => {
      const scaleX = 10
      const scaleY = 5
      const first = S.rect(10, 10, 100, 100)
      const second = S.rect(150, 40, 100, 100)

      // Test
      pipe(
        canvas,
        C.getContext2D,
        IO.chain(C.withContext((ctx) => () => pipe(ctx, C.scale(scaleX, scaleY), IO.chain(C.fillRect(first)))())),
        IO.chain(C.fillRect(second))
      )()

      // Actual
      testCtx.save()
      testCtx.scale(scaleX, scaleY)
      testCtx.fillRect(first.x, first.y, first.width, first.height)
      testCtx.restore()
      testCtx.fillRect(second.x, second.y, second.width, second.height)

      assertCalledWith(ctx.save as jest.Mock)
      assertCalledWith(ctx.restore as jest.Mock)

      assert.deepStrictEqual(ctx.__getEvents(), testCtx.__getEvents())
    })
  })

  describe('getImageData', () => {
    it('should get the image data for the specified portion of the canvas', () => {
      const first = S.rect(10, 10, 100, 100)
      const second = S.rect(60, 60, 200, 100)

      // Test
      const imageData = pipe(
        canvas,
        C.getContext2D,
        IO.chain(C.rect(first)),
        IO.chain(C.fill()),
        IO.chain(C.getImageData(second))
      )()

      // Actual
      testCtx.rect(first.x, first.y, first.width, first.height)
      testCtx.fill()
      const testImageData = testCtx.getImageData(second.x, second.y, second.width, second.height)

      assertCalledWith(ctx.getImageData as jest.Mock, second.x, second.y, second.width, second.height)

      assert.deepStrictEqual(imageData, testImageData)
    })
  })

  describe('putImageData', () => {
    it('should set the image data for the specified portion of the canvas', () => {
      const rect = S.rect(0, 0, 100, 100)
      const dx = 150
      const dy = 0

      // Test
      const imageData = pipe(canvas, C.getContext2D, IO.chain(C.rect(rect)), IO.chain(C.getImageData(rect)))()

      pipe(canvas, C.getContext2D, IO.chain(C.putImageData(imageData, dx, dy)))()

      testCtx.rect(rect.x, rect.y, rect.width, rect.height)
      const testImageData = testCtx.getImageData(rect.x, rect.y, rect.width, rect.height)
      testCtx.putImageData(testImageData, dx, dy)

      assertCalledWith(ctx.putImageData as jest.Mock, imageData, dx, dy)
      assert.deepStrictEqual(ctx.__getEvents(), testCtx.__getEvents())
    })
  })

  describe('putImageDataFull', () => {
    it('should set the image data for the specified portion of the canvas', () => {
      const rect = S.rect(0, 0, 100, 100)
      const dx = 150
      const dy = 0
      const dirtyX = 50
      const dirtyY = 50
      const dirtyWidth = 50
      const dirtyHeight = 50

      // Test
      const imageData = pipe(canvas, C.getContext2D, IO.chain(C.rect(rect)), IO.chain(C.getImageData(rect)))()

      pipe(
        canvas,
        C.getContext2D,
        IO.chain(C.putImageDataFull(imageData, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight))
      )()

      // Test
      testCtx.rect(rect.x, rect.y, rect.width, rect.height)
      const testImageData = testCtx.getImageData(rect.x, rect.y, rect.width, rect.height)
      testCtx.putImageData(testImageData, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight)

      assertCalledWith(ctx.putImageData as jest.Mock, imageData, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight)

      assert.deepStrictEqual(ctx.__getEvents(), testCtx.__getEvents())
    })
  })

  describe('createImageData', () => {
    it('should create a new ImageData object', () => {
      const sw = 100
      const sh = 50

      // Test
      const imageData = pipe(canvas, C.getContext2D, IO.chain(C.createImageData(sw, sh)))()

      // Actual
      const testImageData = testCtx.createImageData(sw, sh)

      assertCalledWith(ctx.createImageData as jest.Mock, sw, sh)

      assert.deepStrictEqual(imageData, testImageData)
    })
  })

  describe('createImageDataCopy', () => {
    it('should create a copy of an ImageData object', () => {
      const sw = 100
      const sh = 50

      const imageData = pipe(canvas, C.getContext2D, IO.chain(C.createImageData(sw, sh)))()
      const imageDataCopy = pipe(canvas, C.getContext2D, IO.chain(C.createImageDataCopy(imageData)))()

      assert.notStrictEqual(imageData, imageDataCopy)
      assert.deepStrictEqual(imageData, imageDataCopy)
    })
  })

  describe('drawImage', () => {
    it('should draw an image to the canvas', () => {
      const height = 220
      const width = 440
      const offsetX = 20
      const offsetY = 40
      const image = new Image()
      image.src = 'https://mdn.mozillademos.org/files/5397/rhino.jpg'
      image.height = height
      image.width = width

      // Test
      pipe(canvas, C.getContext2D, IO.chain(C.drawImage(image, offsetX, offsetY)))()

      // Actual
      testCtx.drawImage(image, offsetX, offsetY)

      assertCalledWith(ctx.drawImage as jest.Mock, image, offsetX, offsetY)

      assert.deepStrictEqual(ctx.__getDrawCalls(), testCtx.__getDrawCalls())
    })
  })

  describe('drawImageScale', () => {
    it('should draw an image to the canvas', () => {
      const height = 220
      const width = 440
      const offsetX = 20
      const offsetY = 40
      const canvasOffsetX = 100
      const canvasOffsetY = 150
      const image = new Image()
      image.src = 'https://mdn.mozillademos.org/files/5397/rhino.jpg'
      image.height = height
      image.width = width

      // Test
      pipe(canvas, C.getContext2D, IO.chain(C.drawImageScale(image, offsetX, offsetY, canvasOffsetX, canvasOffsetY)))()

      // Actual
      testCtx.drawImage(image, offsetX, offsetY, canvasOffsetX, canvasOffsetY)

      assertCalledWith(ctx.drawImage as jest.Mock, image, offsetX, offsetY, canvasOffsetX, canvasOffsetY)

      assert.deepStrictEqual(ctx.__getDrawCalls(), testCtx.__getDrawCalls())
    })
  })

  describe('drawImageFull', () => {
    it('should draw an image to the canvas', () => {
      const height = 220
      const width = 440
      const offsetX = 20
      const offsetY = 40
      const rectWidth = 100
      const rectHeight = 120
      const canvasOffsetX = 100
      const canvasOffsetY = 150
      const canvasImageWidth = 80
      const canvasImageHeight = 100
      const image = new Image()
      image.src = 'https://mdn.mozillademos.org/files/5397/rhino.jpg'
      image.height = height
      image.width = width

      // Test
      pipe(
        canvas,
        C.getContext2D,
        IO.chain(
          C.drawImageFull(
            image,
            offsetX,
            offsetY,
            rectWidth,
            rectHeight,
            canvasOffsetX,
            canvasOffsetY,
            canvasImageWidth,
            canvasImageHeight
          )
        )
      )()

      // Actual
      testCtx.drawImage(
        image,
        offsetX,
        offsetY,
        rectWidth,
        rectHeight,
        canvasOffsetX,
        canvasOffsetY,
        canvasImageWidth,
        canvasImageHeight
      )

      assertCalledWith(
        ctx.drawImage as jest.Mock,
        image,
        offsetX,
        offsetY,
        rectWidth,
        rectHeight,
        canvasOffsetX,
        canvasOffsetY,
        canvasImageWidth,
        canvasImageHeight
      )

      assert.deepStrictEqual(ctx.__getDrawCalls(), testCtx.__getDrawCalls())
    })
  })

  describe('createPattern', () => {
    it('should create a new canvas pattern', () => {
      // var img = new Image();
      // img.src = 'https://mdn.mozillademos.org/files/222/Canvas_createpattern.png';
      // img.onload = function() {
      //   var pattern = ctx.createPattern(img, 'repeat');
      //   ctx.fillStyle = pattern;
      //   ctx.fillRect(0, 0, 300, 300);
      // };
      const height = 220
      const width = 440
      const repetition = 'repeat'
      const rect = S.rect(0, 0, 300, 300)
      const image = new Image()
      image.src = 'https://mdn.mozillademos.org/files/222/Canvas_createpattern.png'
      image.height = height
      image.width = width

      // Test
      const pattern = pipe(
        canvas,
        C.getContext2D,
        IO.chain((ctx) => pipe(ctx, C.createPattern(image, repetition), IO.map(O.getOrElseW(() => ''))))
      )()

      pipe(canvas, C.getContext2D, IO.chain(C.setFillStyle(pattern)), IO.chain(C.fillRect(rect)))()

      // Actual
      const testPattern = testCtx.createPattern(image, repetition)
      testCtx.fillStyle = testPattern as CanvasPattern
      testCtx.fillRect(rect.x, rect.y, rect.width, rect.height)

      assertCalledWith(ctx.createPattern as jest.Mock, image, repetition)

      assert.deepStrictEqual(ctx.__getDrawCalls(), testCtx.__getDrawCalls())
    })
  })

  describe('createLinearGradient', () => {
    it('should create a linear gradient, set its fill style, and add color stops', () => {
      const x0 = 20
      const y0 = 0
      const x1 = 220
      const y1 = 0
      const acqua = pipe(Color.hsl(180, 1, 0.5), Color.toCss)
      const green = pipe(Color.hsl(120, 1, 0.25), Color.toCss)
      const rect = S.rect(20, 20, 200, 100)

      // Test
      const gradient = pipe(canvas, C.getContext2D, IO.chain(C.createLinearGradient(x0, y0, x1, y1)))()

      pipe(
        canvas,
        C.getContext2D,
        IO.chain((ctx) =>
          pipe(
            gradient,
            C.addColorStop(0, acqua),
            IO.chain(C.addColorStop(0.5, green)),
            IO.chain(C.addColorStop(1, green)),
            IO.chain((g) => pipe(ctx, C.setFillStyle(g), IO.chain(C.fillRect(rect))))
          )
        )
      )()

      // Actual
      const testGradient = testCtx.createLinearGradient(x0, y0, x1, y1)
      testGradient.addColorStop(0, acqua)
      testGradient.addColorStop(0.5, green)
      testGradient.addColorStop(1, green)
      testCtx.fillStyle = gradient
      testCtx.fillRect(rect.x, rect.y, rect.width, rect.height)

      assertCalledWith(ctx.createLinearGradient as jest.Mock, x0, y0, x1, y1)

      assert.deepStrictEqual(ctx.__getDrawCalls(), testCtx.__getDrawCalls())
    })
  })

  describe('createRadialGradient', () => {
    it('should create a radial gradient set its fill style, and add color stops', () => {
      const x0 = 110
      const y0 = 90
      const r0 = 30
      const x1 = 100
      const y1 = 100
      const r1 = 70
      const acqua = pipe(Color.hsl(180, 1, 0.5), Color.toCss)
      const green = pipe(Color.hsl(120, 1, 0.25), Color.toCss)
      const rect = S.rect(20, 20, 200, 100)

      // Test
      const gradient = pipe(canvas, C.getContext2D, IO.chain(C.createRadialGradient(110, 90, 30, 100, 100, 70)))()

      pipe(
        canvas,
        C.getContext2D,
        IO.chain((ctx) =>
          pipe(
            gradient,
            C.addColorStop(0, acqua),
            IO.chain(C.addColorStop(0.5, green)),
            IO.chain(C.addColorStop(1, green)),
            IO.chain((g) => pipe(ctx, C.setFillStyle(g), IO.chain(C.fillRect(rect))))
          )
        )
      )()

      // Actual
      const testGradient = testCtx.createRadialGradient(x0, y0, r0, x1, y1, r1)
      testGradient.addColorStop(0, acqua)
      testGradient.addColorStop(0.5, green)
      testGradient.addColorStop(1, green)
      testCtx.fillStyle = gradient
      testCtx.fillRect(rect.x, rect.y, rect.width, rect.height)

      assertCalledWith(ctx.createRadialGradient as jest.Mock, x0, y0, r0, x1, y1, r1)

      assert.deepStrictEqual(ctx.__getDrawCalls(), testCtx.__getDrawCalls())
    })
  })

  describe('quadraticCurveTo', () => {
    it('should render a quadratic Bezier curve', () => {
      const point = S.point(50, 20)
      const cpx = 230
      const cpy = 30
      const x = 50
      const y = 100

      // Test
      pipe(
        canvas,
        C.getContext2D,
        IO.chain(C.strokePath(flow(C.moveTo(point), IO.chain(C.quadraticCurveTo(cpx, cpy, x, y)))))
      )()

      // Actual
      testCtx.beginPath()
      testCtx.moveTo(point.x, point.y)
      testCtx.quadraticCurveTo(cpx, cpy, x, y)
      testCtx.stroke()

      assertCalledWith(ctx.quadraticCurveTo as jest.Mock, cpx, cpy, x, y)

      assert.deepStrictEqual(ctx.__getDrawCalls(), testCtx.__getDrawCalls())
    })
  })

  describe('bezierCurveTo', () => {
    it('should render a cubic Bezier curve', () => {
      const point = S.point(50, 20)
      const cpx1 = 230
      const cpy1 = 30
      const cpx2 = 150
      const cpy2 = 80
      const x = 250
      const y = 100

      // Test
      pipe(
        canvas,
        C.getContext2D,
        IO.chain(
          C.strokePath((ctx) => pipe(ctx, C.moveTo(point), IO.chain(C.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, x, y))))
        )
      )()

      // Actual
      testCtx.beginPath()
      testCtx.moveTo(point.x, point.y)
      testCtx.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, x, y)
      testCtx.stroke()

      assertCalledWith(ctx.bezierCurveTo as jest.Mock, cpx1, cpy1, cpx2, cpy2, x, y)

      assert.deepStrictEqual(ctx.__getDrawCalls(), testCtx.__getDrawCalls())
    })
  })
})
