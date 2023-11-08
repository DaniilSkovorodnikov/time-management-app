import { createSlice } from "@reduxjs/toolkit";

export interface Task{
    name: string,
    description: string,
    projectId: number | null,
    sectionName: string | null,
    executionPeriod: Date
}

const initialState: Task = {
    name: '',
    description: '',
    projectId: null,
    sectionName: null,
    executionPeriod: new Date()
}

export const taskSlice = createSlice({
    name: 'taskSlice',
    initialState,
    reducers: {

    }
})