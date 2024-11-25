import React from "react";
import { styled, SxProps, Theme } from "@mui/material";
import { useNumericStyleSx } from "../field/numeric";
import { mergeSx } from "merge-sx";

interface INumberSpanProps {
	className?:string,
	component?: "div" | "span",
    children?:React.ReactNode,
}

interface INumberTextProps {
    children?:React.ReactNode,
	component?: INumberSpanProps["component"],
	sx?: SxProps<Theme>
}

const NumberSpan = (props:INumberSpanProps) => {
	if (props.component === "div") {
		return (
			<div className={props.className}>
				{props.children}
			</div>
		);
	}

	return (
		<span className={props.className}>
			{props.children}
		</span>
	);
};
const NumberSpanStyled = styled(NumberSpan)({});

const NumberText = (props:INumberTextProps) => {
	const styleSx = useNumericStyleSx();
	return <NumberSpanStyled {...props} sx={mergeSx(styleSx, props.sx ?? {})} />;
};

export default NumberText;