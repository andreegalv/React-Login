export enum WorkflowStatus {
    Waiting,
    InProgress,
    Finished
}

export enum WorkflowState {
    None,
    Success,
    Failure
}

export interface INotificationMessage {
    id?:string,
    type?:string,
    payload?:unknown,
}

export interface IWorkflowProgressNotificationMessage extends INotificationMessage {
    jobId?:string,
    title?:string,
    caption?:string,
    executionDate?:string,
    username?:string,
    progress?:number,
    status?:WorkflowStatus,
    state?:WorkflowState
}