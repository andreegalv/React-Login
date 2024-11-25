import { createAction } from "../common";
import { IMessage } from "./types";

export const SET_SNACKBAR_MESSAGE = "SET_SNACKBAR_MESSAGE";
export const setSnackbarMessageSuccess = createAction<IMessage>(SET_SNACKBAR_MESSAGE);