import initMixin from "./initialize/init";
import {lifecycle} from "./mount";

export default class Vue {
    constructor(options) {
        this._init(options)
        this.$mount(options.el)
    }
}

initMixin(Vue)
lifecycle(Vue)