import React from "react";
import { GridBaseProps, Grid2 as MuiGrid, SxProps, Theme } from "@mui/material";
import { GridProps } from "@mui/material/Grid";

export interface IGridProps {
    className?:string,
    children?:React.ReactNode,
    spacing?: number,
	columns?: GridProps["columns"],
	sx?: SxProps<Theme>,
	size?: GridBaseProps["size"],
}

const Grid = (props:IGridProps) => {
	return (
		<MuiGrid
			className={`grid-row ${props.className ?? ""}`.trim()}
			columns={props.columns ?? 12}
			container
			size={props.size}
			spacing={props.spacing ?? 2}
			sx={props.sx}
		>
			{props.children}
		</MuiGrid>
	);
};

export default Grid;