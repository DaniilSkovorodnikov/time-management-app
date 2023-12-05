export interface ITask{
    name: string,
    description: string,
    projectId: string | null | undefined,
    sectionId: string | null,
    executionPeriod: string,
    id: string
}