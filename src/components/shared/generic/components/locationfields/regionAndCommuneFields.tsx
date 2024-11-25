import React, { memo, useContext, useMemo, useRef, useState } from "react";
import RegionComboBox from "../../fields/regioncombobox";
import CommuneComboBox from "../../fields/communecombobox";
import { IComboBoxItem } from "src/components/shared/commons/combobox/index.t";
import GridColumn from "src/components/shared/commons/grid/gridcolumn";
import { IAddressRegion } from "./index.t";
import { FormContext } from "src/components/shared/commons/form/context";

interface IRegionAndCommuneFieldsProps {
	regions: IAddressRegion[],
	defaultRegionId?:string,
	defaultCommuneId?:string
}
const RegionAndCommuneFieldsMemoized = memo((props:IRegionAndCommuneFieldsProps) => {
	const { regions } = props;
	const formContext = useContext(FormContext);
	
	const regionOptions = useMemo(() => {
		return regions?.map((r) => ({
			label: r.description,
			id: r.id,
		})) || [];
	}, [regions]);
	const { current: defaultRegionItem } = useRef(props.defaultRegionId ? regionOptions.find((r) => r.id === props.defaultRegionId) : null);
	const [regionSelected, setRegionSelected] = useState<IComboBoxItem>(defaultRegionItem);

	const communeOptions = useMemo(() => {
		if (!regionSelected?.id) return [];

		return regions?.find((r) => r.id === regionSelected.id)?.communes?.map((r) => ({
			label: r.description,
			id: r.id,
		})) || [];
	}, [regionSelected, regions]);
	const { current: defaultCommuneItem } = useRef<IComboBoxItem>(props.defaultCommuneId ? communeOptions.find((c) => c.id === props.defaultCommuneId) : null);
	const [communeSelected, setCommuneSelected] = useState<IComboBoxItem>(defaultCommuneItem);

	return (
		<GridColumn>
			<RegionComboBox
				defaultValue={defaultRegionItem}
				onClear={() => {
					setRegionSelected(null);
					setCommuneSelected(null);
					formContext.setFieldValue("communeId", "");
				}}
				onSelect={(_, value) => {
					setRegionSelected(value);
					setCommuneSelected(null);
					formContext.setFieldValue("communeId", "");
				}}
				options={regionOptions}
			/>
			<CommuneComboBox
				onClear={() => {
					setCommuneSelected(null);
				}}
				onSelect={(_, value) => {
					setCommuneSelected(value);
				}}
				options={communeOptions}
				value={communeSelected}
			/>
		</GridColumn>
	);
},
() => true);

RegionAndCommuneFieldsMemoized.displayName = "RegionAndCommuneFieldsMemoized";

const RegionAndCommuneFields = RegionAndCommuneFieldsMemoized;
export default RegionAndCommuneFields;