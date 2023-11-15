import { TaskForm } from "../../components/TodoList/NewTaskForm";
import { http } from "../../http/axios";
import { ITask } from "../../models/ITask";
import { tasksSlice } from "../reducers/TaskReducer";
import { Dispatch } from "../store";

export async function loadTasks(dispatch: Dispatch){
 try{
    dispatch(tasksSlice.actions.updateTasks())
    const tasks: ITask[] = (await http.get<ITask[]>('/tasks')).data;
    dispatch(tasksSlice.actions.updateTasksSuccess(tasks))
 }
 catch(err){
    dispatch(tasksSlice.actions.updateTasksError(err))
 }
}

export async function addTask(dispatch: Dispatch, newTask: TaskForm) {
   try{
      dispatch(tasksSlice.actions.updateTasks())
      await http.post<ITask>('/tasks', newTask);
      const task: ITask = {
         ...newTask,
         executionPeriod: newTask.executionPeriod.toISOString()
      }
      dispatch(tasksSlice.actions.addTask(task))
   }
   catch(err){
      dispatch(tasksSlice.actions.updateTasksError(err))
   }
}

export async function removeTask(dispatch: Dispatch, id: number, timeout: number) {
   try{
      await http.delete<ITask>(`/tasks/${id}`)
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
      await http.patch<ITask>(`/tasks/${task.id}`, task)
      dispatch(tasksSlice.actions.editTask({...task, executionPeriod: task.executionPeriod.toISOString()}))
   }  
   catch(err){
      dispatch(tasksSlice.actions.updateTasksError(err))
   }
}