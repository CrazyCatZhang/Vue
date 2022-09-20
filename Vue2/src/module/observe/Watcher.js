import {popTarget, pushTarget} from "./Dep";
import {queueWatchers} from "./asynchronous";

let id = 0

export default class Watcher {
    constructor(vm, callback, options) {
        this.vm = vm
        this.id = id++
        this.callback = callback
        this.renderWatch = options
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
        const value = this.callback.call(this.vm)
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
        this.get()
    }
}