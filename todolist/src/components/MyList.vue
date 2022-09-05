<template>
    <ul class="todo-main">
        <MyItem v-for="(todo,index) of todos" :key="todo.id" :todo="todo" :index="index"/>
    </ul>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import MyItem from './MyItem.vue'

export default defineComponent({
    name: 'MyList',
    components: {MyItem},
    props: ['todos']
})
</script>

<style scoped>
/*main*/
.todo-main {
    margin-left: 0px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding: 0px;
}

.todo-empty {
    height: 40px;
    line-height: 40px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding-left: 5px;
    margin-top: 10px;
}
</style>