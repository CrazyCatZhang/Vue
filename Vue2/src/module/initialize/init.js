import initState from "./state";
import compileToFunction from "../compiler";
import mountComponent, {callHook} from "../mount";
import {mergeOptions} from "../utils";

export default function initMixin(Vue) {
    Vue.prototype._init = function (options) {
        const vm = this
        vm.$options = mergeOptions(this.constructor.options, options)
        callHook(this, 'beforeCreate')
        initState(vm)
        callHook(this, 'created')

        if (options.el) {
            vm.$mount(options.el)
        }
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