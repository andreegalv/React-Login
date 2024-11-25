import { ITextFieldProps } from "../../../field/textfield/index.t";

export interface IFormTextField extends Omit<ITextFieldProps, "defaultValue" | "name"> {
    name:string
}