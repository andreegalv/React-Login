import React, { useRef } from "react";
import { IBaseTextFieldProps } from "src/components/shared/commons/field/textfield/index.t";
import FormTextField from "src/components/shared/commons/form/fields/formtextfield";

type IPasswordFieldProps = IBaseTextFieldProps
const PasswordField = (props:IPasswordFieldProps) => {
	const labelRef = useRef({ns: "login", value: "password"});
	return (
		<FormTextField
			name="password"
			{...props}
			label={labelRef.current}
			type="password"
		/>
	);
};

export default PasswordField;