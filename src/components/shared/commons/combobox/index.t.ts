import { SyntheticEvent } from "react";
import { ITextLabel } from "../text/index.t";
export interface IComboBoxItem {
    id:string | number | boolean,
    label:string | React.ReactNode,
    group?:string
}

export const ComboBoxItemType = {
	Empty: { id: "<empty>", label: "" }
};

export interface IBaseComboBoxProps {
    label?:string | ITextLabel,
    options?:IComboBoxItem[],
    isError?:boolean,
    showLoading?:boolean,
    onBlur?: React.FocusEventHandler<HTMLElement>,
    onChange?: (event: React.SyntheticEvent<Element, Event>, value: unknown) => void
    onSelect?: (event?:SyntheticEvent<Element, Event>, value?:IComboBoxItem) => void,
    onClear?: (event?:SyntheticEvent<Element, Event>, value?:IComboBoxItem) => void,
    defaultValue?:IComboBoxItem,
    value?:IComboBoxItem,
    disabled?:boolean,
    required?:boolean,
    helperText?:string | ITextLabel,
    readOnly?:boolean,
    groupBy?:(option:IComboBoxItem) => string;
}

export interface IComboBoxProps extends IBaseComboBoxProps {
    id?:string,
    name?:string,
}