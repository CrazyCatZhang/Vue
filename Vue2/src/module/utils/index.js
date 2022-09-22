export function def(obj, key, value, enumerable = false) {
    Object.defineProperty(obj, key, {
        value,
        enumerable,
        writable: true,
        configurable: true
    })
}

const strats = {}
const LIFECYCLE = [
    'beforeCreate',
    'created'
]

LIFECYCLE.forEach(hook => {
    strats[hook] = function (parent, child) {
        if (child) {
            if (parent) {
                return parent.concat(child)
            } else {
                return [child]
            }
        } else {
            return parent
        }
    }
})

strats.components = function (parentVal, childVal) {
    const res = Object.create(parentVal)

    if (childVal) {
        for (let key in childVal) {
            res[key] = childVal[key]
        }
    }

    return res
}

export function mergeOptions(parent, child) {
    const options = {}
    for (let key in parent) {
        mergeField(key)
    }
    for (let key in child) {
        if (!parent.hasOwnProperty(key)) {
            mergeField(key)
        }
    }

    function mergeField(key) {
        if (strats[key]) {
            options[key] = strats[key](parent[key], child[key])
        } else {
            options[key] = child[key] || parent[key]
        }
    }

    return options
}