import { useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { IBoard, ICard, IKanbanTask } from '../../models/IKanban'
import './Kanban.scss'
import AddCardForm from './AddCardForm'
import KanbanCard from './KanbanCard'
import {DragDropContext, OnDragEndResponder} from 'react-beautiful-dnd'
import { kanbanSlice } from '../../store/reducers/KanbanReducer'
import { saveKanbanState } from '../../store/actionCreators/KanbanActions'

export default function Kanban(){
    const {boards, activeBoardId, cards, tasks} = useAppSelector(state => state.kanbanSlice);
    const {openedSidebar} = useAppSelector(state => state.layoutSlice);
    const dispatch = useAppDispatch();
    const {changeTaskRelative} = kanbanSlice.actions;
    const activeBoard = useMemo<IBoard>(() => boards.find(board => board.id === activeBoardId) as IBoard, [activeBoardId, boards]);
    const boardCards = useMemo<ICard[]>(() => cards
    .filter(card => card.boardId === activeBoardId)
    .sort((card1, card2) => card1.orderInBoard - card2.orderInBoard), [activeBoardId, cards]) ;

    const handleDrag: OnDragEndResponder = (result) => {
        let sourceTask = tasks.find(task => task.id === result.draggableId);
        sourceTask = sourceTask ? {...sourceTask} : undefined
        const destinationCard = cards.find(card => result.destination?.droppableId && card.id === result.destination.droppableId);
        const destinationTaskIndex = result.destination?.index ?? -1;
        
        if(sourceTask && destinationCard && destinationTaskIndex !== -1){
            if(sourceTask.cardId === destinationCard.id && sourceTask.orderInCard === destinationTaskIndex){
                return
            }
            const destinationCardTasks = tasks.filter(task => task.cardId === destinationCard.id);
            const updatedTasks: IKanbanTask[] = []
            if(sourceTask.cardId === destinationCard.id){
                destinationCardTasks.splice(sourceTask.orderInCard, 1);
            }
            else{
                const sourceCard = cards.find(card => card.id === (sourceTask as IKanbanTask).cardId)
                if(sourceCard){
                    const sourceCardTasks = tasks.filter(task => task.cardId === sourceCard.id)
                    sourceCardTasks.splice(sourceTask.orderInCard, 1)
                    updatedTasks.push(...sourceCardTasks.map((task, i) => ({...task, orderInCard: i})))
                }
                sourceTask.cardId = destinationCard.id
            }
            destinationCardTasks.splice(destinationTaskIndex, 0, sourceTask);
            updatedTasks.push(...destinationCardTasks.map((task, i) => ({...task, orderInCard: i})))
            dispatch(changeTaskRelative(updatedTasks))
            saveKanbanState(updatedTasks)
        }
    }

    if(!activeBoardId){
        return <></>
    }
    return (
        <DragDropContext onDragEnd={handleDrag}>
            <div className="kanban">
                <h1 className='kanban__title'>{activeBoard.name}</h1>
                <div className='kanban__container' style={{width: `calc(100vw - ${openedSidebar ? '260px' : '0px'} - 80px)`}}>
                    {boardCards.map((card) => <KanbanCard card={card} key={card.id} boardCards={boardCards}/>)}
                    <AddCardForm boardCardsLength={boardCards.length}/>
                </div>
            </div>
        </DragDropContext>
    )
    
    
}