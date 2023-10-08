import { http } from "../../http/axios";
import { IProject } from "../../models/IProject";
import { projectSlice } from "../reducers/ProjectReducer";
import { Dispatch } from "../store";

export async function loadProjects(dispatch: Dispatch){
 try{
    dispatch(projectSlice.actions.updateProjects())
    const projects: IProject[] = (await http.get<IProject[]>('/projects')).data;
    dispatch(projectSlice.actions.updateProjectsSuccess(projects))
 }
 catch(err){
    dispatch(projectSlice.actions.updateProjectsError(err))
 }
}