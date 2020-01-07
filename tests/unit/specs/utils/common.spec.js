import {expect} from 'chai'
import cu from '@/utils/common'

describe('utils/common.js', () => {
  describe('clone', () => {
    it('should clone deep object', () => {
      const oldObj = {
        a: 1,
        b: {
          c: 2,
          d: [3, 4]
        }
      }

      const newObj = cu.clone(oldObj)

      expect(oldObj).to.deep.equal(newObj)
      expect(cu.deepCompare(oldObj, newObj)).to.equal(true)

      expect(oldObj.a).to.equal(newObj.a)
      expect(oldObj.b).to.not.equal(newObj.b)
      expect(oldObj.b.c).to.equal(newObj.b.c)
      expect(oldObj.b.d).to.not.equal(newObj.b.d)
    })

    it('should clone null value', () => {
      expect(cu.clone(null)).to.equal(null)
    })

    it('should clone primitive value', () => {
      expect(cu.clone('value1')).to.equal('value1')
    })

    it('should clone array', () => {
      const oldArray = [1, 2, {a: 3}]
      const newArray = cu.clone(oldArray)

      expect(oldArray).to.not.equal(newArray)
      expect(oldArray).to.deep.equal(newArray)
      expect(cu.deepCompare(oldArray, newArray)).to.equal(true)

      expect(oldArray[2]).to.not.equal(newArray[2])
    })
  })

  describe('isObject', () => {
    it('should be object', () => {
      expect(cu.isObject({})).to.equal(true)
      expect(cu.isObject({a: 1})).to.equal(true)
      expect(cu.isObject([], true)).to.equal(true)
      expect(cu.isObject([1, 2], true)).to.equal(true)
    })

    it('should not be an object', () => {
      expect(cu.isObject(1)).to.equal(false)
      expect(cu.isObject('1')).to.equal(false)
      expect(cu.isObject(true)).to.equal(false)
      expect(cu.isObject(false)).to.equal(false)
      expect(cu.isObject([], false)).to.equal(false)
      expect(cu.isObject([1, 2], false)).to.equal(false)
    })
  })

  describe('mergeDeep', () => {
    it('should deep merge one object', () => {
      const obj = {
        a: 7,
        b: 8,
        d: {
          e: [9, 10],
          f: {
            h: 11
          },
          i: 12
        }
      }
      const objSave = cu.clone(obj)
      expect(objSave).to.not.equal(obj)
      expect(objSave).to.deep.equal(obj)

      const targetObj = {
        a: 1,
        c: 2,
        d: {
          e: [3, 4],
          f: {
            g: 5
          },
          i: {
            j: 6
          }
        }
      }
      const resultObj = cu.mergeDeep(targetObj, obj)

      expect(targetObj).to.equal(resultObj)
      expect(resultObj).to.deep.equal({
        a: 7,
        b: 8,
        c: 2,
        d: {
          e: [9, 10],
          f: {
            g: 5,
            h: 11
          },
          i: 12
        }
      })

      expect(objSave).to.deep.equal(obj)
    })

    it('should deep merge two objects', () => {
      const obj1 = {
        a: 1,
        c: 2,
        d: {
          e: [3, 4],
          f: {
            g: 5
          },
          i: {
            j: 6
          }
        }
      }
      const obj1Save = cu.clone(obj1)
      expect(obj1Save).to.not.equal(obj1)
      expect(obj1Save).to.deep.equal(obj1)

      const obj2 = {
        a: 7,
        b: 8,
        d: {
          e: [9, 10],
          f: {
            h: 11
          },
          i: 12
        }
      }

      const obj2Save = cu.clone(obj2)
      expect(obj2Save).to.not.equal(obj2)
      expect(obj2Save).to.deep.equal(obj2)

      const targetObj = {}
      const resultObj = cu.mergeDeep(targetObj, obj1, obj2)

      expect(targetObj).to.equal(resultObj)
      expect(resultObj).to.deep.equal({
        a: 7,
        b: 8,
        c: 2,
        d: {
          e: [9, 10],
          f: {
            g: 5,
            h: 11
          },
          i: 12
        }
      })

      expect(obj1Save).to.deep.equal(obj1)
      expect(obj2Save).to.deep.equal(obj2)
    })

    it('should deep merge multiple object', () => {
      const targetObj = {
        a: 1,
        c: 2,
        d: {
          e: 3
        }
      }

      const obj1 = {
        a: 4,
        b: 5,
        d: {
          f: 6
        }
      }
      const obj1Save = cu.clone(obj1)
      expect(obj1Save).to.not.equal(obj1)
      expect(obj1Save).to.deep.equal(obj1)

      const obj2 = {
        a: 7,
        c: 8,
        d: {
          e: 9
        }
      }
      const obj2Save = cu.clone(obj2)
      expect(obj2Save).to.not.equal(obj2)
      expect(obj2Save).to.deep.equal(obj2)

      const obj3 = {
        b: 10,
        d: {
          f: 11,
          g: 12
        }
      }
      const obj3Save = cu.clone(obj3)
      expect(obj3Save).to.not.equal(obj3)
      expect(obj3Save).to.deep.equal(obj3)

      const resultObj = cu.mergeDeep(targetObj, obj1, obj2, obj3)

      expect(targetObj).to.equal(resultObj)
      expect(resultObj).to.deep.equal({
        a: 7,
        b: 10,
        c: 8,
        d: {
          e: 9,
          f: 11,
          g: 12
        }
      })

      expect(obj1Save).to.deep.equal(obj1)
      expect(obj2Save).to.deep.equal(obj2)
      expect(obj3Save).to.deep.equal(obj3)
    })
  })

  describe('isNull', () => {
    it('should be null', () => {
      expect(cu.isNull(null)).to.equal(true)
      expect(cu.isNull(undefined)).to.equal(true)
    })

    it('should not be null', () => {
      expect(cu.isNull(0)).to.equal(false)
      expect(cu.isNull('')).to.equal(false)
      expect(cu.isNull({})).to.equal(false)
      expect(cu.isNull(1)).to.equal(false)
      expect(cu.isNull('1')).to.equal(false)
      expect(cu.isNull(true)).to.equal(false)
      expect(cu.isNull(false)).to.equal(false)
      expect(cu.isNull([])).to.equal(false)
      expect(cu.isNull([1, 2])).to.equal(false)
    })
  })

  describe('deepCompare', () => {
    it('should be equal', () => {
      expect(cu.deepCompare(1, 1)).to.equal(true)
      expect(cu.deepCompare('1', '1')).to.equal(true)
      expect(cu.deepCompare(true, true)).to.equal(true)
      expect(cu.deepCompare(false, false)).to.equal(true)
      expect(cu.deepCompare({}, {})).to.equal(true)
      expect(cu.deepCompare([], [])).to.equal(true)
      expect(cu.deepCompare({a: 1}, {a: 1})).to.equal(true)
      expect(cu.deepCompare({a: '1'}, {a: '1'})).to.equal(true)
      expect(cu.deepCompare({a: '1', b: 2}, {a: '1', b: 2})).to.equal(true)
      expect(cu.deepCompare({a: '1', b: []}, {a: '1', b: []})).to.equal(true)
      expect(cu.deepCompare({a: '1', b: [1, 2]}, {a: '1', b: [1, 2]})).to.equal(true)
      expect(cu.deepCompare([1], [1])).to.equal(true)
      expect(cu.deepCompare([1, 1], [1, 1])).to.equal(true)
      expect(cu.deepCompare([1, '1'], [1, '1'])).to.equal(true)
      expect(cu.deepCompare(['1', 1], ['1', 1])).to.equal(true)
      expect(cu.deepCompare([{}], [{}])).to.equal(true)
      expect(cu.deepCompare([{a: 1}], [{a: 1}])).to.equal(true)
    })

    it('should not be equal', () => {
      expect(cu.deepCompare(1, 2)).to.equal(false)
      expect(cu.deepCompare('1', '2')).to.equal(false)
      expect(cu.deepCompare({}, {a: 1})).to.equal(false)
      expect(cu.deepCompare({a: 1}, {})).to.equal(false)
      expect(cu.deepCompare({a: 1}, {a: 2})).to.equal(false)
      expect(cu.deepCompare({a: 2}, {a: 1})).to.equal(false)
      expect(cu.deepCompare([], [1])).to.equal(false)
      expect(cu.deepCompare([1], [])).to.equal(false)
      expect(cu.deepCompare([], ['1'])).to.equal(false)
      expect(cu.deepCompare(['1'], [])).to.equal(false)
      expect(cu.deepCompare(1, {})).to.equal(false)
      expect(cu.deepCompare({}, 1)).to.equal(false)
      expect(cu.deepCompare(1, {a: 1})).to.equal(false)
      expect(cu.deepCompare({a: 1}, 1)).to.equal(false)
      expect(cu.deepCompare({}, [])).to.equal(false)
      expect(cu.deepCompare([], {})).to.equal(false)
      expect(cu.deepCompare({a: 1}, [1])).to.equal(false)
      expect(cu.deepCompare([1], {a: 1})).to.equal(false)
    })
  })

  describe('eval', () => {
    it('should eval non-functions', () => {
      expect(cu.eval(null, null, 1, 2)).to.equal(null)
      expect(cu.eval(undefined, null, 't')).to.equal(undefined)
      expect(cu.eval(0)).to.equal(0)
      expect(cu.eval('Text', null)).to.equal('Text')
      const obj = {a: 1}
      expect(cu.eval(obj)).to.equal(obj)
      const list = [1, 2]
      expect(cu.eval(list, null, 1, 2)).to.equal(list)
    })

    it('should eval function', () => {
      const func = (...args) => args

      expect(cu.eval(func)).to.deep.equal([])
      expect(cu.eval(func, null)).to.deep.equal([])
      expect(cu.eval(func, null, 1, 2)).to.deep.equal([1, 2])
      expect(cu.eval(func, null, 1, null, 3, 4, 5, 6)).to.deep.equal([1, null, 3, 4, 5, 6])
    })

    it('should eval function context', () => {
      let expectedContext
      function func (...args) {
        expect(this).to.be.equal(expectedContext)
        return args
      }

      expect(cu.eval(func)).to.deep.equal([])
      expectedContext = {}
      expect(cu.eval(func, expectedContext)).to.deep.equal([])
    })
  })

  describe('promiseEval', () => {
    it('should eval non-functions', async () => {
      expect(await cu.promiseEval(null, null, 1, 2)).to.equal(null)
      expect(await cu.promiseEval(undefined, 't')).to.equal(undefined)
      expect(await cu.promiseEval(0)).to.equal(0)
      expect(await cu.promiseEval('Text', null)).to.equal('Text')
      const obj = {a: 1}
      expect(await cu.promiseEval(obj)).to.equal(obj)
      const list = [1, 2]
      expect(await cu.promiseEval(list, 1, 2)).to.equal(list)

      expect(await cu.promiseEval(new Promise(resolve => resolve(0)), 1, 2)).to.equal(0)
    })

    it('should eval function', async () => {
      let expectedContext
      function func (...args) {
        expect(this).to.be.equal(expectedContext)
        return args
      }
      function promiseFunc (...args) {
        expect(this).to.be.equal(expectedContext)
        return new Promise(resolve => resolve(args))
      }

      expect(await cu.promiseEval(func)).to.deep.equal([])
      expectedContext = null
      expect(await cu.promiseEval(func, null)).to.deep.equal([])
      expect(await cu.promiseEval(func, null, 1, 2)).to.deep.equal([1, 2])
      expectedContext = {}
      expect(await cu.promiseEval(func, expectedContext, 1, null, 3, 4, 5, 6)).to.deep.equal([1, null, 3, 4, 5, 6])

      expectedContext = undefined
      expect(await cu.promiseEval(promiseFunc)).to.deep.equal([])
      expectedContext = {}
      expect(await cu.promiseEval(promiseFunc, expectedContext)).to.deep.equal([])
      expect(await cu.promiseEval(promiseFunc, expectedContext, 1, null, 3, 4)).to.deep.equal([1, null, 3, 4])
    })
  })
})
