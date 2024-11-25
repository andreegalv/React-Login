import React, { useMemo, useRef } from "react";
import ComboBox from "src/components/shared/commons/combobox";
import { IComboBoxItem, IComboBoxProps } from "src/components/shared/commons/combobox/index.t";
import { ICountry } from "src/components/shared/commons/models/definition";
import { ITextLabel } from "src/components/shared/commons/text/index.t";

export interface ICountryComboBoxProps extends Omit<IComboBoxProps, "label" | "defaultValue" | "options"> {
    countries: ICountry[],
    defaultValue?: string | IComboBoxItem
}

export const useOptions = (props:ICountryComboBoxProps) => {
	const options = useMemo(() => {
		return props.countries.map<IComboBoxItem>((country) => ({
			id: country.id,
			label: country.description
		}));
	}, [props.countries]);
	const { current: defaultValue } = useRef(props.defaultValue ? typeof props.defaultValue === "string" ? options.find(o => o.id === props.defaultValue) : props.defaultValue : undefined);
	const { current: label } = useRef<ITextLabel>({ ns: "common", value: "country" });
	return { ...props, options, defaultValue, label };
};

const CountryComboBox = (props:ICountryComboBoxProps) => {
	const params = useOptions(props);

	return (
		<ComboBox
			{...params}
		/>
	);
};

export default CountryComboBox;