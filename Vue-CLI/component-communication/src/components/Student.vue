<template>
		<div>
				<h2>{{ name }}</h2>
				<h2>{{ age }}</h2>
				<button @click="sendStudentName">点我传递姓名</button>
				<button @click="sendStudentName2">点我传递姓名2</button>
				<button @click="sendStudentName3">点我传递姓名3</button>
				<button @click="sendStudentName4">点我传递姓名4</button>
		</div>
</template>

<script>
export default {
		data() {
				return {
						name: 'CatZhang',
						age: 18
				}
		},
		methods: {
				sendStudentName() {
						this.getStudentName(this.name)
				},
				sendStudentName2() {
						this.$emit('demo', this.name)
				},
				sendStudentName3() {
						this.$emit('test', this.name)
				},
				sendStudentName4() {
						this.$bus.$emit('hello', this.name)
				}
		},
		props: ['getStudentName']
}
</script>

<style scoped>

</style>