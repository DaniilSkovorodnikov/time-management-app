import { ITask } from "../../models/ITask"
import './Task.scss'
import deleteIcon from '../../assets/icons/delete-icon.svg'
import editIcon from '../../assets/icons/edit-icon.svg'
import { removeTask } from "../../store/actionCreators/TasksActions"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { useState, useEffect } from 'react';
import NewTaskForm from "./NewTaskForm"

export default function Task({task}: TaskProps) {
    const dispatch = useAppDispatch()
    const {activeProjectId} = useAppSelector(state => state.projectSlice)
    const [deleted, setDeleted] = useState<boolean>(false)
    const [hoverTask, setHoverTask] = useState<boolean>(false)
    const [editMode, setEditMode] = useState<boolean>(false)

    useEffect(() => {
        setEditMode(false);
        setHoverTask(false)
    }, [activeProjectId])

    if(editMode){
        return <NewTaskForm
            onHide={() => setEditMode(false)}
            defaultState={{
                ...task,
                executionPeriod: new Date(task.executionPeriod)
            }}
            isEditMode
         />
    }
    return (
        <div
         className="task"
         onMouseEnter={() => setHoverTask(true)}
         onMouseLeave={() => setHoverTask(false)}
        >
            <input type="checkbox" className="task__complete" onClick={() => {
                    removeTask(dispatch, task.id, 1500)
                    setDeleted(true)
                }} />
            <div className="task__info">
                <p className="task__name" style={{textDecoration: deleted ? 'line-through' : 'none'}}>
                    {task.name}
                </p>
                {task.description && <p className="task__description">{task.description}</p>}
            </div>
            {hoverTask && <div className="task__buttons">
                <button className="task__edit" onClick={() => setEditMode(true)}>
                    <img src={editIcon} className="task__icon"/>
                </button>
                <button className="task__delete" onClick={() => removeTask(dispatch, task.id, 0)}>
                    <img src={deleteIcon} className="task__icon"/>
                </button>
            </div>}
        </div>
    )
}

interface TaskProps{
    task: ITask
}