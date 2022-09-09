import h from "./module/h";

const vNode = h('div', {}, [
    h('p', {}, '哈哈'),
    h('p', {}, '嘻嘻'),
    h('p', {}, '呵呵'),
    h('p', {}, '嘿嘿'),
    h('p', {}, h('span', {}, 'text'))
])

console.log(vNode)