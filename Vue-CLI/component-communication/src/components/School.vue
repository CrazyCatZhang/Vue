<template>
		<div>
				<h2>学校名称：{{ name }}</h2>
				<h2>学校地址：{{ address }}</h2>
		</div>
</template>

<script>
import pubsub from 'pubsub-js'

export default {
		data() {
				return {
						name: 'USETC',
						address: '杭州'
				}
		},
		mounted() {
				this.$bus.$on('hello', (data) => {
						console.log('我是School组件，收到了数据：', data)
				})
				this.pid = pubsub.subscribe('pub', (msgName, data) => {
						console.log(msgName)
						console.log('我是School组件，收到了数据：', data)
				})
		},
		beforeDestroy() {
				this.$bus.off('hello')
				pubsub.unsubscribe(this.pid)
		}
}
</script>

<style scoped>

</style>