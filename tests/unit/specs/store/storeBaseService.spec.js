import {assert} from 'chai'
import {createLocalVue} from '@vue/test-utils'
import Vuex from 'vuex'
import storeBaseService from '@/store/storeBaseService'

describe('store/storeBaseService.js', () => {
  it('extend for child object', async () => {
    const resultGetData = 'custom result getData'
    const resultRequestData = 'custom result _requestData'

    const store = storeBaseService.extend({
      namespaced: true,
      state: {
        cacheExpires: 0
      },
      actions: {
        async getData () {
          return resultGetData
        },
        async _requestData () {
          return resultRequestData
        },
        customAction () {
        }
      }
    })

    assert.equal(store.state.cacheExpires, 0)
    assert.isObject(store.state._requests)
    assert.isEmpty(store.state._requests)
    assert.isObject(store.state._data)
    assert.isEmpty(store.state._data)

    assert.isFunction(store.actions.customAction)
    assert.isFunction(store.actions.loadData)

    assert.isFunction(store.mutations._setData)
    assert.isFunction(store.mutations._setRequest)
    assert.isFunction(store.mutations.reset)

    assert.equal(await store.actions.getData(), resultGetData)
    assert.equal(await store.actions._requestData(), resultRequestData)
  })

  it('cache non expire getData with no keys', async () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    let called = 0

    const store = new Vuex.Store(storeBaseService.extend({
      namespaced: true,
      actions: {
        async _requestData (context, args) {
          called++
          assert.isUndefined(args)
          return called
        }
      }
    }))

    assert.isEmpty(store.state._data)
    assert.isEmpty(store.state._requests)

    assert.equal(await store.dispatch('getData'), 1)
    assert.equal(called, 1)

    assert.isEmpty(store.state._requests)
    assert.isNotEmpty(store.state._data)

    assert.include(Object.keys(store.state._data), store.state.defaultKey)

    const cachedData = store.state._data[store.state.defaultKey]
    assert.deepEqual(Object.keys(cachedData), ['data'])

    assert.equal(await store.dispatch('getData'), 1)
    assert.equal(called, 1)
  })

  it('cache expire getData with no keys', async () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    let called = 0

    const store = new Vuex.Store(storeBaseService.extend({
      namespaced: true,
      state: {
        cacheExpires: 2
      },
      actions: {
        async _requestData (context, args) {
          assert.isUndefined(args)
          called++
          return called
        }
      }
    }))

    assert.isEmpty(store.state._data)
    assert.isEmpty(store.state._requests)

    const timeBefore = new Date().getTime() + 2000

    assert.equal(await store.dispatch('getData'), 1)
    assert.equal(called, 1)

    const timeAfter = new Date().getTime() + 2000

    assert.isEmpty(store.state._requests)
    assert.isNotEmpty(store.state._data)

    assert.include(Object.keys(store.state._data), store.state.defaultKey)

    const cachedData = store.state._data[store.state.defaultKey]
    assert.deepEqual(Object.keys(cachedData).sort(), ['data', 'expires'])

    assert.isAtLeast(cachedData.expires, timeBefore)
    assert.isAtMost(cachedData.expires, timeAfter)

    assert.equal(await store.dispatch('getData'), 1)
    assert.equal(called, 1)

    // force expire
    cachedData.expires = new Date().getTime() - 1000

    assert.equal(await store.dispatch('getData'), 2)
    assert.equal(called, 2)
  })

  it('cache expire getData with multiple keys', async () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const called = []

    const store = new Vuex.Store(storeBaseService.extend({
      namespaced: true,
      state: {
        cacheExpires: 2
      },
      actions: {
        async _requestData (context, args) {
          called.push(args)
          return called.length
        }
      }
    }))

    assert.isEmpty(store.state._data)
    assert.isEmpty(store.state._requests)

    // Test key 1
    const key1 = 'id1'
    const timeBefore1 = new Date().getTime() + 2000

    assert.equal(await store.dispatch('getData', {key: key1}), 1)

    const timeAfter1 = new Date().getTime() + 2000

    assert.isEmpty(store.state._requests)
    assert.isNotEmpty(store.state._data)

    assert.equal(Object.keys(store.state._data).length, 1)
    assert.include(Object.keys(store.state._data), key1)

    const cachedData1 = store.state._data[key1]
    assert.deepEqual(Object.keys(cachedData1).sort(), ['data', 'expires'])

    assert.isAtLeast(cachedData1.expires, timeBefore1)
    assert.isAtMost(cachedData1.expires, timeAfter1)

    assert.deepEqual(called, [{key: key1}])

    assert.equal(await store.dispatch('getData', {key: key1}), 1)

    // Test key 2
    const key2 = 'id2'
    const timeBefore2 = new Date().getTime() + 2000
    assert.equal(await store.dispatch('getData', {key: key2}), 2)
    const timeAfter2 = new Date().getTime() + 2000

    assert.equal(await store.dispatch('getData', {key: key1}), 1)

    assert.equal(Object.keys(store.state._data).length, 2)
    assert.include(Object.keys(store.state._data), key2)

    const cachedData2 = store.state._data[key2]
    assert.deepEqual(Object.keys(cachedData2).sort(), ['data', 'expires'])

    assert.isAtLeast(cachedData2.expires, timeBefore2)
    assert.isAtMost(cachedData2.expires, timeAfter2)

    assert.deepEqual(called, [{key: key1}, {key: key2}])

    // force expire key 1
    cachedData1.expires = new Date().getTime() - 1000

    assert.equal(await store.dispatch('getData', {key: key1}), 3)
    assert.equal(await store.dispatch('getData', {key: key2}), 2)

    assert.deepEqual(called, [{key: key1}, {key: key2}, {key: key1}])
  })

  it('no cache getData with params', async () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const called = []

    const store = new Vuex.Store(storeBaseService.extend({
      namespaced: true,
      state: {
        cacheExpires: 0
      },
      actions: {
        async _requestData (context, args) {
          called.push(args)
          return called.length
        }
      }
    }))

    assert.isEmpty(store.state._data)
    assert.isEmpty(store.state._requests)

    const params = {testParams: 5}

    assert.equal(await store.dispatch('getData', {params}), 1)

    assert.isEmpty(store.state._data)

    assert.equal(await store.dispatch('getData', {params}), 2)

    assert.isEmpty(store.state._data)
    assert.deepEqual(called, [{params}, {params}])
  })

  it('_setRequest mutate requests state', async () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    const store = new Vuex.Store(storeBaseService.extend({namespaced: true}))

    assert.isEmpty(store.state._requests)

    const request1 = Promise.resolve(true)
    store.commit('_setRequest', {key: 'key1', request: request1})

    assert.deepEqual(store.state._requests, {
      key1: request1
    })

    const request2 = Promise.resolve(true)
    store.commit('_setRequest', {key: 'key2', request: request2})

    assert.deepEqual(store.state._requests, {
      key1: request1,
      key2: request2
    })
  })

  it('_setData mutate state without expire', async () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    const store = new Vuex.Store(storeBaseService.extend({namespaced: true}))

    assert.isEmpty(store.state._data)
    assert.isEmpty(store.state._requests)

    const value1 = 'value1'
    store.commit('_setData', {key: 'key1', data: value1})

    assert.deepEqual(store.state._data, {
      key1: {data: value1}
    })

    store.commit('_setRequest', {key: 'key1', request: true})
    store.commit('_setRequest', {key: 'key2', request: true})
    assert.deepEqual(Object.keys(store.state._requests).sort(), ['key1', 'key2'])

    const value2 = 'value2'
    store.commit('_setData', {key: 'key2', data: value2})

    assert.deepEqual(store.state._data, {
      key1: {data: value1},
      key2: {data: value2}
    })

    assert.deepEqual(Object.keys(store.state._requests).sort(), ['key1'])

    const value3 = 'value3'
    store.commit('_setData', {key: 'key1', data: value3})
    assert.deepEqual(store.state._data, {
      key1: {data: value3},
      key2: {data: value2}
    })

    assert.isEmpty(store.state._requests)
  })

  it('_setData mutate state with expire', async () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    const store = new Vuex.Store(storeBaseService.extend({
      namespaced: true,
      state: {
        cacheExpires: 2
      }
    }))

    assert.isEmpty(store.state._data)

    const value1 = 'value1'
    const timeBefore1 = new Date().getTime() + 2000
    store.commit('_setData', {key: 'key1', data: value1})
    const timeAfter1 = new Date().getTime() + 2000

    assert.deepEqual(store.state._data, {
      key1: {
        data: value1,
        expires: store.state._data.key1.expires
      }
    })

    assert.isAtLeast(store.state._data.key1.expires, timeBefore1)
    assert.isAtMost(store.state._data.key1.expires, timeAfter1)
  })

  it('_setData mutate state no cache', async () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    const store = new Vuex.Store(storeBaseService.extend({
      namespaced: true,
      state: {
        cacheExpires: 0
      }
    }))

    assert.isEmpty(store.state._data)
    store.commit('_setRequest', {key: 'key1', request: true})

    const value1 = 'value1'
    store.commit('_setData', {key: 'key1', data: value1})

    assert.isEmpty(store.state._data)
    assert.isEmpty(store.state._requests)
  })

  it('loadData waiting request', async () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const called = []

    const store = new Vuex.Store(storeBaseService.extend({
      namespaced: true,
      actions: {
        async _requestData (context, args) {
          called.push(args)
          return called.length
        }
      }
    }))

    const value = 'value1'
    const request = Promise.resolve(value)
    const key1 = 'key1'

    store.commit('_setRequest', {key: key1, request})

    assert.isEmpty(store.state._data)
    assert.equal(await store.dispatch('getData', {key: key1}), value)

    assert.isEmpty(store.state._data)
    assert.equal(called.length, 0)
  })

  it('clean removing expired entries', async () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    const store = new Vuex.Store(storeBaseService.extend({
      namespaced: true,
      state: {
        cacheExpires: 1
      }
    }))

    const keys = ['key1', 'key2', 'key3', 'key4']

    store.commit('_setData', {key: keys[0], data: 0})
    store.state._data[keys[0]].expires = new Date().getTime() - 1000

    store.commit('_setData', {key: keys[1], data: 0})
    store.state._data[keys[1]].expires = new Date().getTime() - 10000

    store.commit('_setData', {key: keys[2], data: 0})

    store.commit('_setData', {key: keys[3], data: 0})
    store.state._data[keys[3]].expires = null

    assert.equal(Object.keys(store.state._data).length, 4)

    store.commit('clean')

    assert.equal(Object.keys(store.state._data).length, 2)
    assert.deepEqual(Object.keys(store.state._data), [keys[2], keys[3]])
  })

  it('reset data and requests', async () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    const store = new Vuex.Store(storeBaseService.extend({
      namespaced: true,
      state: {
        cacheExpires: 1
      }
    }))

    const keys = ['key1', 'key2', 'key3', 'key4']

    store.commit('_setData', {key: keys[0], data: 0})
    store.commit('_setData', {key: keys[1], data: 0})
    store.commit('_setData', {key: keys[2], data: 0})

    store.commit('_setRequest', {key: keys[1], data: Promise.resolve(0)})
    store.commit('_setRequest', {key: keys[3], data: Promise.resolve(0)})

    assert.equal(Object.keys(store.state._data).length, 3)
    assert.equal(Object.keys(store.state._requests).length, 2)

    store.commit('reset')

    assert.isEmpty(store.state._data)
    assert.isEmpty(store.state._requests)
  })
})
