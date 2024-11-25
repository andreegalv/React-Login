import React, { memo, useRef } from "react";
import { IObservationField } from "./index.t";
import FormTextField from "src/components/shared/commons/form/fields/formtextfield";

const FormObservationFieldMemoized = memo((props:IObservationField) => {
	const labelRef = useRef({ ns: "common", value: "observation"});
	return (
		<FormTextField
			name="observation"
			{...props}
			// Error, see ticket https://github.com/mui/base-ui/issues/167
			//multiline
			//rows={4}
			inputType="default"
			label={labelRef.current}
		/>
	);
});

FormObservationFieldMemoized.displayName = "FormObservationFieldMemoized";

const FormObservationField = FormObservationFieldMemoized;
export default FormObservationField;