import { createSlice } from "@reduxjs/toolkit"
import { IBoard, ICard } from "../../models/IKanban"

interface KanbanState{
    boards: IBoard[],
    activeBoardId?: number,
    cards: ICard[]
}

const initialState: KanbanState = {
    boards: [],
    cards: []
}

export const kanbanSlice = createSlice({
    name: 'kanban',
    initialState,
    reducers: {
        updateBoards(state, action){
            state.boards = action.payload
        },
        addBoard(state, action){
            state.boards.push(action.payload)
        },
        changeActiveBoardId(state, action){
            state.activeBoardId = action.payload
        },
        updateCard(state, action){
            state.cards = action.payload
        },
        addCard(state, action){
            state.cards.push(action.payload)
        }
    }
})

export default kanbanSlice.reducer