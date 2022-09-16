import Vue from './module/Vue'

const vm = new Vue({
    data() {
        return {
            name: 'Cat',
            age: 18,
            hobby: ['eat','code','play']
        }
    }
})

console.log(vm)

vm.hobby.push(1)
