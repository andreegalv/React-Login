import { FormikErrors, FormikTouched } from "formik";
import React from "react";
import { TypeButtons } from "../button/index.t";
import { PaperOwnProps, SxProps, Theme } from "@mui/material";
import { AnySchema } from "yup";

export interface FormikValues {
    [field: string]: unknown;
}

export interface IFormValuesModel {
    values:FormikValues,
    errors:FormikErrors<FormikValues>,
    touched: FormikTouched<FormikValues>,
    inputProps: {
        onChange: React.ChangeEventHandler<HTMLElement>,
        onBlur: React.FocusEventHandler<HTMLElement>
    }
}

export interface IFormButtonRenderProps {
    type?:TypeButtons,
    className?:string,
    disabled?:boolean
}

interface OnSubmitCallbackProps {
    onError: (values?:FormikErrors<FormikValues>) => void,
    onGlobalError: (errors?:string[]) => void,
}
export type OnSubmitFormikFn = (values:FormikValues, props?:OnSubmitCallbackProps) => Promise<unknown>

export type FormMode = "create" | "edit" | "readonly"
export interface IBaseForm {
    mode?: FormMode
}

export interface IFormProps extends IBaseForm {
    initialValues: unknown,
    validationSchema: AnySchema,
    autoComplete?: "on" | "off",
    onSubmit:OnSubmitFormikFn,
    onCorrect?: () => void,
    onCancel?: React.MouseEventHandler<HTMLButtonElement>,
    children?: React.ReactNode,
    buttonProps?: {
        cancel?: {
            label?:string,
            visible?:boolean
        },
        submit?: {
            label?:string,
            visible?:boolean,
            onRender?:(props:IFormButtonRenderProps) => React.ReactNode
        }
    },
    elevation?: PaperOwnProps["elevation"],
    sx?: SxProps<Theme>
}