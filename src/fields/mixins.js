import cu from '@/utils/common'

/**
 * PreSuffixFieldMixin
 * Mixin to add prefix and suffix methods to model
 */
const PreSuffixFieldMixin = superclass => class extends superclass {
  /**
   * Defined prefix from field options
   * @returns {Promise<string|Any>}
   */
  get prefix () {
    return this.value.then(value => this.getPrefix(value, this.data))
  }

  /**
   * Retrieves prefix from field options
   * @param {Any} value Resolved value
   * @param {Object} data
   * @returns {Promise<string|Any>}
   */
  async getPrefix (value, data) {
    return this.getOption('prefix', [value, data])
  }

  /**
   * Defined suffix from field options
   * @returns {Promise<string|Any>}
   */
  get suffix () {
    return this.value.then(value => this.getSuffix(value, this.data))
  }

  /**
   * Retrieves suffix from field options
   * @param {Any} value Resolved value
   * @param {Object} data
   * @returns {Promise<string|Any>}
   */
  async getSuffix (value, data) {
    return this.getOption('suffix', [value, data])
  }
}

/**
 * StringableFieldMixin
 * Mixin to format a value that can be converted to a string
 */
const StringableFieldMixin = superclass => class extends superclass {
  /**
   * Formatted field value for display
   * @returns {Promise<string>}
   */
  get display () {
    return this.value.then(value => this.callValueFormatter(value, this.data))
  }

  /**
   * Call valueFormatter either from field definition or from current instance
   * @param {String|Number} value Resolved value
   * @param {Object} data
   * @returns {Promise<string|null>}
   */
  callValueFormatter (value, data) {
    const valueFormatter = this._getDefAttribute('valueFormatter')
    return cu.promiseEval(valueFormatter, this, value, data)
  }

  /**
   * Format value to string
   * @param {String|Number} value Resolved value
   * @param {Object} data
   * @returns {Promise<string|null>}
   */
  async valueFormatter (value, data) {
    if (cu.isNull(value)) return null

    return value
  }
}

/**
 * StringFixFieldMixin
 * Mixin to format a value that can be converted to a string
 */
const StringFixFieldMixin = superclass => class extends StringableFieldMixin(PreSuffixFieldMixin(superclass)) {
  /**
   * Format value to string and attach prefix and suffix
   * @param {String|Number} value Resolved value
   * @param {Object} data
   * @returns {Promise<string|null>}
   */
  async valueFormatter (value, data) {
    let formattedValue = await super.valueFormatter(value, data)
    if (cu.isNull(formattedValue)) return null

    // Resolve pre- and suffix parallel
    const [prefix, suffix] = await Promise.all([this.getPrefix(value, data), this.getSuffix(value, data)])
    if (prefix) {
      formattedValue = prefix + ' ' + formattedValue
    }
    if (suffix) {
      formattedValue += ' ' + suffix
    }

    return formattedValue
  }
}

export {
  PreSuffixFieldMixin,
  StringableFieldMixin,
  StringFixFieldMixin
}
