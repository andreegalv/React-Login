import React, { memo } from "react";
import RegionAndCommuneFields from "./regionAndCommuneFields";
import { ILocationFieldsProps } from "./index.t";
import AddressField from "../../fields/addressfield";
import GridColumn from "src/components/shared/commons/grid/gridcolumn";
import Box from "src/components/shared/commons/box";
import CountryAndCityFields from "./countriyAndCitieFields";

const LocationFieldsMemoized = memo((props:ILocationFieldsProps) => {
	if (!(props.useCountries || props.useRegions)) {
		throw new Error("You must provde countries or regions to use this component");
	}

	return (
		<Box className="location-container">
			{
				props.useCountries ? <CountryAndCityFields
					countries={props.countries}
					defaultCountryCityId={props.defaultCountryCityId}
					defaultCountryId={props.defaultCountryId}
				/> : null
			}
			{
				props.useRegions ? <RegionAndCommuneFields
					defaultCommuneId={props.defaultCommuneId}
					defaultRegionId={props.defaultRegionId}
					regions={props.regions}
				/> : null
			}
			<GridColumn>
				<AddressField />
			</GridColumn>
		</Box>
	);
});

LocationFieldsMemoized.displayName = "LocationFieldsMemoized";

const LocationFields = LocationFieldsMemoized;
export default LocationFields;