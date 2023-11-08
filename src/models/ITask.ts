export interface ITask{
    name: string,
    description: string,
    projectId: number | null,
    sectionId: number | null,
    executionPeriod: string,
    id: number
}