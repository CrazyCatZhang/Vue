let id = 0

export default class Dep {
    constructor() {
        this.id = id++
        this.subs = []
    }

    depend() {
        Dep.target.addDep(this)
    }

    addSub(watcher) {
        this.subs.push(watcher)
    }

    notify() {
        this.subs.forEach(watcher => watcher.update())
    }
}

Dep.target = null
const targetStack = []

export function pushTarget(target) {
    targetStack.push(Dep.target)
    Dep.target = target
}

export function popTarget() {
    Dep.target = targetStack.pop()
}