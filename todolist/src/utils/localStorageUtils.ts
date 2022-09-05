import {Todo} from "@/interface";

export function saveData(todos: Todo[]) {
    localStorage.setItem('todo_item', JSON.stringify(todos))
}

export function readData(): Todo[] {
    return JSON.parse(localStorage.getItem('todo_item') || '[]')
}