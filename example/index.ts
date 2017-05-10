// ../node_modules/.bin/webpack --watch --progress --config webpack.config.js

// adapted from https://github.com/purescript-contrib/purescript-drawing/blob/master/test/Main.purs

import {
  shadowColor,
  shadowBlur,
  WithShadow,
  Translate,
  Scale,
  Drawing,
  monoidDrawing,
  fillColor,
  closed,
  Fill,
  Rotate,
  render
} from '../src/drawing'
import { setDimensions, unsafeGetCanvasElementById, unsafeGetContext2D } from '../src/canvas'
import { hsla, black } from '../src/color'
import * as array from 'fp-ts/lib/Array'
import { fold } from 'fp-ts/lib/Monoid'

export function snowflake() {
  const canvas = unsafeGetCanvasElementById('canvas')
  const ctx = unsafeGetContext2D(canvas)

  const pentagon = [0, 1, 2, 3, 4, 5].map(i => {
    const theta = Math.PI / 2.5 * i
    return { x: Math.sin(theta), y: Math.cos(theta) }
  })

  const s = 0.375

  const colors = [
    hsla(60, 60, 0.50, 1),
    hsla(55, 65, 0.55, 1),
    hsla(30, 100, 0.55, 1),
    hsla(345, 62, 0.45, 1),
    hsla(305, 70, 0.28, 1),
    hsla(268, 100, 0.18, 1),
    hsla(240, 100, 0.01, 1)
  ]

  const shadow = shadowColor(black).concat(shadowBlur(10))
  const drawing = new WithShadow(
    shadow,
    new Translate(300, 300, new Scale(150, 150, go(6)))
  )

  function go(n: number): Drawing {
    if (n === 0) {
      return monoidDrawing.empty()
    }
    const fill = new Fill(closed(array, pentagon), fillColor(colors[n]))
    const next = new Scale(s, s, go(n - 1))
    const drawings = [fill as Drawing].concat(
      [0, 1, 2, 3, 4].map(i => {
        return new Rotate(
          Math.PI / 2.5 * (i + 0.5),
          new Translate(0, Math.cos(Math.PI / 5) * (1 + s), next)
        )
      })
    )
    return fold(monoidDrawing, drawings)
  }

  return setDimensions({ width: 600, height: 600 }, canvas)
    .chain(() => render(drawing, ctx))
}

snowflake().run()
