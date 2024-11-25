import { createAction } from "../common";
import { BlockingLoadingScreenPayload } from "./reducer.t";

export const SET_BLOCKING_LOADING_SCREEN = "SET_BLOCKING_LOADING_SCREEN";
export const setBlockingLoadingScreenSuccess = createAction<BlockingLoadingScreenPayload>(SET_BLOCKING_LOADING_SCREEN);