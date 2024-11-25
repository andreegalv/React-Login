
import { DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import React, { useRef } from "react";
import { DEFAULT_MARGIN_TEXTFIELD, DEFAULT_SIZE_TEXTFIELD, DEFAULT_VARIANT_TEXTFIELD, DEFAULT_FULLWIDTH_TEXTFIELD, useDefaultSxTextField } from "../textfield";
import { SxProps, Theme } from "@mui/material";

export interface IDatePickerProps {
    label?:string,
    name?:string,
	views?: ("year" | "month" | "day")[],
	formatDensity?: "spacious" | "dense",
	defaultValue?:Dayjs,
	onChange?: (value:Dayjs) => void,
	disabled?:boolean,
	required?:boolean,
	value?:Dayjs
}

interface IDatePickerSlotProps {
	textField: {
		variant?: "outlined" | "filled",
		size?: "small",
		fullWidth?: boolean,
		InputLabelProps: { shrink: boolean },
		required?:boolean,
		margin?: "normal" | "dense" | "none",
		sx?: SxProps<Theme>
	},
	openPickerIcon?: {
		color?: "primary"
	},
	inputAdornment?: {
		position?: "start" | "end"
	}
}

const DatePickerField = (props:IDatePickerProps) => {
	const sxTextField = useDefaultSxTextField(props);
	const slotPropsRef = useRef<IDatePickerSlotProps>({
		textField: {
			size: DEFAULT_SIZE_TEXTFIELD,
			variant: DEFAULT_VARIANT_TEXTFIELD,
			fullWidth: DEFAULT_FULLWIDTH_TEXTFIELD,
			margin: DEFAULT_MARGIN_TEXTFIELD,
			InputLabelProps: { shrink: true },
			required: props.required ?? false,
			sx: sxTextField
		},
		openPickerIcon: props.disabled ? undefined : { color: "primary" },
		inputAdornment: { position: "end" }
	});

	return (
		<DatePicker
			className="datepicker-container"
			closeOnSelect
			defaultValue={props.defaultValue}
			disabled={props.disabled}
			formatDensity={props.formatDensity ?? "dense"}
			label={props.label}
			name={props.name}
			onChange={props.onChange}
			slotProps={slotPropsRef.current}
			sx={{ mt: 2, mb: 1 }}
			value={props.value}
			views={props.views}
		/>
	);
};


export default DatePickerField;