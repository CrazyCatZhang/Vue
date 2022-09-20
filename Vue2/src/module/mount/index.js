import {createElementVNode, createTextVNode} from "../vdom";
import Watcher from "../observe/Watcher";
import patch from "../vdom/patch";

export function lifecycle(Vue) {
    Vue.prototype._render = function () {
        return this.$options.render.call(this)
    }

    Vue.prototype._update = function (vnode) {
        const vm = this
        const el = vm.$el

        vm.$el = patch(el, vnode)
    }

    Vue.prototype._c = function () {
        return createElementVNode(this, ...arguments)
    }

    Vue.prototype._v = function () {
        return createTextVNode(this, ...arguments)
    }

    Vue.prototype._s = function (value) {
        if (typeof value !== 'object') return value
        return JSON.stringify(value)
    }
}

export default function mountComponent(vm, el) {
    vm.$el = el
    const updateComponent = () => {
        vm._update(vm._render())
    }
    const watcher = new Watcher(vm, updateComponent, true);
}

export function callHook(vm, hook) {
    const handlers = vm.$options[hook]
    if (handlers) {
        handlers.forEach(handler => handler.call(vm))
    }
}
