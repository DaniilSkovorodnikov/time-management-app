import { SubmitHandler, useForm } from "react-hook-form"
import { IProject, ProjectTypes } from "../../models/IProject"
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { saveProjects } from "../../store/actionCreators/ProjectsActions";
import './AddProjectForm.scss'
import { useEffect } from "react";

export type ProjectForm = Pick<IProject, 'name'>

export default function AddProjectForm({show, onHide}: AddProjectFormProps) {
    const {register, handleSubmit, formState: {errors, isDirty, isValid}, reset} = useForm<ProjectForm>({
        mode: 'onBlur'
    });
    const {projects} = useAppSelector(state => state.projectSlice)
    const dispatch = useAppDispatch();
    const onSubmit: SubmitHandler<ProjectForm> = async(data: ProjectForm) => {
        const newProject: Omit<IProject, 'id'> = {
            ...data,
            type: ProjectTypes.Custom
        }
        await saveProjects(dispatch, newProject)
        onHide()
    }  

    useEffect(() => {
        if(!show){
            reset()
        }
    }, [show, reset])

    return (
        <form className="projectForm" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="projectForm__title">Создать проект</h2>
            <div className="projectForm__field">
                <label className="projectForm__label">Название</label>
                <input className="projectForm__input" type="text" {...register('name', {required: true})} />
                {!!errors.name && <p className="projectForm__error">Введите название проекта</p>}
            </div>
            <div className="projectForm__buttons">
                <button className="projectForm__cancel" type='button' onClick={() => onHide()}>Отменить</button>
                <button className="projectForm__submit" type="submit" disabled={!isValid || !isDirty}>Сохранить</button>
            </div>
        </form>
    )
}

interface AddProjectFormProps{
    show: boolean,
    onHide: () => void
}