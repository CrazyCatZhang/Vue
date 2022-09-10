export default function createElement(vnode) {
    const {sel, children, text} = vnode
    const realNode = document.createElement(sel)

    if (text && (children === undefined || children.length === 0)) {
        realNode.innerHTML = text
    } else if (Array.isArray(children) && children.length) {
        for (let i = 0; i < children.length; i++) {
            let chDOM = createElement(children[i])
            realNode.appendChild(chDOM)
        }
    }
    vnode.elm = realNode
    return vnode.elm
}