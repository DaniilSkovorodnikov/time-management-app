export interface IBoard{
    name: string,
    id: string
}

export interface ICard{
    name: string,
    id: string,
    boardId: string
}

export interface IKanbanTask{
    name: string,
    cardId: string,
    id: string,
    orderInCard: number
}

export interface TaskDragProps{
    updatedTasks: IKanbanTask[]
}