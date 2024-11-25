import { SelectChangeEvent } from "@mui/material/Select/SelectInput";
import { ITextLabel } from "../../text/index.t";
import { IMenuItem } from "../../dropdownbutton/index.t";
import { IFieldSize } from "../textfield/index.t";

export interface ISelectorMenuItem extends IMenuItem {
    value?: string | readonly string[] | number | undefined;
}

export interface ISelectorProps<T = unknown> {
    title?:string | ITextLabel,
    defaultValue?:T,
    onChange?:(evt:SelectChangeEvent<T>, child:React.ReactNode) => void,
    options?: ISelectorMenuItem[],
    size?:IFieldSize,
    showLoading?:boolean,
    placeholder?:string | React.ReactNode,
    isError?:boolean
}