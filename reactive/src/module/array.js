import {def} from "./utils";

const arrayPrototype = Array.prototype

const reactiveMethods = [
    'push',
    'pop',
    'unshift',
    'shift',
    'splice',
    'reverse',
    'sort'
]

const proxyPrototype = Object.create(arrayPrototype)

reactiveMethods.forEach(method => {
    const originalMethod = arrayPrototype[method]
    def(proxyPrototype, method, function (...args) {
        const result = originalMethod.apply(this, args)
        const ob = this.__ob__
        let inserted = null
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args
                break
            case 'splice':
                inserted = args.slice(2)
        }
        if (inserted) ob.observeArray(inserted)
        ob.dep.notify()
        return result
    })
})

export default proxyPrototype