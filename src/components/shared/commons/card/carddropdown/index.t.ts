import { ICardProps } from "../index.t";

export interface ICardItemProps extends ICardProps {
    key?:string | number,
}

export interface ICardDropdownProps {
    defaultSelectedIndex?:number,
    items:ICardItemProps[]
}