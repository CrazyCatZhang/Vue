export default {
    install(Vue) {
        Vue.filter('mySlice', function (val) {
            return val.slice(0, 4)
        })
        Vue.directive('fbind', {
            bind(element, binding) {
                element.value = binding.value
            },
            inserted(element) {
                element.focus()
            },
            update(element, binding) {
                element.value = binding.value
            }
        })
        Vue.mixin({
            data() {
                return {
                    item: 'AAAAAAAA'
                }
            }
        })
        Vue.prototype.hello = function () {
            alert('Hello')
        }
    }
}