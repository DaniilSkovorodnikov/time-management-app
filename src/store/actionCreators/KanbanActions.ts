import { AddBoardForm } from "../../components/Kanban/AddBoardForm";
import { CardForm } from "../../components/Kanban/AddCardForm";
import { KanbanTaskForm } from "../../components/Kanban/AddTaskForm";
import { IBoard, ICard, IKanbanTask } from "../../models/IKanban";
import { kanbanSlice } from "../reducers/KanbanReducer";
import { Dispatch } from "../store";
import { addToFirestoreDocument, deleteFromFirestoreDocument, getFirestoreDocument, updateFirestoreDocument } from "../../firebase";



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

export async function editCardName(dispatch: Dispatch, updatedCard: ICard) {
    dispatch(kanbanSlice.actions.editCard(updatedCard))
    updateFirestoreDocument<ICard>('cards', updatedCard.id, updatedCard)
}

export async function deleteCard(dispatch: Dispatch, deletedCardId: string, boardCards: ICard[], deletedTasks: IKanbanTask[]) {
    const updatedCards: ICard[] = boardCards
        .filter(card => card.id !== deletedCardId)
        .map((card, i) => ({...card, orderInBoard: i}));
    dispatch(kanbanSlice.actions.deleteCard({deletedCardId, updatedCards}))
    deleteFromFirestoreDocument('cards', deletedCardId)
    await Promise.all(deletedTasks.map(task => deleteFromFirestoreDocument('kanbanTasks', task.id)))
    await Promise.all(updatedCards.map(card => updateFirestoreDocument<ICard>('cards', card.id, card)))
}

export async function editKanbanTaskName(dispatch: Dispatch, updatedTask: IKanbanTask) {
    dispatch(kanbanSlice.actions.editTask(updatedTask))
    updateFirestoreDocument<IKanbanTask>('kanbanTasks', updatedTask.id, updatedTask)
}

export async function deleteKanbanTask(dispatch: Dispatch, deletedTasksId: string, cardTasks: IKanbanTask[]) {
    const updatedTasks = cardTasks
        .filter(task => task.id !== deletedTasksId)
        .map((task, i) => ({...task, orderInCard: i}));
    dispatch(kanbanSlice.actions.deleteTask({updatedTasks, deletedTasksId}))
    deleteFromFirestoreDocument('kanbanTasks', deletedTasksId)
    saveKanbanState(updatedTasks)
} 

export async function editKanbanBoardName(dispatch: Dispatch, updatedBoard: IBoard) {
    dispatch(kanbanSlice.actions.editBoardName(updatedBoard))
    updateFirestoreDocument<IBoard>('boards', updatedBoard.id, updatedBoard)
}

export async function deleteBoard(dispatch: Dispatch, deletedBoardId: string, deletedCards: ICard[], deletedTasks: IKanbanTask[]) {
    dispatch(kanbanSlice.actions.deleteBoard(deletedBoardId))
    deleteFromFirestoreDocument('boards', deletedBoardId)
    await Promise.all(deletedCards.map(card => deleteFromFirestoreDocument('cards', card.id)))
    await Promise.all(deletedTasks.map(task => deleteFromFirestoreDocument('kanbanTasks', task.id)))
}