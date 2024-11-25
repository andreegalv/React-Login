import { IAction } from "../common";

export interface ILoadingState {
    loadingScreenBlockingCount: number
}

export interface IActionReducer extends IAction {
	payload?:unknown | BlockingLoadingScreenPayload
}

export type BlockingLoadingScreenPayload = "+" | "-";