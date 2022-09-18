import Vue from './module/Vue'

const vm = new Vue({
    data() {
        return {
            name: 'Cat',
            age: 18,
            hobby: ['eat', 'code', 'play']
        }
    },
    el: '#app'
})

setTimeout(() => {
    vm.age = 20
    vm.name = 'CatZhang'
}, 1000)
