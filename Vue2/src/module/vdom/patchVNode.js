import {isSameVNode} from "./index";

export function createElement(vnode) {
    const {tag, data, children, text} = vnode
    if (typeof tag === 'string') {
        vnode.el = document.createElement(tag)
        patchProps(vnode.el, {}, data)
        children && children.forEach(child => {
            vnode.el.appendChild(createElement(child))
        })
    } else {
        vnode.el = document.createTextNode(text)
    }

    return vnode.el
}

function patchProps(el, oldProps = {}, newProps = {}) {
    const oldStyles = oldProps.style || {}
    const newStyles = newProps.style || {}
    for (const oldStylesKey in oldStyles) {
        if (!newStyles[oldStylesKey]) {
            el.style[oldStylesKey] = ''
        }
    }
    for (const oldPropsKey in oldProps) {
        if (!newProps[oldPropsKey]) {
            el.removeAttribute(oldPropsKey)
        }
    }
    for (const newPropsKey in newProps) {
        if (newPropsKey === 'style') {
            for (const newStylesKey in newStyles) {
                el.style[newStylesKey] = newStyles[newStylesKey]
            }
        } else {
            el.setAttribute(newPropsKey, newProps[newPropsKey])
        }
    }
}

export default function patchVNode(oldVNode, newVNode) {
    if (!isSameVNode(oldVNode, newVNode)) {
        const newElement = createElement(newVNode)
        oldVNode.el.parentNode.replaceChild(newElement, oldVNode.el)
        return newElement
    }
    const el = newVNode.el = oldVNode.el
    if (!newVNode.tag) {
        if (oldVNode.text !== newVNode.text) {
            el.textContent = newVNode.text
        }
    }

    patchProps(el, oldVNode.data, newVNode.data)

    const oldChildren = oldVNode.children || []
    const newChildren = newVNode.children || []

    if (oldChildren.length > 0 && newChildren.length > 0) {
        updateChildren(el, oldChildren, newChildren)
    } else if (newChildren > 0) {
        mountChildren(el, newChildren)
    } else if (oldChildren.length > 0) {
        el.innerHTML = ''
    }

    return el
}

function mountChildren(el, newChildren) {
    for (let i = 0; i < newChildren.length; i++) {
        el.appendChild(createElement(newChildren[i]))
    }
}

function updateChildren(parentElement, oldChildren, newChildren) {
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
        } else if (isSameVNode(oldStartVNode, newStartVNode)) {
            patchVNode(oldStartVNode, newStartVNode)
            oldStartVNode = oldChildren[++oldStartIndex]
            newStartVNode = newChildren[++newStartIndex]
        } else if (isSameVNode(oldEndVNode, newEndVNode)) {
            patchVNode(oldEndVNode, newEndVNode)
            oldEndVNode = oldChildren[--oldEndIndex]
            newEndVNode = newChildren[--newEndIndex]
        } else if (isSameVNode(oldStartVNode, newEndVNode)) {
            patchVNode(oldStartVNode, newEndVNode)
            parentElement.insertBefore(oldStartVNode.elm, oldEndVNode.elm.nextSibling)
            oldStartVNode = oldChildren[++oldStartIndex]
            newEndVNode = newChildren[--newEndIndex]
        } else if (isSameVNode(oldEndVNode, newStartVNode)) {
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
