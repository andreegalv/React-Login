import React, { memo, useRef } from "react";
import { ITextFieldProps } from "src/components/shared/commons/field/textfield/index.t";
import FormTextField from "src/components/shared/commons/form/fields/formtextfield";

export type IFormNameFieldProps = Omit<ITextFieldProps, "label" | "inputType"> 

const FormNameFieldMemoized = memo((props:IFormNameFieldProps) => {
	const labelRef = useRef({ns: "common", value: "name"});
	return (
		<FormTextField
			name="name"
			{...props}
			inputType="default"
			label={labelRef.current}
		/>
	);
});

FormNameFieldMemoized.displayName = "FormNameFieldMemoized";
const FormNameField = FormNameFieldMemoized;
export default FormNameField;