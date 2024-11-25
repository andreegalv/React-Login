import { createAction } from "../common";
import { ISetUserLogged, ISetUserProfileData, WebSocketStatus } from "./types";

export const SET_USER_LOGGED = "SET_USER_LOGGED";
export const setUserLoggedSuccess = createAction<ISetUserLogged>(SET_USER_LOGGED);

export const SET_USER_PROFILE_DATA = "SET_USER_PROFILE_DATA";
export const setUserProfileDataSuccess = createAction<ISetUserProfileData>(SET_USER_PROFILE_DATA);

export const SET_WEB_SOCKET_CONNECTION = "SET_WEB_SOCKET_CONNECTION";
export const setWebSocketConnection = createAction<WebSocketStatus>(SET_WEB_SOCKET_CONNECTION);