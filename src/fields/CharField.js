import Field from './Field'
import {StringFixFieldMixin} from './mixins'

/**
 * FieldDef
 {
    extend: CharField,
    options: {
      prefix: Prefix to attach in front of string
      suffix: Suffix to attach at the end of the string
    }
  }
 */

class CharField extends StringFixFieldMixin(Field) {
  static displayComponent = () => import('@/components/fields/JstDisplayStringField')
  static inputComponent = () => import('@/components/fields/JstInputStringField')
}

export {CharField}
