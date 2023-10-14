import NewTaskForm from "./NewTaskForm";
import { useState } from 'react';

export default function Project({name}: ProjectProps){
    const [activeTaskForm, setActiveTaskForm] = useState<boolean>(false)
    
    return (<div className="tasks__list project">
    <div className="project__header">{name}</div>
        {activeTaskForm && <NewTaskForm onHide={() => setActiveTaskForm(false)}/>}
        {!activeTaskForm && <button className="project__addTask" onClick={() => setActiveTaskForm(true)}>Добавить задачу</button>}
    </div>)
}

interface ProjectProps{
    name: string
}