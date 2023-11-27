import { SubmitHandler, useForm } from "react-hook-form"
import saveIcon from '../../assets/icons/save-icon.svg'
import cancelIcon from '../../assets/icons/cancel-icon.svg'
import './InlineEditNameForm.scss'

type FormValues = {
    name: string
}

export default function InlineEditNameForm({defaultName, onCancel, asyncSubmit}: EditProjectFormProps) {
    const {register, handleSubmit, formState: {isValid}} = useForm<FormValues>({
        defaultValues: {
            name: defaultName
        }
    })

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        const updatedName: string = data.name
        asyncSubmit(updatedName)
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
    defaultName: string,
    onCancel: () => void,
    asyncSubmit: (updatedValue: string) => void 
}