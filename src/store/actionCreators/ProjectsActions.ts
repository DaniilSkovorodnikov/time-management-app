import { http } from "../../http/axios";
import { IProject } from "../../models/IProject";
import { projectSlice } from "../reducers/ProjectReducer";
import { Dispatch } from "../store";
import { layoutSlice } from "../reducers/LayoutReducer";

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

export async function saveProjects(dispatch: Dispatch, project: IProject) {
   try{
      dispatch(projectSlice.actions.updateProjects())
      await http.post<IProject[]>('/projects', project);
      dispatch(projectSlice.actions.addProject(project))
      dispatch(layoutSlice.actions.changeModalVisibility())
   }
   catch(err){
      dispatch(projectSlice.actions.updateProjectsError(err))
   }
}

export async function addNewList(dispatch: Dispatch, project: IProject, name: string) {
   dispatch(projectSlice.actions.addNewList({activeProjectId: project.id, listName: name}))
   const updatedLists = project.lists ? [...project.lists, name] : [name]
   await http.patch<string[]>(`/projects/${project.id}`, {lists: updatedLists})
}