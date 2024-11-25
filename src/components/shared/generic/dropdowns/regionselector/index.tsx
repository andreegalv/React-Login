import React from "react";
import Selector from "src/components/commons/field/selector";

const RegionSelector = () => {
	return (
		<Selector
			title={{ns: "common", value: "location.region"}}
		/>
	);
};

export default RegionSelector;