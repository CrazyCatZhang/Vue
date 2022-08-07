export default {
    data() {
        return {
            x: 100,
            y: 200
        }
    },
    methods: {
        showName() {
            console.log(this.name)
        }
    },
    mounted() {
        console.log('Hello')
    }
}