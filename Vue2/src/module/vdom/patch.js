import patchVNode, {createElement} from "./patchVNode";

export default function patch(oldVNode, newVNode) {
    const isRealElement = oldVNode.nodeType
    if (isRealElement) {
        const parent = oldVNode.parentNode
        const newElement = createElement(newVNode)
        parent.insertBefore(newElement, oldVNode)
        parent.removeChild(oldVNode)

        return newElement
    } else {
        return patchVNode(oldVNode, newVNode)
    }
}
