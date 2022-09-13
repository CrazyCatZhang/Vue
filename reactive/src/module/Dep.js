export default class Dep {
    constructor() {
        this.subs = []
    }

    addSub(sub) {
        this.subs.push(sub)
    }

    depend() {
        if (Dep.target) this.addSub(Dep.target)
    }

    notify() {
        const subs = [...this.subs]
        subs.forEach(sub => sub.update())
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