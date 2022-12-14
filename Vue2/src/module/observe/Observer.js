import defineReactive from "./defineReactive";
import observe from "./index";
import proxyPrototype from "./array";
import {def} from "../utils";
import Dep from "./Dep";

export default class Observer {
    constructor(data) {
        this.dep = new Dep()
        def(data, '__ob__', this)
        if (Array.isArray(data)) {
            Object.setPrototypeOf(data, proxyPrototype)
            this.observeArray(data)
        } else {
            this.walk(data)
        }
    }

    walk(data) {
        Object.keys(data).forEach(key => defineReactive(data, key))
    }

    observeArray(data) {
        data.forEach(item => observe(item))
    }
}