<template>
    <div>
        <button @click="test">测试</button>
    </div>
</template>

<script>
import usePoint from "@/hooks/usePoint";
import useDemo from "@/hooks/useDemo";

export default {
    name: 'HelloWorld',
    setup() {
        useDemo()
        const {point, test} = usePoint()
        return {point, test}
    }
}
</script>

<style scoped>

</style>