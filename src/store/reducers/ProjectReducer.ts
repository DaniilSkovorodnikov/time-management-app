import { createSlice } from "@reduxjs/toolkit";
import { IList, IProject, IncomingProject, TodayProject } from "../../models/IProject";

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
        },
        editProject(state, action){
            const projects = [...state.projects]
            const currentProject = projects.findIndex(project => project.id === action.payload.id)
            projects[currentProject] = action.payload
            state.projects = projects
        },
        deleteProject(state, action){
            state.projects = state.projects.filter(project => project.id !== action.payload)
            state.tasksLists = state.tasksLists.filter(list => list.projectId !== action.payload)
            state.activeProjectId = IncomingProject.id
        },
        editList(state, action){
            const lists = [...state.tasksLists]
            const currentList = lists.findIndex(list => list.id === action.payload.id)
            lists[currentList] = action.payload
            state.tasksLists = lists
        },
        deleteList(state, action){
            state.tasksLists = state.tasksLists.filter(list => list.id !== action.payload)
        },
    }
});

export default projectSlice.reducer;