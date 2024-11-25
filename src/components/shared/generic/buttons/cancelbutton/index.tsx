import React, { useRef } from "react";
import Button, { IButtonProps } from "src/components/shared/commons/button";

export type ICancelButtonProps = Omit<IButtonProps, "variant">

const CancelButton = (props:ICancelButtonProps) => {
	const labelRef = useRef({ns: "common", value: "general.cancel" });
	return (
		<Button
			{...props}
			title={props.title ?? labelRef.current}
			variant="outlined"
		/>
	);
};

export default CancelButton;