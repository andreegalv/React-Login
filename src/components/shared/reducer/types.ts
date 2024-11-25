import { IWorkflowProgressNotificationMessage } from "./workflow/types";

export interface ISharedState {
	project: IProjectState,
    workflow: IWorkflowState
}

export type IWorkflowState = IWorkflowProgressNotificationMessage[];

export interface IProjectState {
    customerId?: string,
    departmentId?: string,
    projectId?: string
}