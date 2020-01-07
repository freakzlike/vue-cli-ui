import Field from './Field'
import {StringFixFieldMixin} from './mixins'

/**
 * FieldDef
 {
    extend: ChoiceField,
    options: {
      prefix: Prefix to attach in front of string
      suffix: Suffix to attach at the end of the string,
      choices: List with choices
      choiceText:
      choiceValue:
    }
  }
 */

class ChoiceField extends StringFixFieldMixin(Field) {
  static displayComponent = () => import('@/components/fields/JstDisplayStringField')
  static inputComponent = () => import('@/components/fields/JstInputChoiceField')

  /**
   * Defined choices from field options
   * @returns {Promise<Array>}
   */
  get choices () {
    return this.value.then(value => this.getChoices(value, this.data))
  }

  /**
   * Retrieve choices from field options
   * @param {Any} value Resolved value
   * @param {Object} data
   * @returns {Promise<Array>}
   */
  async getChoices (value, data) {
    return this.getOption('choices', [value, data])
  }

  /**
   * Defined choices text attribute from field options or default attribute 'text'
   * @returns {Promise<string>}
   */
  get choiceText () {
    return this.getOption('choiceText').then(choiceText => choiceText || 'text')
  }

  /**
   * Defined choices value attribute from field options or default attribute 'value'
   * @returns {Promise<string>}
   */
  get choiceValue () {
    return this.getOption('choiceValue').then(choiceValue => choiceValue || 'value')
  }

  async getChoiceForValue (value) {
    const [choices, choiceValue] = await Promise.all([this.choices, this.choiceValue])
    return choices.find(choice => {
      if (typeof choice === 'object') {
        return choice[choiceValue] === value
      } else {
        return choice === value
      }
    })
  }

  async valueFormatter (value, data) {
    const foundChoice = await this.getChoiceForValue(value)

    if (typeof foundChoice === 'object') {
      const choiceText = await this.choiceText
      return super.valueFormatter(foundChoice[choiceText], data)
    } else {
      return super.valueFormatter(foundChoice, data)
    }
  }
}

export {ChoiceField}
