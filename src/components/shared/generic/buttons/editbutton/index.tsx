import React, { useRef } from "react";
import EditIcon from "src/components/shared/commons/icon/editicon";
import Button, { IButtonProps } from "src/components/shared/commons/button";

export interface IEditButtonProps extends Omit<IButtonProps, "startIcon"> {
    useIcon?: boolean,
    useLabel?: boolean
}

const EditButton = (props:IEditButtonProps) => {
	const labelRef = useRef({ns: "common", value: "general.edit" });
	return (
		<Button
			{...props}
			startIcon={props.useIcon ? <EditIcon /> : undefined}
			title={props.useLabel ? labelRef.current : null}
		/>
	);
};

export default EditButton;