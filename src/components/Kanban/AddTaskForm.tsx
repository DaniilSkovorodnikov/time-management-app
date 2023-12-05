import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { IKanbanTask } from "../../models/IKanban";
import submitIcon from '../../assets/icons/save-icon.svg'
import cancelIcon from '../../assets/icons/cancel-icon.svg'
import './AddTaskForm.scss'
import { addKanbanTask } from "../../store/actionCreators/KanbanActions";

export type KanbanTaskForm = Omit<IKanbanTask, 'id'>

export default function AddTaskForm({cardId, cardTasksLength, onHide}: AddTaskFormProps){
    const dispatch = useAppDispatch();
    const {register, handleSubmit, formState: {isValid}} = useForm<KanbanTaskForm>({
        defaultValues: {
            cardId,
            orderInCard: cardTasksLength
        }
    })

    const onSubmit: SubmitHandler<KanbanTaskForm> = (data) => {
        addKanbanTask(dispatch, data);
        onHide()
    }

    return (
        <form className="kanbanTaskForm" onSubmit={handleSubmit(onSubmit)}>
            <input
            className="kanbanTaskForm__input"
                placeholder="Название задачи"
                {...register('name', {required: true})}
            />
            <div className="kanbanTaskForm__buttons">
                <button className="action-btn" disabled={!isValid} type="submit">
                    <img src={submitIcon} />
                </button>
                <button className="action-btn" onClick={onHide}>
                    <img src={cancelIcon} />
                </button>
            </div>
        </form>
    )
}

interface AddTaskFormProps{
    cardId: number,
    cardTasksLength: number,
    onHide: () => void
}