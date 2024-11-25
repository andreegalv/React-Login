import React, { useRef } from "react";
import { Autocomplete } from "@mui/material";
import TextField from "../field/textfield";
import { IComboBoxItem, IComboBoxProps } from "./index.t";
import { useTranslate } from "../text/translate";
import { LoadingIcon } from "../icon/animations/loading";

const ComboBox = (props:IComboBoxProps) => {
	const [setTranslate] = useTranslate();
	const { current: labels } = useRef({
		comboSelect: setTranslate({namespace: "common", value: "general.comboSelect"})
	});

	if (props.disabled) {
		return (
			<TextField
				disabled={props.disabled ?? false}
				label={props.label ?? ""}
				name={props.name}
				required={props.required ?? false}
				value={typeof props.defaultValue?.label === "string" ? props.defaultValue.label : ""}
			/>
		);
	}

	const autoCompleteProps:{[key:string]:unknown} = { };
	if (props.id !== undefined && props.id !== null) {
		autoCompleteProps.id = props.id;
	}

	if (props.defaultValue !== undefined) {
		autoCompleteProps.defaultValue = props.defaultValue;
	}
	else if (props.value !== undefined) {
		autoCompleteProps.value = props.value;
	}

	return (
		<Autocomplete
			{...autoCompleteProps}
			className="combobox-container"
			clearOnEscape
			disablePortal
			disabled={props.disabled}
			groupBy={props.groupBy}
			isOptionEqualToValue={(prev, next) => prev?.id === next?.id}
			loading={props.showLoading}
			onBlur={props.onBlur}
			onChange={(event, value:IComboBoxItem, reason) => {
				switch(reason){
					case "selectOption":
						props.onSelect?.(event, value);
						break;
					case "clear":
						props.onClear?.(event);
						break;
					default:
						break;
				}
				if (props.onChange) {
					props.onChange(event, value);
				}
			}}
			options={props.options ?? []}
			readOnly={props.readOnly ?? false}
			renderInput={(params) => {
				let comboBoxProps = params;
				if (props.showLoading) {
					comboBoxProps = {
						...comboBoxProps,
						InputProps: {
							...comboBoxProps.InputProps,
							endAdornment: (
								<>
									<LoadingIcon size={20} />
									{comboBoxProps.InputProps.endAdornment}
								</>
							)
						}
					};
				}

				return (
					<TextField
						comboBoxProps={comboBoxProps}
						disabled={props.disabled ?? false}
						helperText={props.helperText}
						isError={props.isError ?? false}
						label={props.label ?? ""}
						name={props.name}
						placeholder={labels.comboSelect}
						required={props.required ?? false}
					/>
				);
			}}
		/>
	);
};

export default ComboBox;