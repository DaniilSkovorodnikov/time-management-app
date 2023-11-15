import { createSlice } from "@reduxjs/toolkit";
import { ITask } from "../../models/ITask";
import { TaskForm } from "../../components/TodoList/NewTaskForm";

interface TasksState{
    tasks: ITask[],
    isLoading: boolean,
    error: string
}

const initialState: TasksState = {
    tasks: [],
    isLoading: false,
    error: ''
}

export const tasksSlice = createSlice({
    name: 'taskSlice',
    initialState,
    reducers: {
        updateTasks(state){
            state.isLoading = true;
        },
        updateTasksSuccess(state, action){
            state.tasks = action.payload
            state.isLoading = false
        },
        updateTasksError(state, action){
            state.error = action.payload;
            state.isLoading = false
        },
        addTask(state, action){
            state.tasks.push(action.payload)
        },
        deleteTask(state, action){
            state.tasks = state.tasks.filter(task => task.id !== action.payload)
        },
        editTask(state, {payload}: {payload: ITask}){
            const copyTasks = [...state.tasks]
            const taskIndex = copyTasks.findIndex(task => task.id === payload.id)
            copyTasks[taskIndex] = payload;
            state.tasks = copyTasks
        }
    }
})

export default tasksSlice.reducer