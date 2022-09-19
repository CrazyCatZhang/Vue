import {def} from "../utils";

const originalPrototype = Array.prototype

const reactiveMethods = [
    'push',
    'pop',
    'shift',
    'unshift',
    'reverse',
    'sort',
    'splice'
]

const proxyPrototype = Object.create(originalPrototype)

reactiveMethods.forEach(method => {
    const originalMethod = originalPrototype[method]
    def(proxyPrototype, method, function (...args) {
        const result = originalMethod.apply(this, args)
        const ob = this.__ob__
        let inserted;
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args
                break
            case 'splice':
                inserted = args.slice(2)
        }

        if (inserted) {
            ob.observeArray(inserted)
        }
        ob.dep.notify()
        return result
    })
})

export default proxyPrototype