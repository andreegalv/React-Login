import React from "react";
import { ButtonOwnProps, Button as MuiButton, SxProps, Theme } from "@mui/material";
import { ButtonColors, ButtonOnClickType, ButtonVariants, TypeButtons } from "./index.t";
import { useText } from "../text";
import { mergeSx } from "merge-sx";
import { ITextLabel } from "../text/index.t";

export interface IButtonProps {
    sx?: SxProps<Theme>,
    title?:string | ITextLabel,
    id?:string,
    onClick?:ButtonOnClickType,
    variant?: ButtonVariants,
    color?: ButtonColors,
    startIcon?:React.ReactNode;
    endIcon?:React.ReactNode;
    className?:string,
    fullWidth?:boolean,
    disabled?:boolean
    type?: TypeButtons,
    autoFocus?:boolean,
    innerComponentRef?:React.Ref<HTMLButtonElement>,
    children?:React.ReactNode,
    size?: ButtonOwnProps["size"]
}

const Button = (props:IButtonProps) => {
	const ButtonLabel = useText({ label: props.title });

	return (
		<MuiButton
			autoFocus={props.autoFocus}
			className={`"button-container" ${props.className ?? ""} ${ !ButtonLabel ? "no-label" : "" }`.trim()}
			color={props.color ?? "primary"}
			disableElevation
			disabled={props.disabled}
			endIcon={props.endIcon}
			fullWidth={props.fullWidth ?? false}
			id={props.id}
			onClick={props.onClick}
			ref={props.innerComponentRef}
			size={props.size ?? "medium"}
			startIcon={props.startIcon}
			sx={mergeSx(
				{ padding: "6px 12px"},
				props.sx ?? {},
				
			)}
			type={props.type ?? "button"}
			variant={props.variant ?? "contained"}
		>
			{props.children ?? ButtonLabel}
		</MuiButton>
	);
};

export default Button;