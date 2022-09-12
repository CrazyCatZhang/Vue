import createElement from "./createElement";
import updateChildren from "./updateChildren";

export default function (oldNode, newNode) {
    if (oldNode === newNode) return

    if (newNode.text !== undefined && !(newNode.children && newNode.children.length)) {
        if (newNode.text !== oldNode.text) {
            oldNode.elm.innerText = newNode.text
        }
    } else {
        if (!(oldNode.children && oldNode.children.length)) {
            oldNode.elm.innerText = ''
            newNode.children.forEach(item => {
                const childElement = createElement(item)
                oldNode.elm.appendChild(childElement)
            })
        } else {
            updateChildren(oldNode.elm, oldNode.children, newNode.children)
        }
    }
}