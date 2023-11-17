export interface ITask{
    name: string,
    description: string,
    projectId: number | null | undefined,
    sectionId: number | null,
    executionPeriod: string,
    id: number
}