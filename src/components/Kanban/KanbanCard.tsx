import { ICard } from "../../models/IKanban"
import './KanbanCard.scss'
import deleteIcon from '../../assets/icons/delete-icon.svg'
import editIcon from '../../assets/icons/edit-icon.svg'
import addIcon from '../../assets/icons/plus-icon.svg'
import AddTaskForm from "./AddTaskForm"
import { useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import KanbanTask from "./KanbanTask"
import { Droppable } from "react-beautiful-dnd"
import changeOrderIcon from '../../assets/icons/arrow-icon.svg'
import { kanbanSlice } from "../../store/reducers/KanbanReducer"
import { changeCardsOrder } from "../../store/actionCreators/KanbanActions"

export default function KanbanCard({card, boardCards}: KanbanCardProps) {
    const dispatch = useAppDispatch();
    const {tasks} = useAppSelector(state => state.kanbanSlice);
    const {changeCardOrder} = kanbanSlice.actions
    const [activeTaskForm, setActiveTaskForm] = useState<boolean>(false);

    const cardTasks = useMemo(() => tasks
    .filter(task => task.cardId === card.id)
    .sort((task1, task2) => task1.orderInCard - task2.orderInCard), [tasks, card])

    const onChangeOrder = (direction: 'left' | 'right') => {
        const offset = direction === 'left' ? 1 : -1
        const sourceCard: ICard = {...card, orderInBoard: card.orderInBoard - offset}
        const destinationCard: ICard | undefined = boardCards.find(boardCard => boardCard.orderInBoard === card.orderInBoard - offset)
        if(destinationCard){
            const updatedDestinationCard: ICard = {...destinationCard, orderInBoard: card.orderInBoard}
            changeCardsOrder(dispatch, sourceCard, updatedDestinationCard)
        }
    }

    return (
        <Droppable droppableId={`${card.id}`}>
            {(provided) => <div className='kanbanCard' {...provided.droppableProps} ref={provided.innerRef}>
                <div className="kanbanCard__header">
                    {card.orderInBoard !== 0 && <button className="action-btn hover-override" onClick={() => onChangeOrder('left')}>
                        <img className="kanbanCard__toLeft" src={changeOrderIcon} />
                    </button>}
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
                    {boardCards.length - 1 !== card.orderInBoard && <button className="action-btn hover-override" onClick={() => onChangeOrder('right')}>
                        <img className="kanbanCard__toRight" src={changeOrderIcon}/>
                    </button>}
                </div>
                {cardTasks.map((task) => <KanbanTask task={task} key={task.id} index={task.orderInCard}/>)}
                {activeTaskForm && <AddTaskForm cardId={card.id} cardTasksLength={cardTasks.length} onHide={() => setActiveTaskForm(false)}/>}
                {provided.placeholder}
            </div>}
        </Droppable>
    )
}

interface KanbanCardProps{
    card: ICard,
    boardCards: ICard[]
}