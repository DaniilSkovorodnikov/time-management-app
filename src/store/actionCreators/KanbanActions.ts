import axios from "axios";
import { AddBoardForm } from "../../components/Kanban/AddBoardForm";
import { CardForm } from "../../components/Kanban/AddCardForm";
import { KanbanTaskForm } from "../../components/Kanban/AddTaskForm";
import { http } from "../../http/axios";
import { IBoard, ICard, IKanbanTask } from "../../models/IKanban";
import { kanbanSlice } from "../reducers/KanbanReducer";
import { Dispatch } from "../store";
import { addToFirestoreDocument, getFirestoreDocument, updateFirestoreDocument } from "../../firebase";

export async function loadKanbanData(dispatch: Dispatch) {
    const boards: IBoard[] = await getFirestoreDocument<IBoard>('boards')
    dispatch(kanbanSlice.actions.updateBoards(boards))
    const cards: ICard[] = await getFirestoreDocument<ICard>('cards')
    dispatch(kanbanSlice.actions.updateCard(cards))
    const tasks: IKanbanTask[] = await getFirestoreDocument<IKanbanTask>('kanbanTasks')
    dispatch(kanbanSlice.actions.updateTasks(tasks))
}

export async function addBoard(dispatch: Dispatch, newBoard: AddBoardForm) {
    const boardId = await addToFirestoreDocument<IBoard>('boards', newBoard)
    dispatch(kanbanSlice.actions.addBoard({...newBoard, id: boardId}))
}

export async function addCard(dispatch: Dispatch, newCard: CardForm) {
    const cardId = await addToFirestoreDocument<ICard>('cards', newCard)
    dispatch(kanbanSlice.actions.addCard({...newCard, id: cardId}))
}

export async function addKanbanTask(dispatch: Dispatch, newTask: KanbanTaskForm) {
    const taskId = await addToFirestoreDocument<IKanbanTask>('kanbanTasks', newTask)
    dispatch(kanbanSlice.actions.addTask({...newTask, id: taskId}))
}

export async function saveKanbanState(tasks: IKanbanTask[]) {
    Promise.all(tasks.map(task => updateFirestoreDocument('kanbanTasks', task.id, task)))
}

export async function changeCardsOrder(dispatch: Dispatch, sourceCard: ICard, destinationCard: ICard) {
    dispatch(kanbanSlice.actions.changeCardOrder({sourceCard, destinationCard}))
    updateFirestoreDocument<ICard>('cards', sourceCard.id, sourceCard)
    updateFirestoreDocument<ICard>('cards', destinationCard.id, destinationCard)
}