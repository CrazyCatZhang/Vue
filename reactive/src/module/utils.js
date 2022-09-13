export function def(obj, key, value, enumerable = false) {
    Object.defineProperty(obj, key, {
        value,
        enumerable,
        writable: true,
        configurable: true
    })
}

export function parseExpression(obj, expression) {
    const segments = expression.split('.')
    for (let key of segments) {
        if (!obj) return
        obj = obj[key]
    }
    return obj
}