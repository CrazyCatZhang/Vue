import initMixin from "./initialize/init";

export default class Vue {
    constructor(options) {
        this._init(options)
    }
}

initMixin(Vue)