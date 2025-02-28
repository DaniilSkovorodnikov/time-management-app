import { useEffect, useMemo, useState } from 'react'
import DatePicker from 'react-datepicker'
import './NewTaskForm.scss'
import datepickerIcon from '../../assets/icons/datepicker-icon.png'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { Controller, SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { ITask } from '../../models/ITask'
import { addTask, editTask } from '../../store/actionCreators/TasksActions'
import { IncomingProject, ProjectOption, SectionOption, TodayProject } from '../../models/IProject'
import StyledSelect from '../UI/StyledSelect'

export type TaskForm = Omit<ITask, 'executionPeriod'> & {executionPeriod: Date}

export default function NewTaskForm({onHide, defaultState, isEditMode} : NewTaskFormProps) {
    const {activeProjectId, activeSectionId, projects, tasksLists} = useAppSelector(state => state.projectSlice)
    const dispatch = useAppDispatch()
    const [selectedProject, setSelectedProject] = useState<string | null | undefined>(defaultState?.projectId)

    const {control, register, handleSubmit, reset, formState: {isValid}, setValue} = useForm<TaskForm>({
        mode: 'onBlur',
        defaultValues: defaultState || {
            projectId: ![TodayProject.id, IncomingProject.id].includes(activeProjectId) ? activeProjectId : null,
            sectionId: activeSectionId,
            executionPeriod: activeProjectId === TodayProject.id ? new Date() : undefined
        },
    });
    const projectId = useWatch({name: 'projectId', control})
    const sectionId = useWatch({name: 'sectionId', control})

    const onSubmit: SubmitHandler<TaskForm> = (data) => {
        isEditMode ? editTask(dispatch, data) : addTask(dispatch, data)
        onHide()
    }

    const projectOptions = useMemo<ProjectOption[]>(() => projects.map(project => ({
        label: project.name,
        value: project.id
    })), [projects])

    const sectionsOptions = useMemo<SectionOption[]>(() => tasksLists
        .filter(list => list.projectId === selectedProject)
        .map(list => ({
            label: list.name,
            value: list.id
    })), [tasksLists, selectedProject])

    useEffect(() => {
        reset()
    }, [activeProjectId, reset])
    
    return(
        <form className="taskForm" onSubmit={handleSubmit(onSubmit)}>
            <input className="taskForm__input"
                placeholder='Название задачи'
                {...register('name', {required: true})}
                autoFocus
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
                {([TodayProject.id, IncomingProject.id].includes(activeProjectId) || isEditMode) && <div className='taskForm__project'>
                    <div className='taskForm__field'>
                        <label>Выберите проект</label>
                        <StyledSelect<ProjectOption>
                            options={[notSelectedOption, ...projectOptions]}
                            onChange={(opt) => {
                                setValue('projectId', opt?.value)
                                setValue('sectionId', null)
                                setSelectedProject(opt?.value)
                            }}
                            value={projectOptions.find(opt => opt.value === projectId) || notSelectedOption}
                            placeholder='Прикрепить к проекту'
                        />
                    </div>
                    {selectedProject&& sectionsOptions.length > 0 && <div className='taskForm__field'>
                            <label>Выберите список</label>
                            <StyledSelect<SectionOption>
                                options={[notSelectedOption, ...sectionsOptions]}
                                onChange={(opt) => {setValue('sectionId', opt?.value || null)}}
                                value={sectionsOptions.find(opt => opt.value === sectionId) || notSelectedOption}
                                placeholder='Прикрепить к списку'
                            />
                        </div>}
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

const notSelectedOption: ProjectOption | SectionOption = {
    label: 'Не выбран',
    value: null
}