import initState from "./state";
import compileToFunction from "../compiler";
import mountComponent from "../mount";

export default function initMixin(Vue) {
    Vue.prototype._init = function (options) {
        const vm = this
        vm.$options = options
        initState(vm)
    }

    Vue.prototype.$mount = function (el) {
        const vm = this
        el = document.querySelector(el)
        let opts = vm.$options
        if (!opts.render) {
            let template
            if (!opts.template && el) {
                template = el.outerHTML
            } else {
                if (el) {
                    template = opts.template
                }
            }
            if (template) {
                opts.render = compileToFunction(template)
            }
        }

        mountComponent(vm, el)
    }
}