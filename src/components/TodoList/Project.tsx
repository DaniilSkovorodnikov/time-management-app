import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { projectSlice } from "../../store/reducers/ProjectReducer";
import NewTaskForm from "./NewTaskForm";
import { useState, useEffect } from 'react';

export default function Project({name}: ProjectProps){
    const {changeActiveSection} = projectSlice.actions
    const dispatch = useAppDispatch()
    const {activeProjectId} = useAppSelector(state => state.projectSlice)
    const [activeTaskForm, setActiveTaskForm] = useState<boolean>(false)

    // useEffect(() => {
    //     setActiveTaskForm(false)
    // }, [activeProjectId])
    
    return (<div className="tasks__list project">
    <div className="project__header">{name}</div>
        {activeTaskForm && <NewTaskForm onHide={() => setActiveTaskForm(false)}/>}
        {!activeTaskForm && <button className="project__addTask" onClick={() => {
            dispatch(changeActiveSection(name))
            setActiveTaskForm(true)
            }}>Добавить задачу</button>}
    </div>)
}

interface ProjectProps{
    name: string
}