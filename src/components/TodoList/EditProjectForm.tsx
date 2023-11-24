import { SubmitHandler, useForm } from "react-hook-form"
import { ProjectForm } from "../Sidebar/AddProjectForm"
import saveIcon from '../../assets/icons/save-icon.svg'
import cancelIcon from '../../assets/icons/cancel-icon.svg'
import './EditProjectForm.scss'
import { IProject } from "../../models/IProject"
import { editProject } from "../../store/actionCreators/ProjectsActions"
import { useAppDispatch } from "../../hooks/redux"

export default function EditProjectForm({project, onCancel}: EditProjectFormProps) {
    const dispatch = useAppDispatch()
    const {register, handleSubmit, formState: {isValid}} = useForm<ProjectForm>({
        defaultValues: {
            name: project.name
        }
    })

    const onSubmit: SubmitHandler<ProjectForm> = (data) => {
        const updatedProject: IProject = {
            ...project,
            ...data
        }
        editProject(dispatch, updatedProject)
        onCancel()
    }

    return (
        <form className="editProject" onSubmit={handleSubmit(onSubmit)}>
            <input className="editProject__input" {...register('name', {required: true})}/>
            <button className="editProject__save" disabled={!isValid} type="submit">
                <img src={saveIcon}/>
            </button>
            <button className="editProject__cancel" onClick={onCancel}>
                <img src={cancelIcon}/>
            </button>
        </form>
    )
}

interface EditProjectFormProps{
    project: IProject,
    onCancel: () => void
}