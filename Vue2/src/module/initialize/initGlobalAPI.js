import {mergeOptions} from "../utils";

export default function initGlobalAPI(Vue) {
    Vue.options = {}
    Vue.mixin = function (mixin) {
        this.options = mergeOptions(this.options, mixin)
        return this
    }
}