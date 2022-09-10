import vnode from "./vnode";
import createElement from "./createElement";
import patchVNode from "./patchVNode";

export default function (oldNode, newNode) {
    if (!oldNode.sel) {
        oldNode = vnode(oldNode.tagName.toLowerCase(), {}, [], undefined, oldNode);
    }
    if (oldNode.sel === newNode.sel && oldNode.key === newNode.key) {
        patchVNode(oldNode, newNode)
    } else {
        let realNode = createElement(newNode)
        if (realNode && oldNode.elm.parentNode) {
            oldNode.elm.parentNode.insertBefore(realNode, oldNode.elm)
        }
        oldNode.elm.remove()
    }
}