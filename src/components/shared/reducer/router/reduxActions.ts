import { createAction } from "@reduxjs/toolkit";
import { IChangeUrlPayload } from "./interfaces";

export const RETURN_ROUTE_URL = "@@RETURN_ROUTE_URL";
export const setReturnUrlSuccess = createAction(RETURN_ROUTE_URL);

export const CHANGE_ROUTE_URL = "@@CHANGE_ROUTE_URL";
export const setUrlSuccess = createAction<IChangeUrlPayload>(CHANGE_ROUTE_URL);