import axios from "axios";
import { AddBoardForm } from "../../components/Kanban/AddBoardForm";
import { CardForm } from "../../components/Kanban/AddCardForm";
import { KanbanTaskForm } from "../../components/Kanban/AddTaskForm";
import { http } from "../../http/axios";
import { IBoard, ICard, IKanbanTask } from "../../models/IKanban";
import { kanbanSlice } from "../reducers/KanbanReducer";
import { Dispatch } from "../store";
import { getFirestoreDocument } from "../../firebase";

export async function loadKanbanData(dispatch: Dispatch) {
    const boards: IBoard[] = await getFirestoreDocument<IBoard>('boards')
    dispatch(kanbanSlice.actions.updateBoards(boards))
    const cards: ICard[] = await getFirestoreDocument<ICard>('cards')
    dispatch(kanbanSlice.actions.updateCard(cards))
    const tasks: IKanbanTask[] = await getFirestoreDocument<IKanbanTask>('kanbanTasks')
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

export async function saveKanbanState(tasks: IKanbanTask[]) {
    axios.all(tasks.map(task => {
        http.put(`/kanbanTasks/${task.id}`, task)
    }))
}