import { useEffect, useRef } from 'react'
import './NewTaskForm.scss'

export default function NewTaskForm({onHide} : NewTaskFormProps) {
    const titleInputRef = useRef<HTMLInputElement>(null)
    
    useEffect(() => {
        if(titleInputRef.current){
            titleInputRef.current.focus()
        }
    }, [titleInputRef.current])
    

    return(
        <form className="taskForm">
            <input className="taskForm__input" placeholder='Название задачи' ref={titleInputRef}/>
            <textarea className="taskForm__textArea" placeholder='Описание'/>
            <div className="taskForm__buttons">
                <button className="taskForm__cancel" onClick={onHide}>Отменить</button>
                <button className="taskForm__save" type='submit'>Добавить</button>
            </div>
        </form>
    )
}

interface NewTaskFormProps{
    onHide: () => void
}