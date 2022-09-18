import initMixin from "./initialize/init";
import {lifecycle} from "./mount";
import {nextTick} from "./observe/asynchronous";

export default class Vue {
    constructor(options) {
        this._init(options)
        this.$mount(options.el)
    }
}

Vue.prototype.$nextTick = nextTick

initMixin(Vue)
lifecycle(Vue)