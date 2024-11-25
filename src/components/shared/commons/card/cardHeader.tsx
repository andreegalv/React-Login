import React from "react";
import { CardHeader as MuiCardHeader, SxProps, Theme } from "@mui/material";
import Text from "../text";
import { ITypographyProps } from "../typography";

export interface ICardHeaderProps {
    title?:string,
    sx?: SxProps<Theme>,
	typography?: ITypographyProps
}

const CardHeader = (props:ICardHeaderProps) => {
	return (
		<MuiCardHeader
			className="card-header"
			disableTypography
			sx={props.sx}
			title={<Text label={props.title} typographyOptions={props.typography} />}
		/>
	);
};

export default CardHeader;