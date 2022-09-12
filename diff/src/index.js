import h from "./module/h";
import patch from "./module/patch";

const vNode = h('ul', {}, [
    h('li', {key: 'A'}, 'A'),
    h('li', {key: 'B'}, 'B'),
    h('li', {key: 'C'}, 'C'),
    h('li', {key: 'D'}, 'D'),
    h('li', {key: 'E'}, 'E')
])

const container = document.getElementById('container')
patch(container, vNode)


const vNode2 = h('ul', {}, [
    h('li', {key: 'E'}, 'E'),
    h('li', {key: 'D'}, 'D'),
    h('li', {key: 'C'}, 'C'),
    h('li', {key: 'B'}, 'B'),
    h('li', {key: 'A'}, 'A')
])

const btn = document.getElementById('btn')
btn.onclick = function () {
    patch(vNode, vNode2)
}
