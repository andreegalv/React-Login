import React, { useRef } from "react";
import Button, { IButtonProps } from "src/components/shared/commons/button";

export interface IAddButtonProps extends IButtonProps {
    useIcon?: boolean
}

const AddButton = (props:IAddButtonProps) => {
	const labelRef = useRef({ns: "common", value: "general.add" });
	return (
		<Button
			{...props}
			title={props.title ?? labelRef.current}
		/>
	);
};

export default AddButton;