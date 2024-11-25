import React, { memo, useRef } from "react";
import { IAddressFieldProps } from "./index.t";
import FormTextField from "src/components/shared/commons/form/fields/formtextfield";

const FormAddressFieldMemoized = memo((props:IAddressFieldProps) => {
	const labelRef = useRef({ns: "common", value: "location.address"});
	return (
		<FormTextField
			name="address"
			{...props}
			inputType="default"
			label={labelRef.current}
		/>
	);
});

FormAddressFieldMemoized.displayName = "FormAddressFieldMemoized";

const FormAddressField = FormAddressFieldMemoized;
export default FormAddressField;