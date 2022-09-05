<template>
    <div class="todo-footer">
        <label>
            <input type="checkbox" v-model="isAllChecked"/>
        </label>
        <span>
			<span>已完成 {{ completed }}</span> / 全部 {{ total }}
		</span>
        <button class="btn btn-danger" @click="clearAllCheckedTodo">清除已完成任务</button>
    </div>
</template>

<script lang="ts">
import {computed, defineComponent, inject, PropType} from "vue";
import {Todo} from '@/interface'

export default defineComponent({
    name: 'MyFooter',
    props: {
        todos: {
            type: Array as PropType<Todo[]>,
            required: true
        }
    },
    setup(props) {
        let completed = computed(() => {
            return props.todos.filter(item => item.isCompleted).length
        })

        let total = computed(() => {
            return props.todos.length
        })

        const changeAllTodo = inject('changeAllTodo', Function, true)
        const clearAllCheckedTodo = inject('clearAllCheckedTodo', Function, true)

        let isAllChecked = computed({
            get() {
                return completed.value === total.value && total.value !== 0
            },
            set(val) {
                changeAllTodo(val)
            }
        })

        return {
            completed,
            total,
            isAllChecked,
            clearAllCheckedTodo
        }
    }
})
</script>

<style scoped>
/*footer*/
.todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 5px;
}

.todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
}

.todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
}

.todo-footer button {
    float: right;
    margin-top: 5px;
}
</style>