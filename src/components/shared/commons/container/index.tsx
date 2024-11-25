import React from "react";
import { Container as MuiContainer, SxProps, Theme, ContainerOwnProps } from "@mui/material";

export interface IContainerProps {
    className?:string,
    children?:React.ReactNode,
	sx?: SxProps<Theme>,
	maxWidth?: ContainerOwnProps["maxWidth"]
}

const Container = (props:IContainerProps) => {
	return (
		<MuiContainer
			className={`root-container ${props.className ?? ""}`.trim()}
			maxWidth={props.maxWidth ?? false}
			sx={props.sx}
		>
			{props.children}
		</MuiContainer>
	);
};

export default Container;