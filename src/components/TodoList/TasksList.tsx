import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { IList } from "../../models/IProject";
import { ITask } from "../../models/ITask";
import { projectSlice } from "../../store/reducers/ProjectReducer";
import NewTaskForm from "./NewTaskForm";
import { useState } from 'react';
import Task from "./Task";

export default function TaskList({list, tasks}: TaskListProps){
    const {changeActiveSection} = projectSlice.actions
    const dispatch = useAppDispatch()

    const [activeTaskForm, setActiveTaskForm] = useState<boolean>(false)
    
    return (
    <div className="tasks__list">
        <div className="tasks__header">{list.name}</div>
        <ul>
            {tasks.map(task => <li key={task.id}>
                    <Task task={task}/>
                </li>)}
        </ul>
        {activeTaskForm && <NewTaskForm onHide={() => setActiveTaskForm(false)}/>}
        {!activeTaskForm && <button className="tasks__addTask" onClick={() => {
            dispatch(changeActiveSection(list.id))
            setActiveTaskForm(true)
            }}>Добавить задачу</button>}
    </div>
    )
}

interface TaskListProps{
    list: IList,
    tasks: ITask[]
}