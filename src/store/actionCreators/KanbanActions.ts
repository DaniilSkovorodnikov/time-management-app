import { AddBoardForm } from "../../components/Kanban/AddBoardForm";
import { http } from "../../http/axios";
import { kanbanSlice } from "../reducers/KanbanReducer";
import { Dispatch } from "../store";

export async function loadKanbanData(dispatch: Dispatch) {
    const boards = (await http.get('/boards')).data
    dispatch(kanbanSlice.actions.updateBoards(boards))
    const sections = (await http.get('/sections')).data
    dispatch(kanbanSlice.actions.updateSection(sections))
}

export async function addBoard(dispatch: Dispatch, newBoard: AddBoardForm) {
    const board = (await http.post('/boards', newBoard)).data
    dispatch(kanbanSlice.actions.addBoard(board))
}