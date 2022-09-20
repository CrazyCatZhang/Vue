import Vue from './module/Vue'
import compileToFunction from "./module/compiler";
import {createElement} from "./module/vdom/patchVNode";
import patch from "./module/vdom/patch";


let render1 = compileToFunction(`<div>{{name}}</div>`)
let vm1 = new Vue({data: {name: 'CatZhang'}})
let prevVNode = render1.call(vm1)

let el = createElement(prevVNode);
document.getElementById('app').appendChild(el)


let render2 = compileToFunction(`<div>{{name}}</div>`);
let vm2 = new Vue({data: {name: 'PeachZhang'}})
let nextVNode = render2.call(vm2);

setTimeout(() => {
    patch(prevVNode, nextVNode)
}, 1000)