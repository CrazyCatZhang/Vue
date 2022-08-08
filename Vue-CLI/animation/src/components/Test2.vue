<template>
    <div>
        <button @click="isShow = !isShow">显示/隐藏</button>
        <transition name="hello" apper>
            <h1 v-show="isShow">Hello, world!</h1>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'Test2',
    data() {
        return {
            isShow: true
        }
    },
}
</script>

<style scoped>
h1 {
    background-color: #bfa
}

.hello-enter, .hello-leave-to {
    transform: translateX(-100%);
}

.hello-enter-active, .hello-leave-active {
    transition: 0.5s linear;
}

.hello-enter-to-active, .hello-leave {
    transform: translateX(0);
}
</style>