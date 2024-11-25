import React from "react";
import Grid from "..";
import Column, { IColumnProps } from "../../column";
import { SxProps, Theme } from "@mui/material";

interface IGridColumnProps {
	gridSize?: IColumnProps["size"],
	gridSpacing?: IColumnProps["spacing"],
	columnSizes?: IColumnProps["size"][]
    children?: React.ReactNode,
	sx?:SxProps<Theme>
}
const GridColumn = (props:IGridColumnProps) => {
	return (
		<Grid size={props.gridSize} spacing={props.gridSpacing} sx={props.sx}>
			{React.Children.map(props.children, (child:React.ReactElement, index) => (
				<Column size={props.columnSizes?.[index]}>
					{child}
				</Column>
			))}
		</Grid>
	);
};

export default GridColumn;