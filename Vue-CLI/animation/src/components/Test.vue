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
    name: 'Test',
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

.hello-enter-active {
    animation: anim 0.5s linear;
}

.hello-leave-active {
    animation: anim 0.5s linear reverse;
}

@keyframes anim {
    from {
        transform: translateX(-100%)
    }
    to {
        transform: translateX(0)
    }
}
</style>