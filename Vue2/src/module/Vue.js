import initMixin from "./initialize/init";
import {lifecycle} from "./mount";
import {nextTick} from "./observe/asynchronous";
import initGlobalAPI from "./initialize/initGlobalAPI";
import Watcher from "./observe/Watcher";

export default class Vue {
    constructor(options) {
        this._init(options)
        this.$mount(options.el)
    }
}

Vue.prototype.$nextTick = nextTick

initMixin(Vue)
lifecycle(Vue)
initGlobalAPI(Vue)

Vue.prototype.$watch = function (expressionOrFn, callback) {
    new Watcher(this, expressionOrFn, {user: true}, callback)
}