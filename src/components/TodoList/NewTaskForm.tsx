import { useEffect, useMemo, useRef, useState } from 'react'
import DatePicker from 'react-datepicker'
import './NewTaskForm.scss'
import datepickerIcon from '../../assets/icons/datepicker-icon.png'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { ITask } from '../../models/ITask'
import { addTask, editTask } from '../../store/actionCreators/TasksActions'
import { ProjectOption, SectionOption, TodayProject } from '../../models/IProject'
import StyledSelect from '../UI/StyledSelect'

export type TaskForm = Omit<ITask, 'executionPeriod'> & {executionPeriod: Date}

export default function NewTaskForm({onHide, defaultState, isEditMode} : NewTaskFormProps) {
    const titleInputRef = useRef<HTMLInputElement>(null)
    const {activeProjectId, activeSectionId, projects, tasksLists} = useAppSelector(state => state.projectSlice)
    const {tasks} = useAppSelector(state => state.tasksSlice)
    const dispatch = useAppDispatch()
    const [selectedProject, setSelectedProject] = useState<number | null | undefined>(defaultState?.projectId)

    const {control, register, handleSubmit, reset, formState: {isValid}, setValue} = useForm<TaskForm>({
        mode: 'onBlur',
        defaultValues: defaultState || {
            projectId: activeProjectId > 0 ? activeProjectId : null,
            sectionId: activeSectionId,
            executionPeriod: activeProjectId === TodayProject.id ? new Date() : undefined
        },
    });

    const onSubmit: SubmitHandler<TaskForm> = (data) => {
        const newTask: TaskForm = {
            ...data,
            id: isEditMode ? data.id : tasks.length + 1
        }
        isEditMode ? editTask(dispatch, newTask) : addTask(dispatch, newTask)
        onHide()
    }

    const projectOptions = useMemo<ProjectOption[]>(() => projects.map(project => ({
        label: project.name,
        value: project.id
    })), [projects])

    const sectionsOptions = useMemo<SectionOption[]>(() => tasksLists
        .filter(list => list.parentProjectId === selectedProject)
        .map(list => ({
            label: list.name,
            value: list
    })), [tasksLists, selectedProject])
    
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
                {activeProjectId !== TodayProject.id && <Controller
                    control={control}
                    rules={{required: true}}
                    name='executionPeriod'
                    render={({field}) => <DatePicker 
                        onChange={(date) => field.onChange(date)}
                        selected={field.value}
                        className='taskForm__date'
                        placeholderText='Срок выполнения'
                        showIcon
                        icon={<img src={datepickerIcon} style={{width: 16, height: 'auto', padding: 5}}/>}  
                    />}
                />}
                {(activeProjectId < 0 || isEditMode) && <div className='taskForm__project'>
                    <Controller
                        control={control}
                        name='projectId'
                        render={({field}) => <StyledSelect<ProjectOption>
                            options={projectOptions}
                            onChange={(opt) => {
                                field.onChange(opt?.value)
                                setValue('sectionId', null)
                                setSelectedProject(opt?.value)
                            }}
                            value={projectOptions.find(opt => opt.value === field.value)}
                            placeholder='Прикрепить к проекту'
                        />}
                    />
                    {selectedProject && <Controller
                        control={control}
                        name='sectionId'
                        render={({field}) => <StyledSelect<SectionOption>
                            options={sectionsOptions}
                            onChange={(opt) => {field.onChange(opt?.value.id)}}
                            value={sectionsOptions.find(opt => opt.value.id === field.value)}
                            placeholder='Прикрепить к списку'
                        />}
                    />}
                </div>}
            </div>
            <div className="taskForm__buttons">
                <button className="taskForm__cancel" onClick={onHide}>Отменить</button>
                <button className="taskForm__save" type='submit' disabled={!isValid}>
                    {isEditMode ? 'Сохранить' : 'Добавить'}
                </button>
            </div>
        </form>
    )
}

interface NewTaskFormProps{
    onHide: () => void,
    defaultState?: TaskForm,
    isEditMode?: boolean,
}