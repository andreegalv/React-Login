import React from "react";
import { IconButton as MuiIconButton } from "@mui/material";
import { IIconButtonProps } from "./index.t";
import Icon from "../icon";
import Tooltip from "../tooltip";
import Badge from "../badge";

interface IHookIconButtonProps extends Partial<IIconButtonProps> {
	children?:React.ReactNode
}

export const useIconButton = (props:IHookIconButtonProps) => {
	const IconComponent = props.children ?? (
		props.name && <Icon color={props.color === "default" ? "inherit" : props.color} fontSize={props.iconFontSize} name={props.name} />
	);

	const ComponentButton = (
		<MuiIconButton
			aria-controls={props["aria-controls"]}
			aria-expanded={props["aria-expanded"]}
			aria-haspopup={props["aria-haspopup"]}
			color={props.color ?? "default"}
			disabled={props.disabled ?? false}
			id={props.id}
			name={props.name}
			onClick={props.onClick}
			size={props.size ?? "small"}
			sx={props.sx}
			type={props.type ?? "button"}
		>
			{
				props.badgeContent ? (
					<Badge color={props.badgeColor ?? "default"} content={props.badgeContent}>
						{ IconComponent }
					</Badge>
				) : IconComponent
			}
		</MuiIconButton>
	);

	return ComponentButton;
};

const IconButton = (props:IIconButtonProps) => {
	const IconButtonComponent = useIconButton(props);
	if (props.tooltip) {
		return (
			<Tooltip placement={props.tooltipPlacement} title={props.tooltip}>
				{IconButtonComponent}
			</Tooltip>
		);
	}

	return IconButtonComponent;
};

export default IconButton;