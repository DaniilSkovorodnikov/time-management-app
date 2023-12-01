import { useMemo } from 'react'
import { useAppSelector } from '../../hooks/redux'
import { IBoard, ICard } from '../../models/IKanban'
import './Kanban.scss'
import AddCardForm from './AddCardForm'

export default function Kanban(){
    const {boards, activeBoardId, cards} = useAppSelector(state => state.kanbanSlice)
    const {openedSidebar} = useAppSelector(state => state.layoutSlice)
    const activeBoard = useMemo<IBoard>(() => boards.find(board => board.id === activeBoardId) as IBoard, [activeBoardId, boards])
    const boardCards = useMemo<ICard[]>(() => cards.filter(card => card.boardId === activeBoardId), [activeBoardId, cards]) 

    if(!activeBoardId){
        return <></>
    }
    return <div className="kanban">
        <h2 className='kanban__title'>{activeBoard.name}</h2>
        <div className='kanban__container' style={{width: `calc(100vw - ${openedSidebar ? '260px' : '0px'} - 80px)`}}>
            {boardCards.map((card) => <div className='kanban__card' key={card.id}>
                {card.name}
            </div>)}
            <AddCardForm/>
        </div>
    </div>
}