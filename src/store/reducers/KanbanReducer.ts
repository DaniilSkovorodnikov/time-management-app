import { createSlice } from "@reduxjs/toolkit"
import { IBoard, ISection } from "../../models/IKanban"

interface KanbanState{
    boards: IBoard[],
    activeBoardId?: number,
    sections: ISection[]
}

const initialState: KanbanState = {
    boards: [],
    sections: []
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
        updateSection(state, action){
            state.sections = action.payload
        }
    }
})

export default kanbanSlice.reducer