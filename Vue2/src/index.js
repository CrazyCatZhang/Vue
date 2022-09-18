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

vm.name = 'CatZhang'
vm.$nextTick(() => {
    console.log(app.innerHTML)
})
