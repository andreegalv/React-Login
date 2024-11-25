import React, { memo, useRef } from "react";
import FormTextField from "src/components/shared/commons/form/fields/formtextfield";
import { IBaseTextFieldProps } from "src/components/shared/commons/field/textfield/index.t";

interface IDescriptionFieldProps extends IBaseTextFieldProps {
	name?:string | "description",
	insideForm?:boolean,
}

const FormDescriptionFieldMemoized = memo((props:IDescriptionFieldProps) => {
	const labelRef = useRef({ns: "common", value: "description"});
	return (
		<FormTextField
			{...props}
			inputType="default"
			label={labelRef.current}
			name={props.name ?? "description"}
		/>
	);
});

FormDescriptionFieldMemoized.displayName = "FormDescriptionFieldMemoized";
const FormDescriptionField = FormDescriptionFieldMemoized;

export default FormDescriptionField;