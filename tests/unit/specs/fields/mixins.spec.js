import {expect} from 'chai'
import Field from '@/fields/Field'
import {PreSuffixFieldMixin, StringableFieldMixin, StringFixFieldMixin} from '@/fields/mixins'

describe('fields/mixin.js', () => {
  describe('PreSuffixFieldMixin', () => {
    const FieldClass = PreSuffixFieldMixin(Field)
    const fieldData = {field: 'value', other: 1}

    const checkGetters = (name, getter) => () => {
      it(`should return no ${name}`, async () => {
        const field = new FieldClass({name: 'field'}, fieldData)
        const result = await getter(field)
        expect(result).to.be.equal(undefined)
      })

      it(`should return static ${name}`, async () => {
        const def = {name: 'field', options: {}}
        def.options[name] = 'text'

        const field = new FieldClass(def, fieldData)
        const result = await getter(field)
        expect(result).to.be.equal(def.options[name])
      })

      it(`should return promise ${name}`, async () => {
        const called = []
        const expectedResult = 'text'
        const def = {name: 'field', options: {}}
        def.options[name] = (...args) => {
          called.push(args)
          return Promise.resolve(expectedResult)
        }

        const field = new FieldClass(def, fieldData)
        const result = await getter(field)
        expect(result).to.be.equal(expectedResult)

        expect(called).to.have.lengthOf(1)
        expect(called[0]).to.have.lengthOf(2)
        expect(called[0][0]).to.be.equal(fieldData.field)
        expect(called[0][1]).to.be.equal(fieldData)
      })

      it(`should return ${name} with promise value`, async () => {
        const valueCalled = []
        const methodCalled = []
        const expectedResult = 'text'
        const expectedValue = 5
        const data = {
          field: (...args) => {
            valueCalled.push(args)
            return Promise.resolve(expectedValue)
          }
        }
        const def = {name: 'field', options: {}}
        def.options[name] = (...args) => {
          methodCalled.push(args)
          return Promise.resolve(expectedResult)
        }

        const field = new FieldClass(def, data)
        const result = await getter(field)
        expect(result).to.be.equal(expectedResult)

        expect(valueCalled).to.have.lengthOf(1)
        expect(valueCalled[0]).to.have.lengthOf(0)

        expect(methodCalled).to.have.lengthOf(1)
        expect(methodCalled[0]).to.have.lengthOf(2)
        expect(methodCalled[0][0]).to.be.equal(expectedValue)
        expect(methodCalled[0][1]).to.be.equal(data)
      })

      it(`should return ${name} with promise options`, async () => {
        const called = []
        const expectedResult = 'text'
        const def = {
          name: 'field',
          options: (...args) => {
            called.push(args)
            const options = {}
            options[name] = expectedResult
            return Promise.resolve(options)
          }
        }

        const field = new FieldClass(def, fieldData)
        const result = await getter(field)
        expect(result).to.be.equal(expectedResult)

        expect(called).to.have.lengthOf(1)
        expect(called[0]).to.have.lengthOf(0)
      })

      it(`should return no ${name} with promise options`, async () => {
        const called = []
        const def = {
          name: 'field',
          options: (...args) => {
            called.push(args)
            return Promise.resolve({})
          }
        }

        const field = new FieldClass(def, fieldData)
        const result = await getter(field)
        expect(result).to.be.equal(undefined)

        expect(called).to.have.lengthOf(1)
        expect(called[0]).to.have.lengthOf(0)
      })
    }

    describe('prefix', checkGetters('prefix', field => field.prefix))
    describe('suffix', checkGetters('suffix', field => field.suffix))
  })

  describe('StringableFieldMixin', () => {
    const FieldClass = StringableFieldMixin(Field)

    describe('display/valueFormatter', () => {
      const checkDisplay = async (data, expectedValue, options) => {
        const def = {name: 'field'}
        if (options) {
          def.options = options
        }
        const field = new FieldClass(def, data)
        const value = await field.display
        expect(value).to.be.equal(expectedValue)
      }

      it('should return correct null display', async () => {
        await checkDisplay({otherField: 1}, null)
      })

      it('should return correct display', async () => {
        const expectedValue = 'random string'
        await checkDisplay({field: expectedValue}, expectedValue)
      })

      it('should return correct display from function', async () => {
        const expectedValue = 'random string'
        await checkDisplay({field: () => expectedValue}, expectedValue)
      })

      it('should return correct display from promise', async () => {
        const expectedValue = 'random string'
        await checkDisplay({field: () => Promise.resolve(expectedValue)}, expectedValue)
      })
    })

    describe('callValueFormatter', () => {
      const checkCallArgs = (called, expectedValue, expectedData) => {
        expect(called).to.have.lengthOf(1)
        expect(called[0]).to.have.lengthOf(2)
        expect(called[0][0]).to.be.equal(expectedValue)
        expect(called[0][1]).to.be.equal(expectedData)
      }

      it('should call valueFormatter from class', async () => {
        let called = []
        const returnObj = {}

        class MockField extends FieldClass {
          valueFormatter (...args) {
            called.push(args)
            return returnObj
          }
        }

        const fieldData = {field: 1}
        const field = new MockField({name: 'field'})
        const result = await field.callValueFormatter(fieldData.field, fieldData)
        checkCallArgs(called, fieldData.field, fieldData)

        expect(result).to.be.equal(returnObj)
      })

      it('should call valueFormatter from field definition', async () => {
        let classCalled = []
        const classReturnObj = {}

        class MockField extends FieldClass {
          valueFormatter (...args) {
            classCalled.push(args)
            return classReturnObj
          }
        }

        let defCalled = []
        const defReturnObj = {}
        const def = {
          name: 'field',
          valueFormatter: (...args) => {
            defCalled.push(args)
            return defReturnObj
          }
        }

        const fieldData = {field: 1}
        const field = new MockField(def)
        const result = await field.callValueFormatter(fieldData.field, fieldData)
        checkCallArgs(defCalled, fieldData.field, fieldData)
        expect(classCalled).to.have.lengthOf(0)

        expect(result).to.be.equal(defReturnObj)
      })
    })
  })

  describe('StringFixFieldMixin', () => {
    const FieldClass = StringFixFieldMixin(Field)

    describe('display/valueFormatter', () => {
      const checkDisplay = async (data, expectedValue, options) => {
        const def = {name: 'field'}
        if (options) {
          def.options = options
        }
        const field = new FieldClass(def, data)
        const value = await field.display
        expect(value).to.be.equal(expectedValue)
      }

      it('should return correct null display', async () => {
        await checkDisplay({otherField: 1}, null)
      })

      it('should return correct display', async () => {
        const expectedValue = 'random string'
        await checkDisplay({field: expectedValue}, expectedValue)
      })

      it('should return correct display from function', async () => {
        const expectedValue = 'random string'
        await checkDisplay({field: () => expectedValue}, expectedValue)
      })

      it('should return correct display from promise', async () => {
        const expectedValue = 'random string'
        await checkDisplay({field: () => Promise.resolve(expectedValue)}, expectedValue)
      })

      it('should return correct display with prefix', async () => {
        const value = 'random string'
        const prefix = 'prefix text'

        await checkDisplay({field: value}, `${prefix} ${value}`, {prefix})
      })

      it('should return correct display with suffix', async () => {
        const value = 'random string'
        const suffix = 'suffix text'

        await checkDisplay({field: value}, `${value} ${suffix}`, {suffix})
      })

      it('should return correct display with prefix and suffix', async () => {
        const value = 'random string'
        const prefix = 'prefix text'
        const suffix = 'suffix text'

        await checkDisplay({field: value}, `${prefix} ${value} ${suffix}`, {prefix, suffix})
      })

      it('should return correct display with lazy prefix and suffix', async () => {
        const value = 'random string'
        const prefix = 'prefix text'
        const suffix = 'suffix text'

        await checkDisplay({field: value}, `${prefix} ${value} ${suffix}`, {
          prefix: () => Promise.resolve(prefix),
          suffix: () => Promise.resolve(suffix)
        })
      })

      it('should return correct display with empty prefix and suffix', async () => {
        const value = 'random string'

        await checkDisplay({field: value}, value, {
          prefix: () => Promise.resolve(null),
          suffix: () => ''
        })
      })
    })
  })
})
