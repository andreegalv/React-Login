import React from "react";

export interface IDialogCallbackProps {
    closeDialog:() => void,
    setDisabled:(disabled:boolean) => void
}

export interface IDialogConfirmParameters {
    title?:React.ReactNode,
    message?:React.ReactNode,
    onConfirm?:(props:IDialogCallbackProps) => void,
}
export type IDialogConfirmFunction = (props?:IDialogConfirmParameters) => void
export type IDialogDeleteFunction = (props?:Pick<IDialogConfirmParameters, "message" | "onConfirm">) => void;

interface IDialogPromptParameters {
    element: (props?:{ closeDialog: () => void }) => React.ReactNode
}
export type IDialogPromptFunction = (props:IDialogPromptParameters) => void

export interface IDialogProviderContextProps {
    setConfirmDialog?: IDialogConfirmFunction,
    setDeleteDialog?: IDialogDeleteFunction,
    setPromptDialog?:IDialogPromptFunction
}

export interface IDialogProviderProps {
    children?: React.ReactNode;
}