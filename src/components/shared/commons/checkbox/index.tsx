import React from "react";
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText } from "@mui/material";

export type ICheckboxChangeEventHandler = (evt: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
export type ICheckboxFocusEventHandler = (evt: React.FocusEvent<HTMLButtonElement>) => void;

export interface ICheckboxProps {
    defaultChecked?:boolean,
    name?:string,
    label?:string,
    isError?:boolean,
    helperText?:string,
    disabled?:boolean,
    onChange?:ICheckboxChangeEventHandler
}

const CheckBox = (props:ICheckboxProps) => {
	const checkboxProps = {
		name: props.name,
		defaultChecked: props.defaultChecked,
		onChange: props.onChange
	};

	const CheckboxComponent = (
		props.label ? (
			<FormGroup>
				<FormControlLabel control={<Checkbox {...checkboxProps} color="primary" />} label={props.label} />
			</FormGroup>
		) : (
			<Checkbox color="primary" {...checkboxProps} />
		)
	);

	return (
		<FormControl component="fieldset" disabled={props.disabled} error={props.isError} sx={{padding: "0 15px"}}>
			{CheckboxComponent}
			<FormHelperText>{props.helperText}</FormHelperText>
		</FormControl>
		
	);
};

export default CheckBox;