import Field from './Field'
import {StringableFieldMixin} from './mixins'

import i18n from '@/plugins/i18n'

/**
 * FieldDef
 {
    extend: BooleanField,
    options: {
      nullAsEmpty: Boolean flag whether null value should be displayed as empty or false
    }
  }
 */

class BooleanField extends StringableFieldMixin(Field) {
  static displayComponent = () => import('@/components/fields/JstDisplayStringField/')

  async valueFormatter (value, data) {
    const [formattedValue, nullAsEmpty] = await Promise.all([
      super.valueFormatter(value, data),
      this.getOption('nullAsEmpty', [value, data])
    ])

    if (formattedValue) {
      return i18n.t('yes')
    } else {
      return nullAsEmpty ? null : i18n.t('no')
    }
  }
}

export {BooleanField}
