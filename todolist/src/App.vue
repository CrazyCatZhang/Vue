<template>
    <div id="root">
        <div class="todo-container">
            <div class="todo-wrap">
                <MyHeader/>
                <MyList :todos="todos"/>
                <MyFooter :todos="todos"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, provide, reactive, toRefs, watch} from 'vue';
import {Todo} from "@/interface";
import MyHeader from "@/components/MyHeader.vue";
import MyList from "@/components/MyList.vue";
import MyFooter from "@/components/MyFooter.vue";
import {readData, saveData} from "@/utils/localStorageUtils";

export default defineComponent({
    name: 'App',
    components: {
        MyHeader,
        MyList,
        MyFooter
    },
    setup() {
        const state = reactive<{ todos: Todo[] }>({
            todos: []
        })

        function changeCompleted(index: number, value: boolean): void {
            state.todos[index].isCompleted = value
        }

        function deleteTodo(index: number): void {
            state.todos.splice(index, 1)
        }

        function addTodo(todo: Todo): void {
            state.todos.unshift(todo)
        }

        function changeAllTodo(value: boolean): void {
            state.todos.map(item => item.isCompleted = value)
        }

        function clearAllCheckedTodo(): void {
            state.todos = state.todos.filter(item => item.isCompleted === false)
        }

        provide('changeCompleted', changeCompleted)
        provide('deleteTodo', deleteTodo)
        provide('addTodo', addTodo)
        provide('changeAllTodo', changeAllTodo)
        provide('clearAllCheckedTodo', clearAllCheckedTodo)

        watch(() => state.todos, saveData, {deep: true})

        onMounted(() => {
            state.todos = readData()
        })

        return {
            ...toRefs(state)
        }
    }
})
</script>

<style>
body {
    background: #fff;
}

.btn {
    display: inline-block;
    padding: 4px 12px;
    margin-bottom: 0;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
    border-radius: 4px;
}

.btn-danger {
    color: #fff;
    background-color: #da4f49;
    border: 1px solid #bd362f;
}

.btn-danger:hover {
    color: #fff;
    background-color: #bd362f;
}

.btn:focus {
    outline: none;
}

.todo-container {
    width: 600px;
    margin: 0 auto;
}

.todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
}
</style>
