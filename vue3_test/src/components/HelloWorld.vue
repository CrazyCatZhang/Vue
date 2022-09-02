<template>
    <div>
        <button @click="test">测试</button>
    </div>
</template>

<script>
import usePoint from "@/hooks/usePoint";

export default {
    name: 'HelloWorld',
    setup() {
        const {point, test} = usePoint()
        return {point, test}
    }
}
</script>

<style scoped>

</style>