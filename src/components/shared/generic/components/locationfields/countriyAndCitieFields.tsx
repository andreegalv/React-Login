import React, { memo, useContext, useMemo, useRef, useState } from "react";
import { IComboBoxItem } from "src/components/shared/commons/combobox/index.t";
import GridColumn from "src/components/shared/commons/grid/gridcolumn";
import { ICountryAndCities } from "src/components/shared/commons/models/definition";
import FormCountryComboBox from "../../fields/countrycombobox/form";
import FormComboBox from "src/components/shared/commons/form/fields/formcombobox";
import { useTranslate } from "src/components/shared/commons/text/translate";
import { isStringNotEmpty } from "src/utils/utils";
import { FormContext } from "src/components/shared/commons/form/context";

interface ICountryAndCitiesFieldsProps {
	countries: ICountryAndCities[],
	defaultCountryId?:string,
	defaultCountryCityId?:string
}
const CountryAndCityFieldsMemo = memo((props:ICountryAndCitiesFieldsProps) => {
	const { countries } = props;
	const formContext = useContext(FormContext);
	const [setTranslated] = useTranslate();
	const { current: labels } = useRef({
		countryCity: {
			label: setTranslated({ namespace: "common", value: "city" })
		}
	});

	const countryOptions = useMemo(() => {
		return countries?.map((r) => ({
			label: r.description,
			id: r.id,
		})) || [];
	}, [countries]);
	const { current: defaultCountry } = useRef(props.defaultCountryId ? countryOptions.find((r) => r.id === props.defaultCountryId) : null);
	const [countrySelected, setCountrySelected] = useState<IComboBoxItem>(defaultCountry);

	const cityOptions = useMemo(() => {
		if (!isStringNotEmpty(countrySelected?.id)) return [];

		return countries?.find((r) => r.id === countrySelected.id)?.cities?.map((r) => ({
			label: r.description,
			id: r.id,
		})) || [];
	}, [countrySelected, countries]);	
	const { current: defaultCountryCity } = useRef<IComboBoxItem>(props.defaultCountryCityId ? cityOptions.find((c) => c.id === props.defaultCountryCityId) : null);
	const [countryCitySelected, setCountryCitySelected] = useState<IComboBoxItem>(defaultCountryCity);

	return (
		<GridColumn>
			<FormCountryComboBox
				countries={countries}
				defaultValue={defaultCountry}
				onClear={() => {
					setCountrySelected(null);
					setCountryCitySelected(null);
					formContext.setFieldValue("countryCityId", "");
				}}
				onSelect={(_, value) => {
					setCountrySelected(value);
					setCountryCitySelected(null);
					formContext.setFieldValue("countryCityId", "");
				}}
			/>
			<FormComboBox
				label={labels.countryCity.label}
				name="countryCityId"
				onClear={() => {
					setCountryCitySelected(null);
				}}
				onSelect={(_, value) => {
					setCountryCitySelected(value);
				}}
				options={cityOptions}
				value={countryCitySelected}
			/>
		</GridColumn>
	);
},
() => true);

CountryAndCityFieldsMemo.displayName = "CountryAndCityFieldsMemo";

const CountryAndCityFields = CountryAndCityFieldsMemo;
export default CountryAndCityFields;