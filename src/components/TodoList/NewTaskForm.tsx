import { useEffect, useRef } from 'react'
import DatePicker from 'react-datepicker'
import Select from 'react-select'
import './NewTaskForm.scss'
import datepickerIcon from '../../assets/icons/datepicker-icon.png'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { ITask } from '../../models/ITask'
import { addTask } from '../../store/actionCreators/TasksActions'

export type TaskForm = Omit<ITask, 'executionPeriod'> & {executionPeriod: Date}

export default function NewTaskForm({onHide} : NewTaskFormProps) {
    const titleInputRef = useRef<HTMLInputElement>(null)
    const {activeProjectId, activeSectionId} = useAppSelector(state => state.projectSlice)
    const {tasks} = useAppSelector(state => state.tasksSlice)
    const dispatch = useAppDispatch()
    
    const {control, register, handleSubmit, reset} = useForm<TaskForm>({
        mode: 'onBlur',
        defaultValues: {
            projectId: activeProjectId,
            sectionId: activeSectionId
        }
    });

    const onSubmit: SubmitHandler<TaskForm> = (data) => {
        const newTask: TaskForm = {
            ...data,
            id: tasks.length + 1
        }
        addTask(dispatch, newTask)
        onHide()
    }
    
    useEffect(() => {
        if(titleInputRef.current){
            titleInputRef.current.focus()
        }
    }, [titleInputRef.current])

    useEffect(() => {
        reset()
    }, [activeProjectId])
    

    return(
        <form className="taskForm" onSubmit={handleSubmit(onSubmit)}>
            <input className="taskForm__input"
                placeholder='Название задачи'
                ref={titleInputRef}
                {...register('name', {required: true})}
            />
            <textarea 
                className="taskForm__textArea" 
                placeholder='Описание'
                {...register('description')}
            />
            <div className='taskForm__meta'>
                <Controller
                    control={control}
                    name='executionPeriod'
                    render={({field}) => <DatePicker 
                        onChange={(date) => field.onChange(date)}
                        selected={field.value}
                        className='taskForm__date'
                        placeholderText='Срок выполнения'
                        required
                        showIcon
                        icon={<img src={datepickerIcon} style={{width: 16, height: 'auto', padding: 5}}/>}  
                    />}
                />
                {activeProjectId < 0 && <Select/>}
            </div>
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