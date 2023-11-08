import { createSlice } from "@reduxjs/toolkit";
import { IList, IProject, TodayProject } from "../../models/IProject";

interface ProjectState{
    projects: IProject[],
    tasksLists: IList[],
    isLoading: boolean,
    error: string,
    activeProjectId: number,
    activeSectionId: number | null,
}

const initialState: ProjectState = {
    projects: [],
    tasksLists: [],
    isLoading: false,
    error: '',
    activeProjectId: TodayProject.id,
    activeSectionId: null
}

export const projectSlice = createSlice({
    name: 'projectSlice',
    initialState,
    reducers: {
        updateProjects(state){
            state.isLoading = true;
        },
        updateProjectsSuccess(state, action){
            state.projects = action.payload.projects;
            state.tasksLists = action.payload.lists;
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
        addNewList(state, action){         
            state.tasksLists.push(action.payload)
        },
        changeActiveSection(state, action){
            state.activeSectionId = action.payload
        }
    }
});

export default projectSlice.reducer;