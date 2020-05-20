import * as assert from 'assert'
import * as glob from 'glob'
import * as path from 'path'
import * as IO from 'fp-ts/lib/IO'
import * as ROA from 'fp-ts/lib/ReadonlyArray'
import { pipe } from 'fp-ts/lib/pipeable'

const getExportName: (name: string) => string = (n) => n.toLowerCase()

const getModuleNames = (): ReadonlyArray<string> =>
  pipe(
    glob.sync('./src/**/*.ts'),
    ROA.fromArray,
    ROA.map((file) => path.parse(file).name)
  )

describe('index', () => {
  it('should export all modules', () => {
    const moduleNames = getModuleNames()
    const graphicsTs = require('../src')

    pipe(
      ROA.readonlyArray.filter(moduleNames, (s) => s !== 'index'),
      ROA.readonlyArray.traverse(IO.io)<string, IO.IO<void>>(moduleNames, (name) => () => () => {
        const exportName = getExportName(name)
        assert.deepStrictEqual(
          graphicsTs[name] !== 'undefined',
          true,
          `The "${name}" module is not export in "src/index.ts" as ${exportName}`
        )
      }),
      ROA.map((a) => a())
    )
  })
})
