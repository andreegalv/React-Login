import React, { memo, MouseEventHandler } from "react";
import { Typography as MuiTypography, TypographyOwnProps } from "@mui/material";
import _ from "lodash";

export interface ITypographyProps {
    variant?: TypographyOwnProps["variant"],
    component?: "div" | "h1" | "span",
    children?:React.ReactNode,
    sx?:TypographyOwnProps["sx"],
    onClick?: MouseEventHandler<HTMLElement>,
    noWrap?:boolean,
	className?:string
}

const TypographyMemo = memo((props:ITypographyProps) => {
	return (
		<MuiTypography
			{..._.pick(props, [ "className" ])}
			component={props.component}
			noWrap={props.noWrap ?? false}
			onClick={props.onClick}
			sx={props.sx ?? {}}
			variant={props.variant ?? "body1"}
		>
			{props.children}
		</MuiTypography>
	);
});

TypographyMemo.displayName = "TypographyMemo";

const Typography = TypographyMemo;
export default Typography;