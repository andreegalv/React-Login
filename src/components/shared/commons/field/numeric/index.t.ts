import { ITextFieldProps } from "../textfield/index.t";

export interface INumericFieldProps extends Omit<ITextFieldProps, "value" | "defaultValue" | "onChange" | "inputType"> {
    value?: number,
    defaultValue?: number,
    maxPrecision?: 0 | 1 | 2 | 3 | 4,
    maxLength?: number,
    onChange?: (event?:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, value?: number) => void
}