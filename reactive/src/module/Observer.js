import defineReactive from "./defineReactive";
import {def} from "./utils";
import observe from "./observe";
import proxyPrototype from "./array";
import Dep from "./Dep";

export default class Observer {
    constructor(value) {
        this.dep = new Dep()
        def(value, '__ob__', this)
        this.value = value
        if (Array.isArray(this.value)) {
            Object.setPrototypeOf(this.value, proxyPrototype)
            this.observeArray()
        } else {
            this.walk()
        }
    }

    walk() {
        Object.keys(this.value).forEach(key => defineReactive(this.value, key))
    }

    observeArray() {
        this.value.forEach(key => observe(key))
    }
}