// adapted from https://github.com/purescript-contrib/purescript-drawing/blob/master/test/Main.purs

import {
  shadowColor,
  shadowBlur,
  withShadow,
  translate,
  scale,
  Drawing,
  monoidDrawing,
  fillColor,
  closed,
  fill,
  rotate,
  render
} from '../src/drawing'
import { unsafeGetCanvasElementById, unsafeGetContext2D } from '../src/canvas'
import { hsla, black } from '../src/color'
import * as array from 'fp-ts/lib/Array'
import { fold } from 'fp-ts/lib/Monoid'

export function ioSnowflake() {
  const canvas = unsafeGetCanvasElementById('canvas1')
  const ctx = unsafeGetContext2D(canvas)

  const pentagon = [0, 1, 2, 3, 4, 5].map(i => {
    const theta = Math.PI / 2.5 * i
    return { x: Math.sin(theta), y: Math.cos(theta) }
  })

  const s = 0.375

  const colors = [
    hsla(60, 60, 0.5, 1),
    hsla(55, 65, 0.55, 1),
    hsla(30, 100, 0.55, 1),
    hsla(345, 62, 0.45, 1),
    hsla(305, 70, 0.28, 1),
    hsla(268, 100, 0.18, 1),
    hsla(240, 100, 0.01, 1)
  ]

  const shadow = shadowColor(black).concat(shadowBlur(10))
  const drawing = withShadow(shadow, translate(300, 300, scale(150, 150, go(6))))

  function go(n: number): Drawing {
    if (n === 0) {
      return monoidDrawing.empty()
    }
    const first = fill(closed(array, pentagon), fillColor(colors[n]))
    const next = scale(s, s, go(n - 1))
    const drawings = [first].concat(
      [0, 1, 2, 3, 4].map(i => {
        return rotate(Math.PI / 2.5 * (i + 0.5), translate(0, Math.cos(Math.PI / 5) * (1 + s), next))
      })
    )
    return fold(monoidDrawing)(drawings)
  }

  return render(drawing, ctx)
}

console.time('ioSnowflake')
ioSnowflake().run()
console.timeEnd('ioSnowflake')

import * as f from '../src/free-canvas'
import { toCss } from '../src/color'

export function freeSnowflake() {
  const canvas = unsafeGetCanvasElementById('canvas2')
  const ctx = unsafeGetContext2D(canvas)

  const pentagon = [0, 1, 2, 3, 4, 5].map(i => {
    const theta = Math.PI / 2.5 * i
    return { x: Math.sin(theta), y: Math.cos(theta) }
  })

  const s = 0.375

  const colors = [
    hsla(60, 60, 0.5, 1),
    hsla(55, 65, 0.55, 1),
    hsla(30, 100, 0.55, 1),
    hsla(345, 62, 0.45, 1),
    hsla(305, 70, 0.28, 1),
    hsla(268, 100, 0.18, 1),
    hsla(240, 100, 0.01, 1)
  ]

  const drawings = go(6)

  function go(n: number): Array<f.Drawing<undefined>> {
    const first = f.withContext(
      f
        .setFillStyle(toCss(colors[n]))
        .chain(() => f.beginPath())
        .chain(() => f.moveTo(pentagon[0].x, pentagon[0].y))
        .chain(() => f.lineTo(pentagon[1].x, pentagon[1].y))
        .chain(() => f.lineTo(pentagon[2].x, pentagon[2].y))
        .chain(() => f.lineTo(pentagon[3].x, pentagon[3].y))
        .chain(() => f.lineTo(pentagon[4].x, pentagon[4].y))
        .chain(() => f.lineTo(pentagon[5].x, pentagon[5].y))
        .chain(() => f.closePath())
        .chain(() => f.fill())
    )
    if (n === 1) {
      return [first]
    }
    const next = go(n - 1).map(d => f.withContext(f.scale(s, s).chain(() => d)))
    const flakes = array.chain(
      x =>
        [0, 1, 2, 3, 4].map(i => {
          return f.withContext(
            f
              .rotate(Math.PI / 2.5 * (i + 0.5))
              .chain(() => f.withContext(f.translate(0, Math.cos(Math.PI / 5) * (1 + s)).chain(() => x)))
          )
        }),
      next
    )
    return [first].concat(flakes)
  }

  drawings.forEach(drawing => {
    f.run(
      f
        .setShadowColor(toCss(black))
        .chain(() => f.setShadowBlur(10))
        .chain(() =>
          f.withContext(f.translate(300, 300).chain(() => f.withContext(f.scale(150, 150).chain(() => drawing))))
        ),
      ctx
    )
  })
}

console.time('freeSnowflake')
freeSnowflake()
console.timeEnd('freeSnowflake')
