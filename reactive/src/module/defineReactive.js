import observe from "./observe";
import Dep from "./Dep";

export default function defineReactive(data, key, value = data[key]) {
    const dep = new Dep()
    let childOb = observe(value)
    Object.defineProperty(data, key, {
        get() {
            if (Dep.target) {
                dep.depend()
                if (childOb) {
                    childOb.dep.depend()
                    if (Array.isArray(value)) dependencyArray(value)
                }
            }
            return value
        },
        set(newValue) {
            if (value === newValue) return
            value = newValue
            childOb = observe(newValue)
            dep.notify()
        }
    })
}

function dependencyArray(array) {
    for (let item of array) {
        item && item.__ob__ && item.__ob__.dep.depend()
        if (Array.isArray(item)) dependencyArray(item)
    }
}