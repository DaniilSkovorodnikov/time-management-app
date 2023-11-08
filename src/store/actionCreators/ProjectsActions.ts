import { http } from "../../http/axios";
import { IList, IProject } from "../../models/IProject";
import { projectSlice } from "../reducers/ProjectReducer";
import { Dispatch } from "../store";
import { layoutSlice } from "../reducers/LayoutReducer";

export async function loadProjects(dispatch: Dispatch){
 try{
    dispatch(projectSlice.actions.updateProjects())
    const projects: IProject[] = (await http.get<IProject[]>('/projects')).data;
    const lists: IList[] = (await http.get<IList[]>('/lists')).data
    dispatch(projectSlice.actions.updateProjectsSuccess({projects, lists}))
 }
 catch(err){
    dispatch(projectSlice.actions.updateProjectsError(err))
 }
}

export async function saveProjects(dispatch: Dispatch, project: IProject) {
   try{
      dispatch(projectSlice.actions.updateProjects())
      await http.post<IProject>('/projects', project);
      dispatch(projectSlice.actions.addProject(project))
      dispatch(layoutSlice.actions.changeModalVisibility())
   }
   catch(err){
      dispatch(projectSlice.actions.updateProjectsError(err))
   }
}

export async function addNewList(dispatch: Dispatch, newList: IList) {
   dispatch(projectSlice.actions.addNewList(newList))
   await http.post<IList>(`/lists`, newList)
}