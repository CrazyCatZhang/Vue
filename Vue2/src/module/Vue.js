import initMixin from "./initialize/init";
import {lifecycle} from "./mount";
import initGlobalAPI from "./initialize/initGlobalAPI";
import {initStateMixin} from "./initialize/state";

export default class Vue {
    constructor(options) {
        this._init(options)
    }
}

initMixin(Vue)
lifecycle(Vue)
initGlobalAPI(Vue)
initStateMixin(Vue)
