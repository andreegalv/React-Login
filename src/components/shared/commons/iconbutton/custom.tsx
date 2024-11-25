import React from "react";
import { IIconButtonProps } from "./index.t";
import { useIconButton } from ".";

interface ICustomIconButtonProps extends Omit<IIconButtonProps, "name"> {
    children?: React.ReactNode
}

const CustomIconButton = (props:ICustomIconButtonProps) => {
	const IconButtonComponent = useIconButton(props);
	return IconButtonComponent;
};

export default CustomIconButton;