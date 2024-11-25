import React, { memo } from "react";
import { IFormTextField } from "./index.t";
import { useFormikValues } from "../utils";
import TextField from "../../../field/textfield";

interface IMemoTextFieldProps extends IFormTextField {
    defaultValue?: string
}
const MemoFormTextField = memo((props:IMemoTextFieldProps) => {
	return (
		<TextField
			{...props}
		/>
	);
});
MemoFormTextField.displayName = "MemoFormTextField";

const FormTextField = (props:IFormTextField) => {
	const formikValues = useFormikValues(props);
	const isReadonly = formikValues.mode === "readonly";

	return (
		<MemoFormTextField
			{...props}
			defaultValue={formikValues.initialValue?.toString()}
			disabled={props.disabled ?? (isReadonly || formikValues.isDisabled)}
			helperText={formikValues.isError ? formikValues.errorMessage : props.helperText}
			isError={props.isError ?? formikValues.isError}
			onBlur={props.onBlur ?? formikValues.inputProps.onBlur}
			onChange={props.onChange ?? formikValues.inputProps?.onChange}
		/>
	);
};

export default FormTextField;