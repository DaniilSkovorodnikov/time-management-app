import { useEffect, useRef } from 'react'
import DatePicker from 'react-datepicker'
import Select from 'react-select'
import './NewTaskForm.scss'
import datepickerIcon from '../../assets/icons/datepicker-icon.png'
import { useAppSelector } from '../../hooks/redux'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Task } from '../../store/reducers/TaskReducer'

export default function NewTaskForm({onHide} : NewTaskFormProps) {
    const titleInputRef = useRef<HTMLInputElement>(null)
    const {activeProjectId, activeSection} = useAppSelector(state => state.projectSlice)
    
    const {control, register, handleSubmit, reset} = useForm<Task>({
        mode: 'onBlur',
        defaultValues: {
            projectId: activeProjectId,
            sectionName: activeSection
        }
    });

    const onSubmit: SubmitHandler<Task> = (data) => {
        console.log(data);
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