 import * as R from 'fp-ts-contrib/lib/ReaderIO'
 import * as Console from 'fp-ts/lib/Console'
 import { pipe } from 'fp-ts/lib/pipeable'
 import * as C from './src/Canvas'
 import * as Color from './src/Color'
 import * as S from './src/Shape'

 const canvasId = 'canvas'

 const triangle: C.Render<void> = C.fillPath(
   pipe(
     C.setFillStyle(pipe(Color.black, Color.toCss)),
     R.chain(() => C.moveTo(S.point(75, 50))),
     R.chain(() => C.lineTo(S.point(100, 75))),
     R.chain(() => C.lineTo(S.point(100, 25)))
   )
 )

 C.renderTo(canvasId, () => Console.error(`[ERROR]: Unable to find canvas with id ${canvasId}`))(triangle)()
