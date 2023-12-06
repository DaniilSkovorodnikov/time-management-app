import { SubmitHandler, useForm } from 'react-hook-form'
import cancelIcon from '../../assets/icons/cancel-icon.svg'
import submitIcon from '../../assets/icons/save-icon.svg'
import './AddBoardForm.scss'
import { addBoard } from '../../store/actionCreators/KanbanActions'
import { useAppDispatch } from '../../hooks/redux'

export interface AddBoardForm{
    name: string
}

export default function AddBoardForm({onHide}: AddBoardFormProps){
    const dispatch = useAppDispatch()
    const {register, handleSubmit, formState: {isValid}} = useForm<AddBoardForm>()

    const onSubmit: SubmitHandler<AddBoardForm> = (data) => {
        addBoard(dispatch, data)
        onHide()
    }

    return (
        <form className="addBoard" onSubmit={handleSubmit(onSubmit)}>
            <input className="addBoard" placeholder="Название доски" {...register('name', {required: true})}/>
            <div className="addBoard__buttons">
                <button type='submit' className="addBoard__submit action-btn" disabled={!isValid}>
                    <img src={submitIcon}/>
                </button>
                <button className="addBoard__cancel action-btn" onClick={onHide}>
                    <img src={cancelIcon}/>
                </button>
            </div>
        </form>
    )
}

interface AddBoardFormProps{
    onHide: () => void
}