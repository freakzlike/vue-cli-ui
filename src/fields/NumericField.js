import Field from './Field'
import {StringFixFieldMixin} from './mixins'

/**
 * FieldDef
 {
    extend: NumericField,
    options: {
      prefix: Prefix to attach in front of string
      suffix: Suffix to attach at the end of the string
    }
  }
 */

class NumericField extends StringFixFieldMixin(Field) {
  static displayComponent = () => import('@/components/fields/display/JstDisplayStringField')
  static inputComponent = () => import('@/components/fields/input/JstInputNumericField')
}

export {NumericField}
