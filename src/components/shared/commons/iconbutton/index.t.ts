import { MouseEventHandler } from "react";
import { MenuIconNames } from "../icon/index.t";
import { ITextLabel } from "../text/index.t";
import { ITooltipProps } from "../tooltip";
import { SxProps, Theme } from "@mui/material";

export interface IIconButtonProps {
    id?:string,
    sx?: SxProps<Theme>,
    size?: "small" | "medium" | "large",
    className?:string,
    type?: "submit" | "reset" | "button" | undefined,
    name: MenuIconNames,
    onClick?:MouseEventHandler<HTMLButtonElement>,
    active?: boolean,
    tooltip?: string | ITextLabel,
    iconFontSize?: "inherit" | "small",
    tooltipPlacement?: ITooltipProps["placement"],
    color?: "default" | "inherit" | "primary" | "secondary" | "error" | "success",
    bordered?:boolean,
    badgeContent?: number,
    badgeColor?: "default" | "primary" | "error",
    disabled?:boolean,
    "aria-controls"?: string,
    "aria-expanded"?: boolean | "false" | "true",
    "aria-haspopup"?: "true"
}