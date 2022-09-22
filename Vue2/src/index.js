import Vue from './module/Vue'

Vue.component('my-button', { // Vue.options.components = {}
    template: '<button>全局button</button>'
})

let Sub = Vue.extend({
    template: '<div>子组件  <my-button></my-button></div>',
    components: {
        'my-button': {
            template: '<button>子组件自己的button</button>'
        }
    }
})

new Sub().$mount('#root')