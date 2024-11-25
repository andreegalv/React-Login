import React, { memo } from "react";
import FormComboBox from "src/components/shared/commons/form/fields/formcombobox";
import { ICountryComboBoxProps, useOptions } from ".";

interface IFormCountryComboBoxProps extends ICountryComboBoxProps {
	name?: string | "countryId"
}

const FormCountryComboBoxMemoized = memo((props:IFormCountryComboBoxProps) => {
	const params = useOptions(props);

	return (
		<FormComboBox
			name="countryId"
			{...params}
		/>
	);
});

FormCountryComboBoxMemoized.displayName = "FormCountryComboBoxMemoized";
const FormCountryComboBox = FormCountryComboBoxMemoized;

export default FormCountryComboBox;