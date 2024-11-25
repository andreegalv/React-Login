import React, { memo, useRef } from "react";
import FormComboBox from "src/components/shared/commons/form/fields/formcombobox";
import { IFormComboBoxBase } from "src/components/shared/commons/form/fields/formcombobox/index.t";

const RegionComboBoxMemoized = memo((props:IFormComboBoxBase) => {
	const labelRef = useRef({ns: "common", value: "location.region"});

	return (
		<FormComboBox
			id={props.id}
			label={labelRef.current}
			name="regionId"
			{...props}
		/>
	);
});

RegionComboBoxMemoized.displayName = "RegionComboBoxMemoized";

const RegionComboBox = RegionComboBoxMemoized;
export default RegionComboBox;