import { IKanbanTask } from "../../models/IKanban";
import deleteIcon from '../../assets/icons/delete-icon.svg'
import editIcon from '../../assets/icons/edit-icon.svg'
import './KanbanTask.scss'
import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import InlineEditNameForm from "../TodoList/InlineEditNameForm";
import { deleteKanbanTask, editKanbanTaskName } from "../../store/actionCreators/KanbanActions";
import { useAppDispatch } from "../../hooks/redux";
import ConfirmModal from "../UI/ConfirmModal";

export default function KanbanTask({task, index, cardTasks}: KanbanTaskProps){
    const dispatch = useAppDispatch()
    const [hoverTask, setHoverTask] = useState<boolean>(false)
    const [editTaskForm, setEditTaskForm] = useState<boolean>(false)
    const [deleteTaslModal, setDeleteTaskModal] = useState<boolean>(false)

    return (
        <Draggable draggableId={`${task.id}`} index={index}>
            {(provided) => <div className="kanbanTask"
                onMouseEnter={() => setHoverTask(true)}
                onMouseLeave={() => setHoverTask(false)}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}           
            >
                {editTaskForm ? <InlineEditNameForm 
                    onCancel={() => setEditTaskForm(false)}
                    defaultName={task.name}
                    asyncSubmit={(updatedValue) => editKanbanTaskName(dispatch, {...task, name: updatedValue})}
                /> : <>
                    <p className="kanbanTask__name">{task.name}</p>
                    {hoverTask && <div className="kanbanTask__buttons">
                        <button className="action-btn" onClick={() => setDeleteTaskModal(true)}>
                            <img src={deleteIcon} />
                        </button>
                        <button className="action-btn" onClick={() => setEditTaskForm(true)}>
                            <img src={editIcon} />
                        </button>
                    </div>}
                </>}
                <ConfirmModal
                    onHide={() => setDeleteTaskModal(false)}
                    show={deleteTaslModal}
                    title="Удалить задачу?"
                    onConfirm={() => deleteKanbanTask(dispatch, task.id, cardTasks)}/>
            </div>}
        </Draggable>
    )
}

interface KanbanTaskProps{
    task: IKanbanTask,
    index: number,
    cardTasks: IKanbanTask[]
}