import { IKanbanTask } from "../../models/IKanban";
import deleteIcon from '../../assets/icons/delete-icon.svg'
import editIcon from '../../assets/icons/edit-icon.svg'
import './KanbanTask.scss'
import { useEffect, useState } from "react";
import { useDrag } from "react-dnd";

export default function KanbanTask({task}: KanbanTaskProps){
    const [hoverTask, setHoverTask] = useState<boolean>(false)
    const [{isDragging}, drag] = useDrag({
        type: 'TASK',
        item: task,
        end: (item, monitor) => {
            console.log(item, monitor);
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        }),
    })
    

    return (
        <>
            <div className="kanbanTask"
            onMouseEnter={() => setHoverTask(true)}
            onMouseLeave={() => setHoverTask(false)}
            ref={drag}
            
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
            </div>
        </>
    )
}

interface KanbanTaskProps{
    task: IKanbanTask
}