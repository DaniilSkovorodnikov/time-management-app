import { createSlice } from "@reduxjs/toolkit"
import { IBoard, ICard, IKanbanTask } from "../../models/IKanban"

interface KanbanState{
    boards: IBoard[],
    activeBoardId?: number,
    cards: ICard[],
    tasks: IKanbanTask[]
}

const initialState: KanbanState = {
    boards: [],
    cards: [],
    tasks: []
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
        },
        updateTasks(state, action){
            state.tasks = action.payload
        },
        addTask(state, action){
            state.tasks.push(action.payload)
        }
    }
})

export default kanbanSlice.reducer