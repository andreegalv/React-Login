import { IBaseComboBoxProps } from "../../../combobox/index.t";

export interface IFormComboBoxBase extends IBaseComboBoxProps {
    id?:string,
}

export interface IFormComboBox extends IFormComboBoxBase {
    name:string
}