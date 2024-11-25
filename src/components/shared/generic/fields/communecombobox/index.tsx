import React, { memo, useRef } from "react";
import FormComboBox from "src/components/shared/commons/form/fields/formcombobox";
import { IFormComboBoxBase } from "src/components/shared/commons/form/fields/formcombobox/index.t";

const CommuneComboBoxMemoized = memo((props:IFormComboBoxBase) => {
	const labelRef = useRef({ns: "common", value: "location.commune"});

	return (
		<FormComboBox
			id={props.id}
			label={labelRef.current}
			name="communeId"
			{...props}
		/>
	);
});

CommuneComboBoxMemoized.displayName = "CommuneComboBoxMemoized";

const CommuneComboBox = CommuneComboBoxMemoized;
export default CommuneComboBox;