import {createElementVNode, createTextVNode} from "../vdom";
import Watcher from "../observe/Watcher";

function createElement(vnode) {
    const {tag, data, children, text} = vnode
    if (typeof tag === 'string') {
        vnode.el = document.createElement(tag)
        patchProps(vnode.el, data)
        children && children.forEach(child => {
            vnode.el.appendChild(createElement(child))
        })
    } else {
        vnode.el = document.createTextNode(text)
    }

    return vnode.el
}

function patchProps(el, data) {
    for (let dataKey in data) {
        if (dataKey === 'style') {
            for (let styleName in data.style) {
                el.style[styleName] = data.style[styleName]
            }
        } else {
            el.setAttribute(dataKey, data[dataKey])
        }
    }
}

function patch(oldVNode, newVNode) {
    const isRealElement = oldVNode.nodeType
    if (isRealElement) {
        const parent = oldVNode.parentNode
        const newElement = createElement(newVNode)
        parent.insertBefore(newElement, oldVNode)
        parent.removeChild(oldVNode)

        return newElement
    } else {

    }
}

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
