import Vue from './module/Vue'

Vue.mixin({
    created() {
        console.log('mixin created')
    }
})

const vm = new Vue({
    data() {
        return {
            firstName: 'Cat',
            lastName: 'Zhang'
        }
    },
    el: '#app',
    created() {
        console.log('created')
    },
    computed: {
        fullName() {
            console.log('run')
            return this.firstName + this.lastName
        }
    }
})

setTimeout(() => {
    vm.firstName = 'Peach'
},1000)