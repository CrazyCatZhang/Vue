import observe from "./observe";
import Dep from "./Dep";

export default function defineReactive(data, key, value = data[key]) {
    const dep = new Dep()
    observe(value)
    Object.defineProperty(data, key, {
        get() {
            dep.depend()
            return value
        },
        set(newValue) {
            if (value === newValue) return
            value = newValue
            observe(newValue)
            dep.notify()
        }
    })
}

