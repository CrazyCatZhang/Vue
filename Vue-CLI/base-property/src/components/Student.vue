<template>
		<div>
				<h1>{{ msg }}</h1>
				<h2>学生姓名：{{ name }}</h2>
				<h2>学生性别：{{ sex }}</h2>
				<h2>学生年龄：{{ myAge }}</h2>
				<button @click="showName">点我显示名字</button>
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
		mixins: [mixin]
}
</script>

<style scoped>

</style>