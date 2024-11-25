import React from "react";
import { Grid2 as Grid, GridBaseProps, SxProps, Theme } from "@mui/material";

export interface IColumnProps {
    children?:React.ReactNode,
    spacing?:number,
	size?: GridBaseProps["size"],
	sx?: SxProps<Theme>,
	display?: "flex",
	justifyContent?: "center",
	alignItems?: "center"
}

const Column = (props:IColumnProps) => {
	return (
		<Grid
			alignItems={props.alignItems}
			display={props.display}
			justifyContent={props.justifyContent}
			size={props.size ?? "grow"}
			spacing={props.spacing ?? 0}
			sx={props.sx}
		>
			{props.children}
		</Grid>
	);
};

export default Column;