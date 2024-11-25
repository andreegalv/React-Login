import { SvgIconOwnProps, SxProps, Theme } from "@mui/material";

export type MenuIconNames = 
    "none" | "move-down" | "menu" | "help" | "notifications" | "search" | "edit" | "edit-colored" | "vert-ellipsis" |
    "compare-arrow" | "home" | "mosaic" | "warehouse" | "local-shipping" | "arrow-back" | "arrow-right" | "arrow-down" | "arrow-up" |
    "boxes-colored" | "purchase" | "filter" | "filter-colored" | "add-louped" | "cancel" | "city-colored" | "prompt" |
    "check" | "checklist" | "playlist-add" | "collapse-arrow" | "expand-arrow" | "download";
export interface IIConProps extends IBaseIconProps {
    name: MenuIconNames
}

export interface IBaseIconProps {
    color?: "inherit" | "primary" | "secondary" | "error" | "success",
    fontSize?: SvgIconOwnProps["fontSize"],
    sx?: SxProps<Theme>
}