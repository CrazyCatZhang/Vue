<template>
		<div>
				<h1>{{ msg }}</h1>
				<h2>学生姓名：{{ name }}</h2>
				<h2>学生性别：{{ sex }}</h2>
				<h2>学生年龄：{{ myAge }}</h2>
		</div>
</template>

<script>
export default {
		data() {
				return {
						msg: '我是一个USETC的学生',
						myAge: this.age
				}
		},
		props: ['name', 'sex', 'age']
}
</script>

<style scoped>

</style>