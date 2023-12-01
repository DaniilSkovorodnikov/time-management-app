import { useMemo } from 'react'
import { useAppSelector } from '../../hooks/redux'
import { IBoard, ISection } from '../../models/IKanban'
import './Kanban.scss'

export default function Kanban(){
    const {boards, activeBoardId, sections} = useAppSelector(state => state.kanbanSlice)
    const {openedSidebar} = useAppSelector(state => state.layoutSlice)
    const activeBoard = useMemo<IBoard>(() => boards.find(board => board.id === activeBoardId) as IBoard, [activeBoardId])
    const boardSections = useMemo<ISection[]>(() => sections.filter(section => section.id === activeBoardId), [activeBoardId]) 

    if(!activeBoardId){
        return <></>
    }
    return <div className="kanban">
        <h2 className='kanban__title'>{activeBoard.name}</h2>
        <div className='kanban__container' style={{maxWidth: `calc(100vw - ${openedSidebar ? '260px' : '0px'} - 80px)`}}>
            {[...boardSections, ...boardSections, ...boardSections, ...boardSections].map((section) => <div className='kanban__section' key={section.id}>
                {section.name}
            </div>)}
        </div>
    </div>
}