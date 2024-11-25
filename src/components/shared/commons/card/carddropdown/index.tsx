import React, { useMemo, useState } from "react";
import { ICardDropdownProps, ICardItemProps } from "./index.t";
import Card from "..";
import { isArrayNotEmpty } from "src/utils/utils";

const CardDropdown = (props:ICardDropdownProps) => {
	const [selectedIndex] = useState<number>(props.defaultSelectedIndex ?? 0);
	const CardSelected = useMemo(() => {
		if (!isArrayNotEmpty(props.items)) return null;
		
		const item = props.items[selectedIndex];

		return <Card key={item.key} {...item} />;
	}, [selectedIndex, props.items]);
	return (
		<div className="card-dropdown">
			{CardSelected}
		</div>
	);
};

export default CardDropdown;
export { ICardDropdownProps, ICardItemProps };