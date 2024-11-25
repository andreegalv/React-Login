import React from "react";
import { ITextLabel } from "../text/index.t";
import { ITooltipProps } from "../tooltip";

export interface IMenuItemProps {
    label?: string,
    icon?: React.ReactNode,
    divider?:boolean,
    onClick?: React.MouseEventHandler<HTMLLIElement>
}

export interface IMenuEllipsisProps {
    options:IMenuItemProps[],
    bordered?:boolean,
    tooltip?: string | ITextLabel,
    tooltipPlacement?: ITooltipProps["placement"]
}