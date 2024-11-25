import React, { useMemo, useRef } from "react";
import MUITextField from "@mui/material/TextField";
import { ITextFieldProps } from "./index.t";
import { useText } from "../../text";
import { InputAdornment, InputLabelProps } from "@mui/material";
import { isKeyPassValidationForLetterAndSpaces, isKeyPassValidationForOnlyLetters } from "./utils";
import { mergeSx } from "merge-sx";

export const DEFAULT_SIZE_TEXTFIELD = "small";
export const DEFAULT_VARIANT_TEXTFIELD = "outlined";
export const DEFAULT_MARGIN_TEXTFIELD = "normal";
export const DEFAULT_FULLWIDTH_TEXTFIELD = true;

const getTextFileSize = (props: { size: "small" | "medium" }): "small" | "medium" => {
	if (props.size) {
		return props.size;
	}

	return DEFAULT_SIZE_TEXTFIELD;
};

export const useDefaultSxTextField = (props?:Pick<ITextFieldProps, "sx" | "disabled" | "textAlign">) => {
	const { sx } = props ?? {};
	const disabledSxStyleRef = useRef(mergeSx({
		"input.MuiInputBase-input": {
			textAlign: props?.textAlign ?? "left"
		}
	}));
	const sxStyleRef = useRef(mergeSx({
		".MuiFormLabel-root": {
			fontWeight: 600,
			color: "primary.main"
		},
		"input.MuiInputBase-input": {
			textAlign: props?.textAlign ?? "left"
		}
	}, sx ?? {}));

	return props?.disabled ? disabledSxStyleRef.current : sxStyleRef.current;
};

const TextField = (props:ITextFieldProps) => {
	const sizeRef = useRef(getTextFileSize({ size: props.size }));
	const sxStyle = useDefaultSxTextField(props);

	const Label = useText({ label: props.label, disableTypography: true });
	const HelperText = useText({ label: props.helperText, typographyProps: { variant: "caption" } });

	const inputLabelProps:Partial<InputLabelProps> = {};
	switch(props.inputLabelBehaviour){
		case "normal":
			break;
		case "no-shrink":
			inputLabelProps.shrink = false;
			break;
		default:
			inputLabelProps.shrink = true;
			break;
	}

	const textFieldProps: { value?:string, defaultValue?:string } = {};
	if (props.value !== undefined && props.value !== null) {
		textFieldProps.value = props.value;
	}
	else if (props.defaultValue) {
		textFieldProps.defaultValue = props.defaultValue;
	}

	const { InputProps, InputLabelProps, ...otherComboBoxProps} = props.comboBoxProps ?? {};

	const slotProps = useMemo(() => {
		return {
			inputLabel: InputLabelProps ? { shrink: inputLabelProps.shrink, ...InputLabelProps } : inputLabelProps,
			input: InputProps ?? {
				style: { textAlign: props.textAlign ?? "left" },
				startAdornment: props.inputProps?.startAdornment ? (
					<InputAdornment position="start">
						{props.inputProps.startAdornment}
					</InputAdornment>
				) : undefined,
				inputComponent: props.inputProps?.inputComponent,
				endAdornment: props.inputProps?.endAdornment ? 
					<InputAdornment position="end">
						{props.inputProps.endAdornment}
					</InputAdornment> : undefined
			}
		};
	}, [props.comboBoxProps, props.inputProps, inputLabelProps]);

	return (
		<MUITextField
			id={props.id}
			sx={sxStyle}
			{...textFieldProps}
			{...otherComboBoxProps}
			autoComplete={props.autoComplete}
			autoFocus={props.autoFocus}
			className="textfield-container"
			disabled={props.disabled}
			error={props.isError}
			fullWidth={props.fullWidth ?? DEFAULT_FULLWIDTH_TEXTFIELD}
			helperText={HelperText}
			inputRef={props.inputRef}
			label={Label}
			margin={DEFAULT_MARGIN_TEXTFIELD}
			multiline={props.multiline}
			name={props.name}
			onBlur={props.onBlur}
			onChange={(event) => {
				props.onChange?.(event, event.target.value);
			}}
			onKeyDown={(evt) => {
				props.onKeyDown?.(evt);
				if (!props.onKeyDown) {
					let preventEvent = false;
					switch(props?.inputType){
						case "only-letters":
							preventEvent = !isKeyPassValidationForOnlyLetters(evt.key);
							break;
						case "letter-spaces":
							preventEvent = !isKeyPassValidationForLetterAndSpaces(evt.key);
							break;
						case "default":
						default:
							break;
					}

					if (preventEvent) {
						evt.preventDefault();
						return;
					}
				}
			}}
			placeholder={props.placeholder}
			required={props.required}
			rows={props.rows}
			size={sizeRef.current}
			slotProps={slotProps}
			type={props.type ?? "text"}
			variant={DEFAULT_VARIANT_TEXTFIELD}
		/>
	);
};

export default TextField;