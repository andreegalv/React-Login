import React, { MouseEventHandler } from "react";
import { CardActions as MuiCardActions, SxProps, Theme } from "@mui/material";
import { MenuIconNames } from "../icon/index.t";
import IconButton from "../iconbutton";
import { ITextLabel } from "../text/index.t";

export interface IconAction {
    key: string,
    iconName?: MenuIconNames,
    tooltip?: string | ITextLabel,
	onClick?:MouseEventHandler<HTMLButtonElement>
}

export interface ICardActionsProps {
    leftActions?: IconAction[],
    sx?: SxProps<Theme>
}

const CardActions = (props:ICardActionsProps) => {
	return (
		<MuiCardActions className="card-actions"
			disableSpacing
			sx={props.sx}
		>
			{props.leftActions?.map((o) => (
				<IconButton key={o.key} name={o.iconName} onClick={o.onClick} tooltip={o.tooltip} />
			))}
		</MuiCardActions>
	);
};

export default CardActions;