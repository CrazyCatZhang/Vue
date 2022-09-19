import observe from "./index";
import Dep from "./Dep";

export default function (target, key, value = target[key]) {
    let childOb = observe(value)
    const dep = new Dep()
    Object.defineProperty(target, key, {
        get() {
            if (Dep.target) {
                dep.depend()
                if (childOb) {
                    childOb.dep.depend()
                    if (Array.isArray(value)) {
                        dependArray(value)
                    }
                }
            }
            return value
        },
        set(newValue) {
            if (value === newValue) return
            childOb = observe(newValue)
            value = newValue
            dep.notify()
        }
    })
}

function dependArray(array) {
    for (let e of array) {
        e && e.__ob__ && e.__ob__.dep.depend()
        if (Array.isArray(e)) {
            dependArray(e)
        }
    }
}