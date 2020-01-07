const funcs = {
  /**
   * clone
   * deep clone javascript object
   * @param {Any} obj
   * @returns {Any}
   */
  clone (obj) {
    if (obj === null || typeof obj !== 'object') {
      return obj
    }
    let copy = obj.constructor()
    for (let attr in obj) {
      if (obj.hasOwnProperty(attr)) {
        copy[attr] = funcs.clone(obj[attr])
      }
    }
    return copy
  },

  /**
   * Simple object check.
   * Source: https://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge
   * @param {Any} item
   * @param {Boolean} arrayIsObject
   * @returns {Boolean}
   */
  isObject (item, arrayIsObject = false) {
    if (item && typeof item === 'object') {
      return !Array.isArray(item) || arrayIsObject
    } else {
      return false
    }
  },

  /**
   * Deep merge two objects.
   * Source: https://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge
   * @param {Object} target
   * @param {Object} sources
   * @returns {Object}
   */
  mergeDeep (target, ...sources) {
    if (!sources.length) return target
    const source = sources.shift()

    if (funcs.isObject(target) && funcs.isObject(source)) {
      for (const key in source) {
        if (source.hasOwnProperty(key)) {
          if (funcs.isObject(source[key])) {
            if (!target[key]) Object.assign(target, {[key]: {}})
            funcs.mergeDeep(target[key], source[key])
          } else {
            Object.assign(target, {[key]: source[key]})
          }
        }
      }
    }

    return funcs.mergeDeep(target, ...sources)
  },

  /**
   * Check whether value is null or undefined is empty
   * @param {Any} value
   * @returns {Boolean}
   */
  isNull (value) {
    return value === null || value === undefined
  },

  /**
   * Deep compare two objects
   * Will not work with circular objects and only compares method names
   * @param {Any} obj1
   * @param {Any} obj2
   * @returns {Boolean}
   */
  deepCompare (obj1, obj2) {
    if (obj1 === obj2) return true
    if (funcs.isNull(obj1) || funcs.isNull(obj2)) return false
    if (Array.isArray(obj1) !== Array.isArray(obj2)) return false
    if (funcs.isObject(obj1, true) !== funcs.isObject(obj2, true)) return false
    if (!funcs.isObject(obj1, true)) {
      // Primitive objects! -> Simple compare with: !==
      if (obj1 !== obj2) return false
    }
    if (Object.keys(obj1).length !== Object.keys(obj2).length) return false

    for (const p in obj1) {
      if (obj1.hasOwnProperty(p)) {
        if (!obj2.hasOwnProperty(p)) {
          return false
        }

        switch (typeof (obj1[p])) {
          case 'object':
            if (!funcs.deepCompare(obj1[p], obj2[p])) {
              return false
            }
            break
          case 'function':
            if (typeof (obj2[p]) === 'undefined' || (obj1[p].toString() !== obj2[p].toString())) {
              return false
            }
            break
          default:
            if (obj1[p] !== obj2[p]) {
              return false
            }
        }
      }
    }

    return true
  },

  /**
   * Call value if callable else return value
   * @param {Any} value
   * @param {Any} context
   * @param {Any} args
   * @returns {Any}
   */
  eval (value, context, ...args) {
    return typeof value === 'function' ? value.call(context, ...args) : value
  },

  /**
   * Call value if callable else use value to resolve Promise
   * @param {Any} value
   * @param {Any} context
   * @param {Any} args
   * @returns {Promise}
   */
  promiseEval (value, context, ...args) {
    return Promise.resolve(funcs.eval(value, context, ...args))
  },

  NO_VALUE: {}
}

export default funcs
