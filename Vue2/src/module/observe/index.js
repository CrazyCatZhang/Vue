import Observer from "./Observer";

export default function (data) {
    if (typeof data !== 'object' || data === null) return
    if (data.__ob__ instanceof Observer) return data.__ob__
    return new Observer(data)
}