import { AddBoardForm } from "../../components/Kanban/AddBoardForm";
import { CardForm } from "../../components/Kanban/AddCardForm";
import { KanbanTaskForm } from "../../components/Kanban/AddTaskForm";
import { http } from "../../http/axios";
import { IBoard, ICard, IKanbanTask } from "../../models/IKanban";
import { kanbanSlice } from "../reducers/KanbanReducer";
import { Dispatch } from "../store";

export async function loadKanbanData(dispatch: Dispatch) {
    const boards = (await http.get('/boards')).data
    dispatch(kanbanSlice.actions.updateBoards(boards))
    const cards = (await http.get('/cards')).data
    dispatch(kanbanSlice.actions.updateCard(cards))
    const tasks = (await http.get('/kanbanTasks')).data
    dispatch(kanbanSlice.actions.updateTasks(tasks))
}

export async function addBoard(dispatch: Dispatch, newBoard: AddBoardForm) {
    const board = (await http.post<IBoard>('/boards', newBoard)).data
    dispatch(kanbanSlice.actions.addBoard(board))
}

export async function addCard(dispatch: Dispatch, newCard: CardForm) {
    const card = (await http.post<ICard>('/cards', newCard)).data
    dispatch(kanbanSlice.actions.addCard(card))
}

export async function addKanbanTask(dispatch: Dispatch, newTask: KanbanTaskForm) {
    const task = (await http.post<IKanbanTask>('/kanbanTasks', newTask)).data
    dispatch(kanbanSlice.actions.addTask(task))
}