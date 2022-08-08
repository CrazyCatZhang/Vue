<template>
		<div>
				<h2>学校名称：{{ name }}</h2>
				<h2>学校地址：{{ address }}</h2>
		</div>
</template>

<script>
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
		},
		beforeDestroy() {
				this.$bus.off('hello')
		}
}
</script>

<style scoped>

</style>