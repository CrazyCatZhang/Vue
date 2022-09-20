import Vue from './module/Vue'

const vm = new Vue({
    data() {
        return {
            firstName: 'Cat',
            lastName: 'Zhang'
        }
    },
    el: '#app',
    watch: {
        firstName(newValue, oldValue) {
            console.log(newValue, oldValue)
        }
    },
    computed: {
        fullName() {
            return this.firstName + this.lastName
        }
    }
})

setTimeout(() => {
    vm.firstName = 'Peach'
}, 1000)