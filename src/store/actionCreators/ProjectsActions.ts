import { http } from "../../http/axios";
import { IList, IProject } from "../../models/IProject";
import { projectSlice } from "../reducers/ProjectReducer";
import { Dispatch } from "../store";
import { tasksSlice } from "../reducers/TaskReducer";
import { ITask } from "../../models/ITask";

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
   }
   catch(err){
      dispatch(projectSlice.actions.updateProjectsError(err))
   }
}

export async function addNewList(dispatch: Dispatch, newList: IList) {
   dispatch(projectSlice.actions.addNewList(newList))
   await http.post<IList>(`/lists`, newList)
}

export async function editProject(dispatch: Dispatch, updatedProject: IProject) {
   await http.patch<IProject>(`/projects/${updatedProject.id}`, updatedProject)
   dispatch(projectSlice.actions.editProject(updatedProject))
}

export async function deleteProject(dispatch: Dispatch, projectId: number) {
   await http.delete<number>(`/projects/${projectId}`)
   dispatch(projectSlice.actions.deleteProject(projectId))
   dispatch(tasksSlice.actions.deleteTasksByProjectId(projectId))
}

export async function editList(dispatch: Dispatch, updatedList: IList) {
   await http.patch<IList>(`/lists/${updatedList.id}`, updatedList)
   dispatch(projectSlice.actions.editList(updatedList))
}

export async function deleteList(dispatch: Dispatch, listId: number, tasksToDelete: ITask[]) {
   await http.delete<number>(`/lists/${listId}`)
   await Promise.all(tasksToDelete.map(task => http.delete(`/tasks/${task.id}`)))
   dispatch(projectSlice.actions.deleteList(listId))
   dispatch(tasksSlice.actions.deleteTasksByListId(listId))
}