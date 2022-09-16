import observe from "./index";

export default function (target, key, value = target[key]) {
    observe(value)
    Object.defineProperty(target, key, {
        get() {
            return value
        },
        set(newValue) {
            console.log('触发了setter')
            if (value === newValue) return
            observe(newValue)
            value = newValue
        }
    })
}