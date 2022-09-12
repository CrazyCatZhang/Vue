import observe from "./observe";

export default function defineReactive(data, key, value = data[key]) {
    observe(value)
    Object.defineProperty(data, key, {
        get() {
            console.log(key + '的value被获取了')
            return value
        },
        set(newValue) {
            if (value === newValue) return
            console.log(key + '的value被修改了')
            value = newValue
            observe(newValue)
        }
    })
}

