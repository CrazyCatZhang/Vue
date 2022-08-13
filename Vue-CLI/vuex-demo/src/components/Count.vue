<template>
    <div>
        <h1>当前求和为：{{ sum }}</h1>
        <h1>当前求和为的10倍为：{{ bigSum }}</h1>
        <select v-model.number="n">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>
        <button @click="INCREMENT(n)">+</button>
        <button @click="DECREMENT(n)">-</button>
        <button @click="incrementOdd(n)">当前求和为奇数再加</button>
        <button @click="incrementWait(n)">等一等再加</button>
    </div>
</template>

<script>
import {mapState, mapGetters, mapActions, mapMutations} from "vuex";

export default {
    name: 'Count',
    data() {
        return {
            n: 1, //用户选择的数字
        }
    },
    computed: {
        ...mapState(['sum']),
        ...mapGetters(['bigSum'])
    },
    methods: {
        ...mapActions({incrementOdd: 'incrementOdd', incrementWait: 'incrementWait'}),
        ...mapMutations({INCREMENT: 'INCREMENT', DECREMENT: 'DECREMENT'})
    }
}
</script>

<style lang="css">button {
    margin-left: 5px;
}</style>
