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
            hobby: ['eat', 'code', 'play']
        }
    },
    el: '#app',
    created() {
        console.log('created')
    }
})