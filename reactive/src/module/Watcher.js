import {popTarget, pushTarget} from "./Dep";
import {parseExpression} from "./utils";

export default class Watcher {
    constructor(data, expression, callback) {
        this.data = data
        this.expression = expression
        this.callback = callback
        this.value = this.get()
    }

    get() {
        pushTarget(this)
        const value = parseExpression(this.data, this.expression)
        popTarget()
        return value
    }

    update() {
        const oldValue = this.value
        this.value = parseExpression(this.data, this.expression)
        this.callback.call(this.data, this.value, oldValue)
    }
}