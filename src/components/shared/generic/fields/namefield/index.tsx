import React, { memo, useRef } from "react";
import { IBaseTextFieldProps } from "src/components/shared/commons/field/textfield/index.t";
import FormTextField from "src/components/shared/commons/form/fields/formtextfield";

export type INameFieldProps = IBaseTextFieldProps;

const NameFieldMemoized = memo((props:INameFieldProps) => {
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

NameFieldMemoized.displayName = "NameFieldMemoized";
const NameField = NameFieldMemoized;
export default NameField;