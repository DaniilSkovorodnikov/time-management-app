import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import './KanbanSidebar.scss'
import addIcon from '../../assets/icons/plus-icon.svg'
import { useState } from "react"
import AddBoardForm from "../Kanban/AddBoardForm"
import { kanbanSlice } from "../../store/reducers/KanbanReducer"

export default function KanbanSidebar(){
    const {boards} = useAppSelector(state => state.kanbanSlice)
    const dispatch = useAppDispatch()
    const {changeActiveBoardId} = kanbanSlice.actions
    const [activeAddForm, setActiveAddForm] = useState<boolean>(false)

    return (
        <div className="kanbanSidebar">
            <button className='kanbanSidebar__add' onClick={() => setActiveAddForm(true)}>
                Добавить доску <img src={addIcon}/>
            </button>
            <ul className="kanbanSidebar__boards">
                <h2 className="kanbanSidebar__title">Доски</h2>
                {boards.map(board => <li
                    className="kanbanSidebar__board"
                    key={board.id}
                    onClick={() => dispatch(changeActiveBoardId(board.id))}
                >
                    {board.name}
                </li>)}
                {activeAddForm && <AddBoardForm onHide={() => setActiveAddForm(false)}/>}
            </ul>
        </div>
    )
}