import observe from "../observe";

export default function initState(vm) {
    const data = vm.$options.data
    if (data) {
        initData(vm)
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