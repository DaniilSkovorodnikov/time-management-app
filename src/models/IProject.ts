export interface IProject{
    name: string,
    id: string,
    type: ProjectTypes,
}

export interface IList{
    name: string,
    id: string,
    projectId: string
}

export interface ProjectOption{
    label: string,
    value: string | null
}

export interface SectionOption{
    label: string,
    value: string | null
}

export enum ProjectTypes{
    Today,
    Incoming,
    Custom
}

export const TodayProject: IProject = {
    name: 'Сегодня',
    id: '-1',
    type: ProjectTypes.Today
}

export const IncomingProject: IProject = {
    name: 'Все задачи',
    id: '-2',
    type: ProjectTypes.Incoming
}