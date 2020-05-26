/**
 * Adapted from https://github.com/purescript-contrib/purescript-drawing/blob/master/test/Main.purs
 */
import { error } from 'fp-ts/lib/Console'
import * as IO from 'fp-ts/lib/IO'
import * as M from 'fp-ts/lib/Monoid'
import * as O from 'fp-ts/lib/Option'
import * as RA from 'fp-ts/lib/ReadonlyArray'
import { flow } from 'fp-ts/lib/function'
import { pipe } from 'fp-ts/lib/pipeable'

import * as Color from '../src/Color'
import * as C from '../src/Canvas'
import * as D from '../src/Drawing'
import * as S from '../src/Shape'

const CANVAS_ONE_ID = 'canvas1'
const CANVAS_TWO_ID = 'canvas2'
const SCALE = 0.375

const closedPath = S.closed(RA.readonlyArray)

const colors: ReadonlyArray<Color.Color> = [
  Color.hsla(60, 0.6, 0.5, 1),
  Color.hsla(55, 0.65, 0.55, 1),
  Color.hsla(30, 1, 0.55, 1),
  Color.hsla(345, 0.62, 0.45, 1),
  Color.hsla(305, 0.7, 0.28, 1),
  Color.hsla(268, 1, 0.18, 1),
  Color.hsla(240, 1, 0.01, 1)
]

const render = (canvasId: string) => <A>(r: C.Render<A>): IO.IO<void> =>
  pipe(
    C.getCanvasElementById(canvasId),
    IO.chain(O.fold(() => error(`[ERROR]: Unable to find canvas`), flow(C.getContext2D, IO.chain(r))))
  )

const pentagon: S.Path = pipe(
  RA.range(0, 5),
  RA.map((n) => {
    const theta = (Math.PI / 2.5) * n
    return S.point(Math.sin(theta), Math.cos(theta))
  }),
  closedPath
)

const makeDrawing = (n: number): D.Drawing => {
  if (n === 0) {
    return D.monoidDrawing.empty
  }

  const first = D.fill(pentagon, D.fillStyle(colors[n]))
  const next = D.scale(SCALE, SCALE, makeDrawing(n - 1))
  const drawings = RA.cons(
    first,
    pipe(
      RA.range(0, 4),
      RA.map((n) => D.rotate((Math.PI / 2.5) * (n + 0.5), D.translate(0, Math.cos(Math.PI / 5) * (1 + SCALE), next)))
    )
  )

  return M.fold(D.monoidDrawing)(drawings)
}

const snowflake: C.Render<CanvasRenderingContext2D> = D.render(
  D.withShadow(
    M.fold(D.monoidShadow)([D.shadowColor(Color.black), D.shadowBlur(10)]),
    D.translate(300, 300, D.scale(150, 150, makeDrawing(6)))
  )
)

/* tslint:disable no-console */
console.time('ioSnowflake')
render(CANVAS_ONE_ID)(snowflake)()
console.timeEnd('ioSnowflake')
/* tslint:enable no-console */

/**
 * Example of a clipped canvas from [MDN Web Docs](https://mzl.la/3e0mKKx).
 */
const clippedRect: C.Render<CanvasRenderingContext2D> = D.render(
  D.clipped(
    S.circle(100, 75, 50),
    D.many([
      D.fill(S.rect(0, 0, 300, 150), D.fillStyle(Color.hsl(240, 1, 0.5))),
      D.fill(S.rect(0, 0, 100, 100), D.fillStyle(Color.hsl(0, 1, 0.5)))
    ])
  )
)

/* tslint:disable no-console */
console.time('clippedRect')
render(CANVAS_TWO_ID)(clippedRect)()
console.timeEnd('clippedRect')
/* tslint:enable no-console */
