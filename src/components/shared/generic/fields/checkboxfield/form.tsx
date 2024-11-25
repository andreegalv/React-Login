import { isBoolean } from "lodash";
import React, { memo } from "react";
import CheckBox, { ICheckboxProps } from "src/components/shared/commons/checkbox";
import { useFormikValues } from "src/components/shared/commons/form/fields/utils";

export interface IFormCheckboxProps extends Omit<ICheckboxProps, "name"> {
    name: string
} 

const FormCheckboxMemoized = memo((props:IFormCheckboxProps) => {
	const formikValues = useFormikValues(props);
	const { setFieldValue } = formikValues.setters;
	const { onChange } = props;

	const isReadonly = formikValues.mode === "readonly";

	return (
		<CheckBox
			{...props}
			defaultChecked={isBoolean(formikValues.initialValue) ? formikValues.initialValue : undefined}
			disabled={props.disabled ?? (isReadonly || formikValues.isDisabled)}
			helperText={formikValues.isError ? formikValues.errorMessage : props.helperText}
			isError={props.isError ?? formikValues.isError}
			onChange={(evt, checked) => {
				setFieldValue(checked);
				onChange?.(evt, checked);
			}}
		/>
	);
});

FormCheckboxMemoized.displayName = "FormCheckboxMemoized";
const FormCheckbox = FormCheckboxMemoized;
export default FormCheckbox;