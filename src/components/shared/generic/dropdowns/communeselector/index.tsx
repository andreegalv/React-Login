import React from "react";
import Selector from "src/components/commons/field/selector";

const CommuneSelector = () => {
	return (
		<Selector
			title={{ns: "common", value: "location.commune"}}
		/>
	);
};

export default CommuneSelector;