import Vue from 'vue'
import cu from '@/utils/common'

/**
 * FieldDef
 {
    name: 'label',
    attributeName: 'attributeName',
    label: i18n.lazy.t(''),
    hint: i18n.lazy.t(''),
    extend: Field,
    options: {}
  }
 */

class Field {
  /**
   * Constructor
   * @param {Object} definition Field definition
   * @param {Object} [data=null] Optional data
   */
  constructor (definition, data) {
    this._def = definition
    this._data = data || null
  }

  /**
   * Clone current field instance and return new instance
   * @returns {Field}
   */
  clone () {
    const FieldClass = this.constructor
    return new FieldClass(this._def, this._data)
  }

  /**
   * Name of field
   * @returns {String}
   */
  get name () {
    return this._def.name
  }

  /**
   * Name of attribute in data
   * @returns {String}
   */
  get attributeName () {
    return this._def.attributeName || this.name
  }

  /**
   * Field label
   * @returns {Promise<string>}
   */
  get label () {
    return cu.promiseEval(this._def.label, this)
  }

  /**
   * Field hint
   * @returns {Promise<string>}
   */
  get hint () {
    return cu.promiseEval(this._def.hint, this)
  }

  /**
   * Field definition
   * @returns {Object}
   */
  get definition () {
    return this._def
  }

  /**
   * Field data
   * @returns {Object}
   */
  get data () {
    return this._data
  }

  /**
   * Field options
   * @returns {Promise}
   */
  get options () {
    return cu.promiseEval(this._def.options, this).then(options => options || {})
  }

  /**
   * Field native value
   * @returns {Promise<Any>}
   */
  get value () {
    return this.callValueGetter(this.data).then(value => cu.promiseEval(value, this))
  }

  /**
   * TODO: Unittest + docs
   */
  set value (value) {
    this.callValueSetter(value, this.data)
  }

  /**
   * Retrieve async option from field options
   * @param {string} option Option name
   * @param {Array<Any>=null} args Optional arguments to evaluate option
   * @returns {Promise<Any>}
   */
  async getOption (option, args) {
    const options = await this.options
    const _args = args || []
    return cu.promiseEval(options[option], this, ..._args)
  }

  _getDefAttribute (name, fromStatic) {
    if (this._def[name]) {
      return this._def[name]
    } else if (fromStatic) {
      return this.constructor[name]
    } else {
      return this[name]
    }
  }

  /**
   * Call valueGetter either from field definition or from current instance
   * @param {Object} data
   * @returns {Promise<Any>}
   */
  callValueGetter (data) {
    const valueGetter = this._getDefAttribute('valueGetter')
    return cu.promiseEval(valueGetter, this, data)
  }

  /**
   * Retrieve value from data structure according to attributeName
   * @param {Object|Any} data
   * @returns {null|Any}
   */
  valueGetter (data) {
    if (!data || typeof data !== 'object') return null

    if (!this.attributeName.includes('.')) {
      const value = data[this.attributeName]
      return !cu.isNull(value) ? value : null
    }

    const subFields = this.attributeName.split('.')
    let currentObject = data
    let subFieldName
    for (subFieldName of subFields) {
      currentObject = currentObject[subFieldName]
      if (cu.isNull(currentObject)) {
        return null
      }
    }

    return !cu.isNull(currentObject) ? currentObject : null
  }

  /**
   * TODO: Unittest + docs
   * Call valueSetter either from field definition or from current instance
   * @param {Any} value
   * @param {Object} data
   * @returns {Promise<Any>}
   */
  callValueSetter (value, data) {
    const valueSetter = this._getDefAttribute('valueSetter')
    cu.eval(valueSetter, this, value, data)
  }

  /**
   * TODO: Unittest + docs
   */
  valueSetter (value, data) {
    Vue.set(data, this.attributeName, value)
  }

  /**
   * TODO: Unittest + docs
   * @returns {Promise}
   */
  get displayComponent () {
    const displayComponent = this._getDefAttribute('displayComponent', true)
    return cu.promiseEval(displayComponent, this)
  }

  /**
   * TODO: Unittest + docs
   * @returns {Promise}
   */
  get inputComponent () {
    const inputComponent = this._getDefAttribute('inputComponent', true)
    return cu.promiseEval(inputComponent, this)
  }
}

export default Field
