import isSameVnode from "./isSameVnode";
import patchVNode from "./patchVNode";
import createElement from "./createElement";

export default function updateChildren(parentElement, oldChildren, newChildren) {

    let oldStartIndex = 0
    let newStartIndex = 0
    let oldEndIndex = oldChildren.length - 1
    let newEndIndex = newChildren.length - 1

    let oldStartVNode = oldChildren[0]
    let newStartVNode = newChildren[0]
    let oldEndVNode = oldChildren[oldEndIndex]
    let newEndVNode = newChildren[newEndIndex]

    let keyMap = null

    while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
        // 首先跳过null和undefined的节点
        if (oldStartVNode === null || oldStartVNode === undefined) {
            oldStartVNode = oldChildren[++oldStartIndex]
        } else if (oldEndVNode === null || oldEndVNode === undefined) {
            oldEndVNode = oldChildren[--oldEndIndex]
        } else if (newStartVNode === null || newStartVNode === undefined) {
            newStartVNode = newChildren[++newStartIndex]
        } else if (newEndVNode === null || newEndVNode === undefined) {
            newEndVNode = newChildren[--newEndIndex]
        } else if (isSameVnode(oldStartVNode, newStartVNode)) {
            patchVNode(oldStartVNode, newStartVNode)
            oldStartVNode = oldChildren[++oldStartIndex]
            newStartVNode = newChildren[++newStartIndex]
        } else if (isSameVnode(oldEndVNode, newEndVNode)) {
            patchVNode(oldEndVNode, newEndVNode)
            oldEndVNode = oldChildren[--oldEndIndex]
            newEndVNode = newChildren[--newEndIndex]
        } else if (isSameVnode(oldStartVNode, newEndVNode)) {
            patchVNode(oldStartVNode, newEndVNode)
            parentElement.insertBefore(oldStartVNode.elm, oldEndVNode.elm.nextSibling)
            oldStartVNode = oldChildren[++oldStartIndex]
            newEndVNode = newChildren[--newEndIndex]
        } else if (isSameVnode(oldEndVNode, newStartVNode)) {
            patchVNode(oldEndVNode, newStartVNode)
            parentElement.insertBefore(oldEndVNode.elm, oldStartVNode.elm)
            oldEndVNode = oldChildren[--oldEndIndex]
            newStartVNode = newChildren[++newStartIndex]
        } else {
            if (!keyMap) {
                keyMap = {}
                for (let i = oldStartIndex; i <= oldEndIndex; i++) {
                    const key = oldChildren[i].key
                    if (key !== undefined) {
                        keyMap[key] = i
                    }
                }
            }
            const indexInOld = keyMap[newStartVNode.key]
            if (indexInOld === undefined) {
                parentElement.insertBefore(createElement(newStartVNode), oldStartVNode.elm)
            } else {
                const element = oldChildren[indexInOld]
                patchVNode(element, newStartVNode)
                oldChildren[indexInOld] = undefined
                parentElement.insertBefore(element.elm, oldStartVNode.elm)
            }
            newStartVNode = newChildren[++newStartIndex]
        }
    }

    if (newStartIndex <= newEndIndex) {
        for (let i = newStartIndex; i <= newEndIndex; i++) {
            parentElement.insertBefore(createElement(newChildren[i], oldChildren[oldStartIndex].elm))
        }
    } else {
        for (let i = oldStartIndex; i <= oldEndIndex; i++) {
            if (oldChildren[i]) {
                parentElement.removeChild(oldChildren[i].elm)
            }
        }
    }
}