import { createSlice } from "@reduxjs/toolkit";
import { IProject } from "../../models/IProject";

interface ProjectState{
    projects: IProject[],
    isLoading: boolean,
    error: string
}

const initialState: ProjectState = {
    projects: [],
    isLoading: false,
    error: ''
}

export const projectSlice = createSlice({
    name: 'projectSlice',
    initialState,
    reducers: {
        updateProjects(state){
            state.isLoading = true;
        },
        updateProjectsSuccess(state, action){
            state.projects = action.payload;
            state.isLoading = false
        },
        updateProjectsError(state, action){
            state.error = action.payload;
            state.isLoading = false
        }
    }
});

export default projectSlice.reducer;