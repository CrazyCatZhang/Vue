<template>
		<div>
				<h1>{{ msg }}</h1>
				<h2>学生姓名：{{ name }}</h2>
				<h2>学生性别：{{ sex }}</h2>
				<h2>学生年龄：{{ myAge }}</h2>
				<button @click="showName">点我显示名字</button>
				<button @click="test">点我展示Hello</button>
		</div>
</template>

<script>
import mixin from "@/mixin";

export default {
		data() {
				return {
						msg: '我是一个USETC的学生',
						myAge: this.age
				}
		},
		props: ['name', 'sex', 'age'],
		mixins: [mixin],
		methods: {
				test() {
						this.hello()
				}
		},
}
</script>

<style scoped>

</style>