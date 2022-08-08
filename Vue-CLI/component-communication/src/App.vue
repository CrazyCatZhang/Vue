<template>
		<div id="app">
				<img alt="Vue logo" src="./assets/logo.png">
				<Student :getStudentName="getStudentName" @demo="getStudentName2" ref="student"/>
				<hr>
				<School/>
		</div>
</template>

<script>
import Student from "@/components/Student";
import School from "@/components/School";

export default {
		name: 'App',
		components: {
				Student,
				School
		},
		methods: {
				getStudentName(val) {
						console.log('学生姓名为：', val)
				},
				getStudentName2(val) {
						console.log('学生姓名为：', val)
				}
		},
		mounted() {
				this.$refs.student.$on('test', (val) => {
						console.log('学生姓名为：', val)
				})
		}
}
</script>

<style>
#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
}
</style>
