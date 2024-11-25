import React, { ChangeEvent } from "react";
import { ITextLabel } from "../../text/index.t";
import { InputBaseComponentProps, TextFieldProps } from "@mui/material";

export interface IBaseTextFieldProps {
    id?:string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    inputRef?:React.Ref<any>,
    disabled?:boolean,
    helperText?: string | ITextLabel,
    isError?:boolean,
    defaultValue?:string,
    value?:string,
    required?:boolean,
    fullWidth?:boolean,
    autoFocus?:boolean,
    type?: "text" | "password" | "number" | "email" | "tel",
    size?: "small" | "medium",
    inputLabelBehaviour?: "no-shrink" | "shrink" | "normal",
    placeholder?:string,
    autoComplete?: "current-password" | "username" | string,
    onChange?: (evt?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, value?:string) => void,
    onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
    inputType?: "default" | "only-letters" | "letter-spaces",
    slotProps?:TextFieldProps["slotProps"],
    comboBoxProps?: {
        InputProps?: TextFieldProps["slotProps"]["input"]
        InputLabelProps?: TextFieldProps["slotProps"]["inputLabel"]
        disabled?:boolean,
        fullWidth?:boolean
    },
    inputProps?: {
        startAdornment?: React.ReactNode,
        endAdornment?: React.ReactNode,
        inputComponent?: React.ElementType<InputBaseComponentProps>,
    },
    onKeyDown?:React.KeyboardEventHandler<HTMLDivElement>,
    multiline?:boolean,
    rows?:number,
    sx?:TextFieldProps["sx"],
    textAlign?: "left" | "right",
    name?:string,
}

export interface INameTextField {
    name?:string,
}

export interface ITextFieldProps extends IBaseTextFieldProps {
    name?:string,
    label?:string | ITextLabel,
}