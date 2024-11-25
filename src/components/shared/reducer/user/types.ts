import { IAction } from "../common";

export interface IUserState {
    user?:{
        name?:string
    },
    token?:string,
    isLogged:boolean,
    webSocket?: {
        status?:WebSocketStatus
    }
}

export interface ISetUserLogged { token?:string }
export interface ISetUserProfileData { name?:string }

export enum WebSocketStatus {
    none,
    connecting,
    connected,
    closed
}

export interface IActionReducer extends IAction {
	payload?:unknown | ISetUserLogged
}