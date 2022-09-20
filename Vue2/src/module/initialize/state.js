import observe from "../observe";
import Watcher from "../observe/Watcher";
import Dep from "../observe/Dep";

export default function initState(vm) {
    const data = vm.$options.data
    const computed = vm.$options.computed
    if (data) {
        initData(vm)
    }
    if (computed) {
        initComputed(vm)
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


















