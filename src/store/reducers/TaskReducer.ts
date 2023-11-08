import { createSlice } from "@reduxjs/toolkit";
import { ITask } from "../../models/ITask";

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
        }
    }
})

export default tasksSlice.reducer