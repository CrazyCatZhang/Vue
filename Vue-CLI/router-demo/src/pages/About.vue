<template>
    <h2>我是About组件的内容</h2>
</template>

<script>
export default {
    name: 'About',
    beforeRouteEnter(to, from, next) {
        console.log('About--beforeRouteEnter', to, from)
        if (localStorage.getItem('name') === 'CatZhang') {
            next()
        } else {
            alert('无权限查看！')
        }
    },
    beforeRouteLeave(to, from, next) {
        console.log('About--beforeRouteLeave', to, from)
        next()
    }
}
</script>