import { TaskForm } from "../../components/TodoList/NewTaskForm";
import { addToFirestoreDocument, deleteFromFirestoreDocument, getFirestoreDocument, updateFirestoreDocument } from "../../firebase";
import { http } from "../../http/axios";
import { ITask } from "../../models/ITask";
import { tasksSlice } from "../reducers/TaskReducer";
import { Dispatch } from "../store";

export async function loadTasks(dispatch: Dispatch){
 try{
    dispatch(tasksSlice.actions.updateTasks())
    const tasks: ITask[] = await getFirestoreDocument<ITask>('tasks')
    dispatch(tasksSlice.actions.updateTasksSuccess(tasks))
 }
 catch(err){
    dispatch(tasksSlice.actions.updateTasksError(err))
 }
}

export async function addTask(dispatch: Dispatch, newTask: TaskForm) {
   try{
      dispatch(tasksSlice.actions.updateTasks())
      const task: ITask = {
         ...newTask,
         executionPeriod: newTask.executionPeriod.toDateString()
      }
      const taskId = await addToFirestoreDocument<ITask>('tasks', task)
      dispatch(tasksSlice.actions.addTask(({...task, id: taskId})))
   }
   catch(err){
      dispatch(tasksSlice.actions.updateTasksError(err))
   }
}

export async function removeTask(dispatch: Dispatch, id: string, timeout: number) {
   try{
      await deleteFromFirestoreDocument('tasks', id)
      setTimeout(() => {
         dispatch(tasksSlice.actions.deleteTask(id))
      }, timeout)
   }  
   catch(err){
      dispatch(tasksSlice.actions.updateTasksError(err))
   } 
}

export async function editTask(dispatch: Dispatch, task: TaskForm) {
   try{
      dispatch(tasksSlice.actions.updateTasks())
      const updatedTask: ITask = {
         ...task,
         executionPeriod: task.executionPeriod.toDateString()
      }
      await updateFirestoreDocument('tasks', task.id, updatedTask)
      dispatch(tasksSlice.actions.editTask(updatedTask))
   }  
   catch(err){
      dispatch(tasksSlice.actions.updateTasksError(err))
   }
}