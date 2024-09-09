import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";

const initialState = {
    todo: { id: v4(), data: "", isFinished: false },
    todos: [],
    isUpdating: false,
    showFinished: true,
    darkmode :true
}


const todoSlice = createSlice({
    name: 'todos',
    initialState,

    reducers: {
        addTodo: (state) => {

            if (!state.isUpdating) {
                state.todos.push(state.todo)
                state.todo = {
                    id: v4(), data: "", isFinished: false
                }
            } else {
                return state;
            }
        },

        setTodoById: (state, action) => {
            const todoId = action.payload
            state.isUpdating = true;

            const currTodo = state.todos.filter((todo) => todo.id == todoId)
            state.todo = currTodo[0]
        },

        setTodo: (state, action) => {
            const { data } = action.payload
            state.todo = { ...state.todo, data: data }
        },

        deleteTodo: (state, action) => {
            const todoId = action.payload
            state.todos = state.todos.filter((todo) => todo.id != todoId)
        },

        updateTodo: (state, action) => {
            const { todoId } = action.payload

            if (state.isUpdating) {
                state.todos = state.todos.map(todo => (todo.id == todoId) ? { ...state.todo, data: state.todo.data } : todo)
                state.isUpdating = false

                state.todo = { id: v4(), data: "", isFinished: false }
            } else {
                return state;
            }
        },

        setTodos: (state, action) => {
            state.todos = action.payload
        },

        toggleShowFinished: (state) => {
            state.showFinished = !state.showFinished
        },

        toggleIsFinished: (state, action) => {
            const todoId = action.payload

            state.todos = state.todos.map((todo) => (todo.id === todoId) ? { ...todo, isFinished: !todo.isFinished } : todo)
        },

        changeIsUpdating: (state, action) => {
            const value = action.payload
            state.isUpdating = value
        },

        toggleDarkMode : (state)=>{
            state.darkmode = !state.darkmode
        }
    }
})

export const { addTodo, deleteTodo, updateTodo, setTodo, toggleShowFinished, toggleIsFinished, changeIsUpdating, setTodos, setTodoById,toggleDarkMode } = todoSlice.actions
export default todoSlice.reducer