import defineReactive from "./defineReactive";
import {def} from "./utils";

export default class Observer {
    constructor(value) {
        def(value, '__ob__', this)
        this.value = value
        this.walk()
    }

    walk() {
        Object.keys(this.value).forEach(key => defineReactive(this.value, key))
    }
}