import * as assert from 'assert'
import * as ROA from 'fp-ts/lib/ReadonlyArray'
import * as ROR from 'fp-ts/lib/ReadonlyRecord'
import { pipe } from 'fp-ts/lib/pipeable'

import * as S from '../src/Shape'

describe('Shape', () => {
  describe('point', () => {
    it('should construct a point from x and y coordinated', () => {
      assert.deepStrictEqual(S.point(10, 20), { x: 10, y: 20 })
    })
  })

  describe('degrees', () => {
    it('should construct an angle in degrees', () => {
      const degrees = S.degrees(180)

      assert.deepStrictEqual(degrees, { _tag: 'Degrees', degrees: 180 })
    })
  })

  describe('radians', () => {
    it('should construct an angle in radians', () => {
      const radians = S.radians(Math.PI)

      assert.deepStrictEqual(radians, { _tag: 'Radians', radians: Math.PI })
    })
  })

  describe('angle', () => {
    it('should convert an angle specified in degrees or radians to radians', () => {
      const degrees = S.degrees(180)
      const radians = S.radians(Math.PI)

      assert.strictEqual(S.angle(degrees), Math.PI)
      assert.strictEqual(S.angle(radians), Math.PI)
    })
  })

  describe('arc', () => {
    it('should construct an arc', () => {
      const clockwiseArc = S.arc(10, 20, 5, S.degrees(90), S.degrees(180))
      const anticlockwiseArc = S.arc(10, 20, 5, S.degrees(90), S.degrees(180), true)

      assert.deepStrictEqual(clockwiseArc, {
        _tag: 'Arc',
        x: 10,
        y: 20,
        r: 5,
        start: Math.PI / 2,
        end: Math.PI,
        anticlockwise: false
      })
      assert.deepStrictEqual(anticlockwiseArc, {
        _tag: 'Arc',
        x: 10,
        y: 20,
        r: 5,
        start: Math.PI / 2,
        end: Math.PI,
        anticlockwise: true
      })
    })
  })

  describe('circle', () => {
    it('should construct a circle', () => {
      const circle = S.circle(10, 20, 5)

      assert.deepStrictEqual(circle, {
        _tag: 'Arc',
        x: 10,
        y: 20,
        r: 5,
        start: 0,
        end: Math.PI * 2,
        anticlockwise: false
      })
    })
  })

  describe('composite', () => {
    it('should construct a composite of shapes', () => {
      const firstPath = S.path(ROA.readonlyArray)([S.point(10, 20), S.point(30, 40), S.point(50, 60)])
      const secondPath = S.closed(ROR.readonlyRecord)({
        first: S.point(10, 20),
        second: S.point(30, 40),
        third: S.point(50, 60)
      })
      const path = S.monoidPath.concat(firstPath, secondPath)
      const rect = S.rect(10, 20, 100, 200)
      const arc = S.arc(10, 20, 5, S.degrees(90), S.degrees(180))
      const circle = S.circle(10, 20, 5)

      const composite = S.composite([path, rect, arc, circle])

      assert.deepStrictEqual(composite, {
        _tag: 'Composite',
        shapes: [
          {
            _tag: 'Path',
            closed: true,
            points: [
              { x: 10, y: 20 },
              { x: 30, y: 40 },
              { x: 50, y: 60 },
              { x: 10, y: 20 },
              { x: 30, y: 40 },
              { x: 50, y: 60 }
            ]
          },
          { _tag: 'Rect', x: 10, y: 20, width: 100, height: 200 },
          { _tag: 'Arc', x: 10, y: 20, r: 5, start: Math.PI / 2, end: Math.PI, anticlockwise: false },
          { _tag: 'Arc', x: 10, y: 20, r: 5, start: 0, end: Math.PI * 2, anticlockwise: false }
        ]
      })
    })
  })

  describe('ellipse', () => {
    it('should construct an ellipse', () => {
      const clockwiseEllipse = S.ellipse(10, 20, 2, 5, S.degrees(0), S.degrees(45), S.degrees(60))
      const anticlockwiseEllipse = S.ellipse(10, 20, 2, 5, S.degrees(0), S.degrees(45), S.degrees(60), true)

      assert.deepStrictEqual(clockwiseEllipse, {
        _tag: 'Ellipse',
        x: 10,
        y: 20,
        rx: 2,
        ry: 5,
        rotation: 0,
        start: Math.PI / 4,
        end: Math.PI / 3,
        anticlockwise: false
      })

      assert.deepStrictEqual(anticlockwiseEllipse, {
        _tag: 'Ellipse',
        x: 10,
        y: 20,
        rx: 2,
        ry: 5,
        rotation: 0,
        start: Math.PI / 4,
        end: Math.PI / 3,
        anticlockwise: true
      })
    })
  })

  describe('closed', () => {
    it('should construct a closed path from a foldable structure', () => {
      const pointsArray: ReadonlyArray<any> = [S.point(10, 20), S.point(30, 40), S.point(50, 60)]
      const pointsRecord = {
        first: S.point(10, 20),
        second: S.point(30, 40),
        third: S.point(50, 60)
      }

      assert.deepStrictEqual(pipe(pointsArray, S.closed(ROA.readonlyArray)), {
        _tag: 'Path',
        closed: true,
        points: [
          { x: 10, y: 20 },
          { x: 30, y: 40 },
          { x: 50, y: 60 }
        ]
      })

      assert.deepStrictEqual(pipe(pointsRecord, S.closed(ROR.readonlyRecord)), {
        _tag: 'Path',
        closed: true,
        points: [
          { x: 10, y: 20 },
          { x: 30, y: 40 },
          { x: 50, y: 60 }
        ]
      })
    })
  })

  describe('path', () => {
    it('should construct an open path from a foldable structure', () => {
      const pointsArray: ReadonlyArray<any> = [S.point(10, 20), S.point(30, 40), S.point(50, 60)]
      const pointsRecord = {
        first: S.point(10, 20),
        second: S.point(30, 40),
        third: S.point(50, 60)
      }

      assert.deepStrictEqual(pipe(pointsArray, S.path(ROA.readonlyArray)), {
        _tag: 'Path',
        closed: false,
        points: [
          { x: 10, y: 20 },
          { x: 30, y: 40 },
          { x: 50, y: 60 }
        ]
      })

      assert.deepStrictEqual(pipe(pointsRecord, S.path(ROR.readonlyRecord)), {
        _tag: 'Path',
        closed: false,
        points: [
          { x: 10, y: 20 },
          { x: 30, y: 40 },
          { x: 50, y: 60 }
        ]
      })
    })
  })

  describe('rect', () => {
    it('should construct a rectangle', () => {
      const rect = S.rect(10, 20, 100, 200)

      assert.deepStrictEqual(rect, { _tag: 'Rect', x: 10, y: 20, width: 100, height: 200 })
    })
  })
})
