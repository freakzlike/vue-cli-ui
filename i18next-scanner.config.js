var fs = require('fs')
// i18next-scanner --config i18next-scanner.config.js

module.exports = {
  input: [
    'src/**/*.{js,jsx,vue}',
    '!src/locales/**'
  ],
  options: {
    debug: false,
    removeUnusedKeys: true,
    sort: true,
    attr: {
      list: ['data-i18n', '$t'],
      extensions: ['.html', '.htm', '.vue']
    },
    func: {
      list: ['$t', 'i18next.t', 'i18n.t', 'i18n.lazy.t'],
      extensions: ['.js', '.vue']
    },
    trans: {
      component: 'Trans',
      i18nKey: 'i18nKey',
      defaultsKey: 'defaults',
      extensions: ['.js', '.jsx'],
      fallbackKey: false
    },
    lngs: ['en', 'de'],
    ns: ['common', 'namespace1'],
    defaultLng: 'en',
    defaultNs: 'common',
    defaultValue: '',
    resource: {
      loadPath: 'src/locales/{{lng}}/{{ns}}.json',
      savePath: 'src/locales/{{lng}}/{{ns}}.json',
      jsonIndent: 2,
      lineEnding: '\n'
    },
    nsSeparator: ':',
    keySeparator: '.',
    pluralSeparator: '_',
    contextSeparator: '_',
    interpolation: {
      prefix: '{{',
      suffix: '}}'
    }
  },
  transform: function customTransform (file, enc, done) {
    'use strict'
    const parser = this.parser
    const content = fs.readFileSync(file.path, enc)

    if (file.path.endsWith('.vue')) {
      var templateRegex = /<template>([\s,[\S]*)<\/template>/
      var results = templateRegex.exec(content)
      if (results && results.length > 0) {
        var funcRegex = new RegExp(/\$t\('(\S+)'/, 'g')
        var z
        while ((z = funcRegex.exec(results[1]))) {
          parser.set(z[1])
        }
      }
    }

    done()
  }
}
