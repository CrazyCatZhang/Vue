import Vue from './module/Vue'

Vue.mixin({
    created() {
        console.log('mixin created')
    }
})

const vm = new Vue({
    data() {
        return {
            name: 'Cat',
            age: 18,
            hobby: ['eat', 'code', 'play', ['1', '2']]
        }
    },
    el: '#app',
    created() {
        console.log('created')
    }
})

setTimeout(() => {
    vm.hobby[3].push('3')
}, 1000)