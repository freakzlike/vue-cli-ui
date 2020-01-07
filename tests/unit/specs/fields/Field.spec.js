import {expect} from 'chai'
import Field from '@/fields/Field'

describe('fields/Field.js', () => {
  describe('clone', () => {
    it('should clone Field', () => {
      const def = {name: 'field', label: 'field label'}
      const data = {field: 'value'}

      const oldObj = new Field(def, data)
      const newObj = oldObj.clone()

      expect(oldObj).to.not.equal(newObj)
      expect(oldObj._def).to.equal(newObj._def)
      expect(oldObj._data).to.equal(newObj._data)
    })
  })

  /**
   * Getters
   */
  describe('getters', () => {
    describe('name', () => {
      it('should get name', () => {
        const def = {name: 'field', label: 'field label'}

        const field = new Field(def)
        expect(field.name).to.equal(def.name)
      })
    })

    describe('attributeName', () => {
      it('should get attributeName', () => {
        const def = {name: 'field', attributeName: 'field.attribute'}

        const field = new Field(def)
        expect(field.attributeName).to.equal(def.attributeName)
      })

      it('should get default attributeName', () => {
        const def = {name: 'field'}

        const field = new Field(def)
        expect(field.attributeName).to.equal(def.name)
      })
    })

    describe('label', () => {
      it('should get label string', async () => {
        const def = {name: 'field', label: 'field label'}

        const field = new Field(def)
        expect(field.label).to.be.an.instanceof(Promise)

        const result = await field.label
        expect(typeof result).to.be.equal('string')
        expect(result).to.equal(def.label)
      })

      it('should get label function', async () => {
        const label = 'field label 1'
        const def = {
          name: 'field',
          label (...args) {
            expect(args).to.have.lengthOf(0)
            expect(this).to.be.equal(field)
            return label
          }
        }

        const field = new Field(def)
        expect(await field.label).to.equal(label)
      })

      it('should get label Promise', async () => {
        const label = 'field label 2'
        const def = {
          name: 'field',
          label: () => new Promise(resolve => resolve(label))
        }

        const field = new Field(def)
        expect(await field.label).to.equal(label)
      })
    })

    describe('hint', () => {
      it('should get hint string', async () => {
        const def = {name: 'field', hint: 'field hint'}

        const field = new Field(def)
        expect(field.hint).to.be.an.instanceof(Promise)

        const result = await field.hint
        expect(typeof result).to.be.equal('string')
        expect(result).to.equal(def.hint)
      })

      it('should get hint function', async () => {
        const hint = 'field hint 1'
        const def = {
          name: 'field',
          hint (...args) {
            expect(args).to.have.lengthOf(0)
            expect(this).to.be.equal(field)
            return hint
          }
        }

        const field = new Field(def)
        expect(await field.hint).to.equal(hint)
      })

      it('should get hint Promise', async () => {
        const hint = 'field hint 2'
        const def = {
          name: 'field',
          hint: () => new Promise(resolve => resolve(hint))
        }

        const field = new Field(def)
        expect(await field.hint).to.equal(hint)
      })
    })

    describe('definition', () => {
      it('should get definition', () => {
        const def = {name: 'field', label: 'field label'}

        const field = new Field(def)
        expect(field.definition).to.equal(def)
      })
    })

    describe('options', () => {
      it('should get options object', async () => {
        const def = {name: 'field', options: {param: 1}}

        const field = new Field(def)
        expect(field.options).to.be.an.instanceof(Promise)

        const result = await field.options
        expect(typeof result).to.be.equal('object')
        expect(result).to.equal(def.options)
      })

      it('should get options function', async () => {
        const options = {value: 3}
        const def = {
          name: 'field',
          options (...args) {
            expect(args).to.have.lengthOf(0)
            expect(this).to.be.equal(field)
            return options
          }
        }

        const field = new Field(def)
        expect(await field.options).to.equal(options)
      })

      it('should get options Promise', async () => {
        const options = {value: 2}
        const def = {
          name: 'field',
          options: () => new Promise(resolve => resolve(options))
        }

        const field = new Field(def)
        expect(await field.options).to.equal(options)
      })
    })

    describe('value', () => {
      const checkValue = async (data, expectedValue) => {
        const field = new Field({name: 'field'}, data)
        const value = await field.value
        expect(value).to.be.equal(expectedValue)
      }

      it('should return correct native value', async () => {
        await checkValue({field: 1}, 1)
      })

      it('should return correct value from function', async () => {
        const expectedValue = {value: 5}
        await checkValue({field: () => expectedValue}, expectedValue)
      })

      it('should return correct value from promise', async () => {
        const expectedValue = {value: 2}
        await checkValue({field: () => Promise.resolve(expectedValue)}, expectedValue)
      })
    })
  })

  describe('getOption', () => {
    it('should return simple option', async () => {
      const expectedResult = 1
      const def = {name: 'field', options: {test: expectedResult}}
      const field = new Field(def)
      const result = await field.getOption('test')
      expect(result).to.be.equal(expectedResult)
    })

    it('should return option with async options', async () => {
      const expectedResult = 1
      const optionsCalled = []
      const def = {
        name: 'field',
        options: (...args) => {
          optionsCalled.push(args)
          return {
            test: expectedResult
          }
        }
      }
      const field = new Field(def)
      const result = await field.getOption('test')

      expect(result).to.be.equal(expectedResult)

      expect(optionsCalled).to.have.lengthOf(1)
      expect(optionsCalled[0]).to.have.lengthOf(0)
    })

    it('should return option with async option', async () => {
      const expectedResult = 1
      const expectedArgs = [{}, 5]
      const optionCalled = []
      const def = {
        name: 'field',
        options: {
          test: (...args) => {
            optionCalled.push(args)
            return expectedResult
          }
        }
      }
      const field = new Field(def)
      const result = await field.getOption('test', expectedArgs)

      expect(result).to.be.equal(expectedResult)

      expect(optionCalled).to.have.lengthOf(1)
      expect(optionCalled[0]).to.have.lengthOf(2)
      expect(optionCalled[0][0]).to.be.equal(expectedArgs[0])
      expect(optionCalled[0][1]).to.be.equal(expectedArgs[1])
    })
  })

  describe('callValueGetter', () => {
    const checkCallArgs = (called, expectedArg) => {
      expect(called).to.have.lengthOf(1)
      expect(called[0]).to.have.lengthOf(1)
      expect(called[0][0]).to.be.equal(expectedArg)
    }

    it('should call valueGetter from class', async () => {
      let called = []
      const returnObj = {}

      class MockField extends Field {
        valueGetter (...args) {
          called.push(args)
          return returnObj
        }
      }

      const fieldData = {field: 1}
      const field = new MockField({name: 'field'})
      const result = await field.callValueGetter(fieldData)
      checkCallArgs(called, fieldData)

      expect(result).to.be.equal(returnObj)
    })

    it('should call valueGetter from field definition', async () => {
      let classCalled = []
      const classReturnObj = {}

      class MockField extends Field {
        valueGetter (...args) {
          classCalled.push(args)
          return classReturnObj
        }
      }

      let defCalled = []
      const defReturnObj = {}
      const def = {
        name: 'field',
        valueGetter: (...args) => {
          defCalled.push(args)
          return defReturnObj
        }
      }

      const fieldData = {field: 1}
      const field = new MockField(def)
      const result = await field.callValueGetter(fieldData)
      checkCallArgs(defCalled, fieldData)
      expect(classCalled).to.have.lengthOf(0)

      expect(result).to.be.equal(defReturnObj)
    })
  })

  describe('valueGetter', () => {
    it('should return null data', () => {
      const field = new Field({name: 'field'})
      expect(field.valueGetter()).to.be.equal(null)
      expect(field.valueGetter(false)).to.be.equal(null)
      expect(field.valueGetter(null)).to.be.equal(null)
      expect(field.valueGetter(5)).to.be.equal(null)
      expect(field.valueGetter({})).to.be.equal(null)
      expect(field.valueGetter({field2: 1})).to.be.equal(null)
    })

    it('should return null nested data', () => {
      const field = new Field({name: 'struct.dir.field'})
      expect(field.valueGetter(null)).to.be.equal(null)
      expect(field.valueGetter({})).to.be.equal(null)
      expect(field.valueGetter({field2: 1})).to.be.equal(null)
      expect(field.valueGetter({struct: 1})).to.be.equal(null)
      expect(field.valueGetter({struct: {dir: {}}})).to.be.equal(null)
      expect(field.valueGetter({struct: {dir: {field2: 1}}})).to.be.equal(null)
    })

    it('should return value', () => {
      const field = new Field({name: 'field'})
      expect(field.valueGetter({field: null})).to.be.equal(null)
      expect(field.valueGetter({field: false})).to.be.equal(false)
      expect(field.valueGetter({field: 1})).to.be.equal(1)
      expect(field.valueGetter({field: 'string'})).to.be.equal('string')
      const nestedData = {nested: 2}
      expect(field.valueGetter({field: nestedData})).to.be.equal(nestedData)
      const valueFunc = () => 5
      expect(field.valueGetter({field: valueFunc})).to.be.equal(valueFunc)
    })

    it('should return value nested data', () => {
      const field = new Field({name: 'struct.dir.field'})
      expect(field.valueGetter({struct: {dir: {field: null}}})).to.be.equal(null)
      expect(field.valueGetter({struct: {dir: {field: false}}})).to.be.equal(false)
      expect(field.valueGetter({struct: {dir: {field: 'string'}}})).to.be.equal('string')
      expect(field.valueGetter({struct: {dir: {field: 0}}})).to.be.equal(0)
      const nestedData = {nested: 2}
      expect(field.valueGetter({struct: {dir: {field: nestedData}}})).to.be.equal(nestedData)
      const valueFunc = () => 5
      expect(field.valueGetter({struct: {dir: {field: valueFunc}}})).to.be.equal(valueFunc)
    })
  })
})
