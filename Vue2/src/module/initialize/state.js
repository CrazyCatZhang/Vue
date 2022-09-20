import observe from "../observe";
import Watcher from "../observe/Watcher";
import Dep from "../observe/Dep";
import {nextTick} from "../observe/asynchronous";
import Vue from "../Vue";

export default function initState(vm) {
    const {data, computed, watch} = vm.$options
    if (data) {
        initData(vm)
    }
    if (computed) {
        initComputed(vm)
    }
    if (watch) {
        initWatch(vm)
    }
}

function initData(vm) {
    let data = vm.$options.data
    data = typeof data === 'function' ? data.call(vm) : data
    vm._data = data
    observe(data)
    for (const dataKey in data) {
        proxy(vm, '_data', dataKey)
    }
}

function proxy(vm, target, key) {
    Object.defineProperty(vm, key, {
        get() {
            return vm[target][key]
        },
        set(v) {
            vm[target][key] = v
        }
    })
}

function initComputed(vm) {
    const computed = vm.$options.computed
    const watchers = vm._computedWatchers = {}
    for (const computedKey in computed) {
        let useDef = computed[computedKey]
        const fn = typeof useDef === 'function' ? useDef : useDef.get
        watchers[computedKey] = new Watcher(vm, fn, {lazy: true})

        defineComputed(vm, computedKey, useDef)
    }
}

function defineComputed(target, key, useDef) {
    const setter = useDef.set || (() => {
    })
    Object.defineProperty(target, key, {
        get: createComputedGetter(key),
        set: setter
    })
}

function createComputedGetter(key) {
    return function () {
        const watcher = this._computedWatchers[key]
        if (watcher.dirty) {
            watcher.evaluate()
        }
        if (Dep.target) {
            watcher.depend()
        }
        return watcher.value
    }
}

function initWatch(vm) {
    const watch = vm.$options.watch
    for (const watchKey in watch) {
        const handler = watch[watchKey]
        if (Array.isArray(handler)) {
            for (const handlerKey in handler) {
                createWatcher(vm, watchKey, handler[handlerKey])
            }
        } else {
            createWatcher(vm, watchKey, handler)
        }
    }
}

function createWatcher(vm, key, handler) {
    if (typeof handler === 'string') {
        handler = vm[handler]
    }
    return vm.$watch(key, handler)
}

export function initStateMixin(Vue) {
    Vue.prototype.$nextTick = nextTick

    Vue.prototype.$watch = function (expressionOrFn, callback) {
        new Watcher(this, expressionOrFn, {user: true}, callback)
    }
}

















