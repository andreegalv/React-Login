import { Action, createAction as reduxCreateAction } from "@reduxjs/toolkit";

export const createAction = <T = unknown>(name?:string, prepareAction?: (args?:T) => ({ payload, meta })) => reduxCreateAction(name, prepareAction);

type MetaType = {
	loadingCounter?: "+" | "-"
}

export interface IAction extends Action {
	meta?:MetaType;
}