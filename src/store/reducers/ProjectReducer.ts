import { createSlice } from "@reduxjs/toolkit";
import { IProject, TodayProject } from "../../models/IProject";

interface ProjectState{
    projects: IProject[],
    isLoading: boolean,
    error: string,
    activeProjectId: number 
}

const initialState: ProjectState = {
    projects: [],
    isLoading: false,
    error: '',
    activeProjectId: TodayProject.id
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
        },
        addProject(state, action){
            state.projects.push(action.payload);
            state.isLoading = false
        },
        changeActiveProject(state, action){
            state.activeProjectId = action.payload
        },
        addNewList(state, {payload}: {payload: AddListPayload}){
            const activeProject = state.projects.find(project => project.id === payload.activeProjectId)
            if(activeProject){
                activeProject.lists = activeProject.lists ? [...activeProject.lists, payload.listName] : [payload.listName]
            }
        }
    }
});

export default projectSlice.reducer;

interface AddListPayload{
    activeProjectId: number
    listName: string
}