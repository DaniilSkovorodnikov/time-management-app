import { ICard } from "../../models/IKanban"
import './KanbanCard.scss'
import deleteIcon from '../../assets/icons/delete-icon.svg'
import editIcon from '../../assets/icons/edit-icon.svg'
import addIcon from '../../assets/icons/plus-icon.svg'
import AddTaskForm from "./AddTaskForm"
import { useMemo, useState } from "react"
import { useAppSelector } from "../../hooks/redux"
import KanbanTask from "./KanbanTask"

export default function KanbanCard({card}: KanbanCardProps) {
    const {tasks} = useAppSelector(state => state.kanbanSlice)
    const [activeTaskForm, setActiveTaskForm] = useState<boolean>(false);

    const cardTasks = useMemo(() => tasks.filter(task => task.cardId === card.id), [tasks, card])

    return (
        <div className='kanbanCard'>
            <div className="kanbanCard__header">
                <h2 className="kanbanCard__title">{card.name}</h2>
                <div className="kanbanCard__buttons">
                    <button className="action-btn hover-override">
                        <img src={deleteIcon} />
                    </button>
                    <button className="action-btn hover-override">
                        <img src={editIcon} />
                    </button>
                    <button className="action-btn hover-override" onClick={() => setActiveTaskForm(true)}>
                        <img src={addIcon} />
                    </button>
                </div>
            </div>
            {cardTasks.map(task => <KanbanTask task={task} key={task.id}/>)}
            {activeTaskForm && <AddTaskForm cardId={card.id} onHide={() => setActiveTaskForm(false)}/>}
        </div>
    )
}

interface KanbanCardProps{
    card: ICard
}