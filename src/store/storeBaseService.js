import Vue from 'vue'
import cu from '@/utils/common'

const storeBaseService = {
  /**
   * Extending given object with storeBaseService and returns new structure
   * @param {Object} object
   */
  extend (object) {
    return cu.mergeDeep({}, storeBaseService, object)
  },

  /**
   * Helper functions.
   * Cannot be accessed through store
   */
  helper: {
    /**
     * Retrieving key from arguments
     * @param {String, Object} args
     * @param {String} defaultKey
     * @returns {String}
     */
    getKeyFromArgs (args, defaultKey) {
      if (!args) return defaultKey
      if (typeof args === 'string') return args
      if (cu.isObject(args)) return args.key || defaultKey

      console.warn('Invalid argument given in getKeyFromArgs', typeof args, args)

      return defaultKey
    }
  },

  state: {
    _requests: {},
    _data: {},

    /**
     * Default key when no key is given
     * @type String
     * @default '__null'
     */
    defaultKey: '__null',

    /**
     * Contains expire time of data in seconds. Null: cache forever. 0: no cache
     * @type Integer, Null
     * @default null
     */
    cacheExpires: null
  },

  actions: {
    /**
     * Retrieve data either from cache or service. According to given key (optional) or using defaultKey
     * @param context
     * @param {String, Object} [args]
     * Arguments given through functions.
     * Can either be string as key or object containing key and optional properties
     * @returns {Promise<Any>}
     * Promise containing results from cache or service
     */
    async getData ({state, dispatch}, args) {
      const key = storeBaseService.helper.getKeyFromArgs(args, state.defaultKey)

      if (state._data.hasOwnProperty(key)) {
        if (!state._data[key].expires || state._data[key].expires > new Date().getTime()) {
          return state._data[key].data
        }
      }

      return dispatch('loadData', args)
    },

    /**
     * Load data from a request. Either perform a new request or attach to currently running request
     * @param context
     * @param {String, Object} [args]
     * Arguments given through functions.
     * Can either be string as key or object containing key and optional properties
     * @returns {Promise<Any>}
     * Promise containing results service request
     */
    async loadData ({state, commit, dispatch}, args) {
      const key = storeBaseService.helper.getKeyFromArgs(args, state.defaultKey)

      if (state._requests.hasOwnProperty(key) && state._requests[key] !== null) {
        return state._requests[key]
      }

      const request = dispatch('_requestData', args).then(data => {
        commit('_setData', {data, key})

        return data
      })

      commit('_setRequest', {request, key})
      return request
    },

    /**
     * Base action to perform actual service request. Requires implementation
     * @param context
     * @param {String, Object} [args]
     * Arguments given through functions.
     * Can either be string as key or object containing key and optional properties
     * @returns {Promise<Any>}
     * Promise containing results service request
     * @private
     */
    async _requestData (context, args) {
      console.warn('Missing implementation of _requestData')
      return Promise.resolve(null)
    }
  },

  mutations: {
    /**
     * Set data for given key and expire time when cache should expire
     * @param state
     * @param {Any} data
     * Data to be cached
     * @param {String} key
     * Key to save data
     * @private
     */
    _setData (state, {data, key}) {
      if (state.cacheExpires !== 0) {
        const _data = {data}

        if (state.cacheExpires !== null) {
          _data.expires = new Date().getTime() + (state.cacheExpires * 1000)
        }

        Vue.set(state._data, key, _data)
      }

      Vue.delete(state._requests, key)
    },

    /**
     * Sets request promise of given key
     * @param state
     * @param {Promise} request
     * @param {String} key
     * @private
     */
    _setRequest (state, {request, key}) {
      Vue.set(state._requests, key, request)
    },

    /**
     * Check for expired data and removes them
     * @param state
     */
    clean (state) {
      let key
      const expiredTime = new Date().getTime()
      for (key of Object.keys(state._data)) {
        if (state._data[key].expires && state._data[key].expires < expiredTime) {
          Vue.delete(state._data, key)
        }
      }
    },

    /**
     * Reset all requests and data
     * @param state
     */
    reset (state) {
      state._requests = {}
      state._data = {}
    }
  }
}

export default storeBaseService
