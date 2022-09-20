import {popTarget, pushTarget} from "./Dep";
import {queueWatchers} from "./asynchronous";

let id = 0

export default class Watcher {
    constructor(vm, expressionOrFn, options, callback) {
        this.vm = vm
        this.id = id++
        this.renderWatch = options

        if (typeof expressionOrFn === "string") {
            this.getter = function () {
                return vm[expressionOrFn]
            }
        } else {
            this.getter = expressionOrFn
        }
        this.callback = callback
        this.user = options.user

        this.deps = []
        this.depsId = new Set()

        this.lazy = options.lazy
        this.dirty = this.lazy

        this.value = this.lazy ? undefined : this.get()
    }

    evaluate() {
        this.value = this.get()
        this.dirty = false
    }

    depend() {
        for (let i = 0; i < this.deps.length; i++) {
            this.deps[i].depend()
        }
    }

    get() {
        pushTarget(this)
        const value = this.getter.call(this.vm)
        popTarget()
        return value
    }

    update() {
        if (this.lazy) {
            this.dirty = true
        } else {
            queueWatchers(this)
        }
    }

    addDep(dep) {
        let id = dep.id
        if (!this.depsId.has(id)) {
            this.deps.push(dep)
            this.depsId.add(id)
            dep.addSub(this)
        }
    }

    run() {
        const oldValue = this.value
        const newValue = this.get()
        if (this.user) {
            this.callback.call(this.vm, newValue, oldValue)
        }
    }
}