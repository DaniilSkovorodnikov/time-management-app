export interface IBoard{
    name: string,
    id: number
}

export interface ISection{
    name: string,
    id: number,
    boardId: number
}