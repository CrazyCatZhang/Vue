import {popTarget, pushTarget} from "./Dep";
import {queueWatchers} from "./asynchronous";

let id = 0

export default class Watcher {
    constructor(vm, callback, options) {
        this.id = id++
        this.callback = callback
        this.renderWatch = options
        this.deps = []
        this.depsId = new Set()
        this.get()
    }

    get() {
        pushTarget(this)
        this.callback()
        popTarget()
    }

    update() {
        queueWatchers(this)
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