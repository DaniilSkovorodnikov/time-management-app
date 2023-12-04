export interface IBoard{
    name: string,
    id: number
}

export interface ICard{
    name: string,
    id: number,
    boardId: number
}

export interface IKanbanTask{
    name: string,
    cardId: number,
    id: number
}