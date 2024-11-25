import { createAction } from "@reduxjs/toolkit";
import { ISetContentTitleDescriptionPayload } from "./interfaces";

export const SET_CONTENT_TITLE_DESCRIPTION = "SET_CONTENT_TITLE_DESCRIPTION";
export const setContentTitleDescriptionSuccess = createAction<ISetContentTitleDescriptionPayload>(SET_CONTENT_TITLE_DESCRIPTION);