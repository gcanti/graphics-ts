/**
 * Adapted from https://github.com/purescript-contrib/purescript-drawing/blob/master/test/Main.purs
 */
import { error } from 'fp-ts/lib/Console'
import * as IO from 'fp-ts/lib/IO'
import * as M from 'fp-ts/lib/Monoid'
import * as O from 'fp-ts/lib/Option'
import * as ROA from 'fp-ts/lib/ReadonlyArray'
import { flow } from 'fp-ts/lib/function'
import { pipe } from 'fp-ts/lib/pipeable'

import * as Color from '../src/Color'
import * as C from '../src/Canvas'
import * as D from '../src/Drawing'
import * as S from '../src/Shape'

const CANVAS_ONE_ID = 'canvas1'
const CANVAS_TWO_ID = 'canvas2'
const SCALE = 0.375

const closedArray = S.closed(ROA.readonlyArray)

const colors: ReadonlyArray<any> = [
  Color.hsla(60, 0.6, 0.5, 1),
  Color.hsla(55, 0.65, 0.55, 1),
  Color.hsla(30, 1, 0.55, 1),
  Color.hsla(345, 0.62, 0.45, 1),
  Color.hsla(305, 0.7, 0.28, 1),
  Color.hsla(268, 1, 0.18, 1),
  Color.hsla(240, 1, 0.01, 1)
]

const pentagon = pipe(
  ROA.range(0, 5),
  ROA.map((n) => {
    const theta = (Math.PI / 2.5) * n
    return S.point(Math.sin(theta), Math.cos(theta))
  })
)

const withCanvas: (f: (c: HTMLCanvasElement) => IO.IO<void>) => (id: string) => IO.IO<void> = (f) => (id) =>
  pipe(
    C.getCanvasElementById(id),
    IO.chain(
      O.fold(
        () => error(`[ERROR]: Unable to find canvas with id ${CANVAS_ONE_ID}`),
        (c) => f(c)
      )
    )
  )

const makeDrawing = (n: number): D.Drawing => {
  if (n === 0) {
    return D.monoidDrawing.empty
  }

  const first = D.fill(closedArray(pentagon), D.fillStyle(colors[n]))
  const next = D.scale(SCALE, SCALE, makeDrawing(n - 1))
  const drawings = ROA.cons(
    first,
    pipe(
      ROA.range(0, 4),
      ROA.map((n) => D.rotate((Math.PI / 2.5) * (n + 0.5), D.translate(0, Math.cos(Math.PI / 5) * (1 + SCALE), next)))
    )
  )

  return M.fold(D.monoidDrawing)(drawings)
}

const snowflake = D.withShadow(
  M.fold(D.monoidShadow)([D.shadowColor(Color.black), D.shadowBlur(10)]),
  D.translate(300, 300, D.scale(150, 150, makeDrawing(6)))
)

/**
 * Snowflake example from screenshot.
 */
const ioSnowflake = withCanvas(flow(C.getContext2D, IO.chain(D.render(snowflake))))

/* tslint:disable no-console */
console.time('ioSnowflake')
ioSnowflake(CANVAS_ONE_ID)()
console.timeEnd('ioSnowflake')
/* tslint:enable no-console */

/**
 * Example of a clipped canvas from [MDN Web Docs](https://mzl.la/3e0mKKx).
 */
const clippedRect = D.clipped(
  S.circle(100, 75, 50),
  D.many([
    D.fill(S.rect(0, 0, 300, 150), D.fillStyle(Color.hsl(240, 1, 0.5))),
    D.fill(S.rect(0, 0, 100, 100), D.fillStyle(Color.hsl(0, 1, 0.5)))
  ])
)

const ioClippedRect = withCanvas(flow(C.getContext2D, IO.chain(D.render(clippedRect))))

/* tslint:disable no-console */
console.time('ioClippedRect')
ioClippedRect(CANVAS_TWO_ID)()
console.timeEnd('ioClippedRect')
/* tslint:enable no-console */
