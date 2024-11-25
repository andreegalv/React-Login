import { createAction } from "../common";
import { IReceivedMessage } from "./types";

export const RECEIVED_MESSAGE = "RECEIVED_MESSAGE";
export const setReceivedMessageSuccess = createAction<IReceivedMessage>(RECEIVED_MESSAGE);