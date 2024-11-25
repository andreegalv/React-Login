import React, { useRef } from "react";
import Button, { IButtonProps } from "src/components/shared/commons/button";

export type IUpdateButtonProps = IButtonProps

const UpdateButton = (props:IUpdateButtonProps) => {
	const labelRef = useRef({ns: "common", value: "general.update" });
	return (
		<Button
			{...props}
			title={props.title ?? labelRef.current}
		/>
	);
};

export default UpdateButton;