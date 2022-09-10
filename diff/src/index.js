import h from "./module/h";
import patch from "./module/patch";

const vNode = h('ul', {}, [
    h('li', {}, '哈哈'),
    h('li', {}, '嘻嘻'),
    h('li', {}, '呵呵'),
    h('li', {}, '嘿嘿'),
    h('li', {}, h('span', {}, 'text'))
])

const container = document.getElementById('container')
patch(container, vNode)
