import observe from "./index";
import Dep from "./Dep";

export default function (target, key, value = target[key]) {
    observe(value)
    const dep = new Dep()
    Object.defineProperty(target, key, {
        get() {
            if (Dep.target) {
                dep.depend()
            }
            return value
        },
        set(newValue) {
            console.log('触发了setter')
            if (value === newValue) return
            observe(newValue)
            value = newValue
            dep.notify()
        }
    })
}