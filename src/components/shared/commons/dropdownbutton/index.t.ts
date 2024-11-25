import { SxProps, Theme } from "@mui/material";
import { IButtonProps } from "../button/index.t";
import { ITextLabel } from "../text/index.t";

export interface IMenuItem {
    key: string,
    onClick?: React.MouseEventHandler<HTMLElement>,
    title: string | ITextLabel
}

export interface IDropdownButtonProps extends Omit<IButtonProps, "sx"> {
    classNames?: {
        root?:string
    },
    sxButton?: SxProps<Theme>,
    options?:IMenuItem[],
    hideEndIcon?:boolean
}