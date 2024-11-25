import React from "react";
import CircularProgress, { CircularProgressProps } from "@mui/material/CircularProgress";
import { SxProps, Theme } from "@mui/material";

interface ILoadingIconProps {
	size?:string | number,
	color?: CircularProgressProps["color"],
	sx?:SxProps<Theme>
}
export const LoadingIcon = (props:ILoadingIconProps) => {
	return (
		<CircularProgress color={props.color ?? "inherit"} size={props.size} sx={props.sx} />
	);
};