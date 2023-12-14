import { useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { IBoard, ICard, IKanbanTask } from '../../models/IKanban'
import './Kanban.scss'
import AddCardForm from './AddCardForm'
import KanbanCard from './KanbanCard'
import {DragDropContext, OnDragEndResponder} from 'react-beautiful-dnd'
import { kanbanSlice } from '../../store/reducers/KanbanReducer'
import { deleteBoard, editKanbanBoardName, saveKanbanState } from '../../store/actionCreators/KanbanActions'
import deleteIcon from '../../assets/icons/delete-icon.svg'
import editIcon from '../../assets/icons/edit-icon.svg'
import InlineEditNameForm from '../TodoList/InlineEditNameForm'
import ConfirmModal from '../UI/ConfirmModal'

export default function Kanban(){
    const {boards, activeBoardId, cards, tasks} = useAppSelector(state => state.kanbanSlice);
    const {openedSidebar} = useAppSelector(state => state.layoutSlice);
    const dispatch = useAppDispatch();
    const {changeTaskRelative, changeActiveBoardId} = kanbanSlice.actions;
    const activeBoard = useMemo<IBoard>(() => boards.find(board => board.id === activeBoardId) as IBoard, [activeBoardId, boards]);
    const boardCards = useMemo<ICard[]>(() => cards
    .filter(card => card.boardId === activeBoardId)
    .sort((card1, card2) => card1.orderInBoard - card2.orderInBoard), [activeBoardId, cards]);
    const boardTasks = useMemo<IKanbanTask[]>(() => tasks.filter(task => boardCards.some(card => card.id === task.cardId)), [boardCards, tasks])
    const [editBoardForm, setEditBoardForm] = useState<boolean>(false)
    const [deleteBoardModal, setDeleteBoardModal] = useState<boolean>(false)
    const [openedCardForm, setOpenedCardForm] = useState<boolean>(false)

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
                    <div className='kanban__header'>
                    {editBoardForm ? 
                        <InlineEditNameForm 
                            onCancel={() => setEditBoardForm(false)}
                            defaultName={activeBoard.name}
                            asyncSubmit={(updatedValue) => editKanbanBoardName(dispatch, {...activeBoard, name: updatedValue})}
                        /> 
                            :
                        <>
                            <h1 className='kanban__title'>{activeBoard.name}</h1>
                            <div className="kanban__buttons">
                                <button className="action-btn" onClick={() => setDeleteBoardModal(true)}>
                                    <img src={deleteIcon} />
                                </button>
                                <button className="action-btn" onClick={() => setEditBoardForm(true)}>
                                    <img src={editIcon} />
                                </button>
                            </div>
                        </>}
                    </div>
                
                <div className='kanban__container' style={{width: `calc(100vw - ${openedSidebar ? '260px' : '0px'} - 80px)`}}>
                    {boardCards.map((card) => <KanbanCard card={card} key={card.id} boardCards={boardCards}/>)}
                    {openedCardForm ?
                     <AddCardForm boardCardsLength={boardCards.length} onHide={() => setOpenedCardForm(false)}/> :
                     <button onClick={() => setOpenedCardForm(true)} className='addCardButton'>Добавить карточку +</button>
                    }
                </div>
            </div>
            <ConfirmModal
                onHide={() => setDeleteBoardModal(false)}
                show={deleteBoardModal}
                title='Удалить доску?'
                onConfirm={() => {
                    dispatch(changeActiveBoardId(null))
                    deleteBoard(dispatch, activeBoard.id, boardCards, boardTasks)
                }}/>
        </DragDropContext>
    )
}