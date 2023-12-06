import { createSlice } from "@reduxjs/toolkit"
import { IBoard, ICard, IKanbanTask, TaskDragProps } from "../../models/IKanban"

interface KanbanState{
    boards: IBoard[],
    activeBoardId?: string,
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
        editCard(state, {payload}){
            const cardIndex = state.cards.findIndex(card => card.id === payload.id)
            if(cardIndex >= 0){
                const cardsCopy = [...state.cards]
                cardsCopy[cardIndex] = payload
                state.cards = cardsCopy
            }
        },
        changeCardOrder(state, {payload}){
            const sourceCardIndex = state.cards.findIndex(card => card.id === payload.sourceCard.id)
            const destinationCardIndex = state.cards.findIndex(card => card.id === payload.destinationCard.id)
            if(sourceCardIndex >= 0 && destinationCardIndex >= 0){
                const cardsCopy = [...state.cards]
                cardsCopy[sourceCardIndex] = payload.sourceCard
                cardsCopy[destinationCardIndex] = payload.destinationCard
                state.cards = cardsCopy
            }

        },
        updateTasks(state, action){
            state.tasks = action.payload
        },
        addTask(state, action){
            state.tasks.push(action.payload)
        },
        changeTaskRelative(state, action: {payload: IKanbanTask[], type: string}){
            const updatedTasks = action.payload
            state.tasks = [...state.tasks.filter(task => updatedTasks.every(updatedTask => task.id !== updatedTask.id)), ...updatedTasks]
        }
    }
})

export default kanbanSlice.reducer