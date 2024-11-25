import React, { memo } from "react";
import { useFormikValues } from "../utils";
import NumericField from "../../../field/numeric";
import { INumericFieldProps } from "../../../field/numeric/index.t";

interface IMemoFormNumericField extends IFormNumericFieldProps {
    defaultValue?: number
}
const MemoFormNumericField = memo((props:IMemoFormNumericField) => {
	return (
		<NumericField
			{...props}
		/>
	);
});
MemoFormNumericField.displayName = "MemoFormNumericField";

export interface IFormNumericFieldProps extends Omit<INumericFieldProps, "defaultValue" | "onChange"> {
    name:string,
	onChange?: (event?:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, value?:number, submitValue?: () => void) => void
}
const FormNumericField = (props:IFormNumericFieldProps) => {
	const formikValues = useFormikValues(props);
	if (formikValues.initialValue && typeof formikValues.initialValue !== "number") {
		throw new Error(`Passing a number instead of a text in FormNumericField:${props.name}`);
	}

	const isReadonly = formikValues.mode === "readonly";

	return (
		<MemoFormNumericField
			{...props}
			defaultValue={formikValues.initialValue as number}
			disabled={props.disabled ?? (isReadonly || formikValues.isDisabled)}
			helperText={formikValues.isError ? formikValues.errorMessage : props.helperText}
			isError={props.isError ?? formikValues.isError}
			onBlur={props.onBlur ?? formikValues.inputProps?.onBlur}
			onChange={(event, value) => {
				if (props.onChange) {
					props.onChange(event, value, () => formikValues?.setters.setFieldValue(value));
					return;
				}
				
				formikValues?.setters?.setFieldValue(value);
			}}
		/>
	);
};

export default FormNumericField;