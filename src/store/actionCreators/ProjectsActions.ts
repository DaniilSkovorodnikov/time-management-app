import { IList, IProject } from "../../models/IProject";
import { projectSlice } from "../reducers/ProjectReducer";
import { Dispatch } from "../store";
import { tasksSlice } from "../reducers/TaskReducer";
import { addToFirestoreDocument, db, deleteFromFirestoreDocument, getFirestoreDocument, updateFirestoreDocument } from "../../firebase";

export async function loadProjects(dispatch: Dispatch){
 try{
    dispatch(projectSlice.actions.updateProjects())
    const projects = await getFirestoreDocument<IProject>('projects')
    const lists = await getFirestoreDocument<IList>('lists')
    dispatch(projectSlice.actions.updateProjectsSuccess({projects, lists}))
 }
 catch(err){
    dispatch(projectSlice.actions.updateProjectsError(err))
 }
}

export async function saveProjects(dispatch: Dispatch, project: Omit<IProject, 'id'>) {
   try{
      dispatch(projectSlice.actions.updateProjects())
      const projectId = await addToFirestoreDocument<IProject>('projects', project)
      dispatch(projectSlice.actions.addProject({...project, id: projectId}))
   }
   catch(err){
      dispatch(projectSlice.actions.updateProjectsError(err))
   }
}

export async function addNewList(dispatch: Dispatch, newList: Omit<IList, 'id'>) {
   const listId = await addToFirestoreDocument<IList>('lists', newList)
   dispatch(projectSlice.actions.addNewList(({...newList, id: listId})))
}

export async function editProject(dispatch: Dispatch, updatedProject: IProject) {
   updateFirestoreDocument<IProject>('projects', updatedProject.id, updatedProject)
   dispatch(projectSlice.actions.editProject(updatedProject))
}

export async function deleteProject(dispatch: Dispatch, projectId: string) {
   await deleteFromFirestoreDocument('projects', projectId);
   ['lists', 'tasks'].forEach(async(docName) => {
      const entityToDelete = await db.collection(docName).where('projectId', '==', projectId).get().then(snapshot => snapshot.docs);
      await Promise.all(entityToDelete.map(doc => deleteFromFirestoreDocument(docName, doc.id)))
   })
   dispatch(projectSlice.actions.deleteProject(projectId))
   dispatch(tasksSlice.actions.deleteTasksByProjectId(projectId))
}

export async function editList(dispatch: Dispatch, updatedList: IList) {
   updateFirestoreDocument<IList>('lists', updatedList.id, updatedList)
   dispatch(projectSlice.actions.editList(updatedList))
}

export async function deleteList(dispatch: Dispatch, listId: string) {
   deleteFromFirestoreDocument('lists', listId)
   const tasksToDelete = await db.collection('tasks').where('sectionId', '==', listId).get().then(snapshot => snapshot.docs)
   await Promise.all(tasksToDelete.map(task => deleteFromFirestoreDocument('tasks', task.id)))
   dispatch(projectSlice.actions.deleteList(listId))
   dispatch(tasksSlice.actions.deleteTasksByListId(listId))
}