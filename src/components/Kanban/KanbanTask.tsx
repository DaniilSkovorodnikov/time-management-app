import { IKanbanTask } from "../../models/IKanban";
import deleteIcon from '../../assets/icons/delete-icon.svg'
import editIcon from '../../assets/icons/edit-icon.svg'
import './KanbanTask.scss'
import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

export default function KanbanTask({task, index}: KanbanTaskProps){
    const [hoverTask, setHoverTask] = useState<boolean>(false)

    return (
        <Draggable draggableId={`${task.id}`} index={index}>
            {(provided) => <div className="kanbanTask"
                onMouseEnter={() => setHoverTask(true)}
                onMouseLeave={() => setHoverTask(false)}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}           
            >
                <p className="kanbanTask__name">{task.name}</p>
                {hoverTask && <div className="kanbanTask__buttons">
                    <button className="action-btn">
                        <img src={deleteIcon} />
                    </button>
                    <button className="action-btn">
                        <img src={editIcon} />
                    </button>
                </div>}
            </div>}
        </Draggable>
    )
}

interface KanbanTaskProps{
    task: IKanbanTask,
    index: number
}