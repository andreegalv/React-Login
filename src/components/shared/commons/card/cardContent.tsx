import React from "react";
import { CardContent as MuiCardContent, SxProps, Theme } from "@mui/material";

export interface ICardContentProps {
    children?:React.ReactNode,
	sx?: SxProps<Theme>,
	
}

const CardContent = (props:ICardContentProps) => {
	return (
		<MuiCardContent className="card-content" sx={props.sx}>
			{props.children}
		</MuiCardContent>
	);
};

export default CardContent;