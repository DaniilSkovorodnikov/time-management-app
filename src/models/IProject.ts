export interface IProject{
    name: string,
    id: number,
    type: ProjectTypes,
}

export interface IList{
    name: string,
    id: number,
    parentProjectId: number
}

export enum ProjectTypes{
    Today,
    Incoming,
    Custom
}

export const TodayProject: IProject = {
    name: 'Сегодня',
    id: -1,
    type: ProjectTypes.Today
}

export const IncomingProject: IProject = {
    name: 'Все задачи',
    id: -2,
    type: ProjectTypes.Incoming
}