import Observer from "./Observer";

export default function observe(value) {
    if (typeof value !== 'object') return
    new Observer(value)
}