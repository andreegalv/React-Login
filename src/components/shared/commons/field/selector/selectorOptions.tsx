import React, { memo, useMemo } from "react";
import { ISelectorMenuItem } from "./index.t";
import { isStringNotEmpty } from "src/utils/utils";
import Text from "../../text";
import { ITextLabel } from "../../text/index.t";
import { MenuItem } from "@mui/material";
import { LoadingIcon } from "../../icon/animations/loading";

interface ISelectorOptionsProps {
	placeholder?:string | React.ReactNode,
    options:ISelectorMenuItem[],
	showLoading?:boolean
}
const SelectorOptionsMemoized = memo((props:ISelectorOptionsProps) => {
	const options = useMemo(() => {
		return props.options?.map(option => {
			let TitleComponent = null;
			if (isStringNotEmpty(option.title)) {
				TitleComponent = option.title;
			}
			else {
				TitleComponent = <Text label={option.title as ITextLabel} />;
			}

			return (
				<MenuItem key={option.key} onClick={option.onClick}>
					{TitleComponent}
				</MenuItem>
			);
		});
	}, [props.options]);

	const PlaceholderItem = useMemo(() => {
		let placeholder = props.placeholder;
		if (props.showLoading) {
			placeholder = (
				<div className="selector-loading-item">
					<LoadingIcon sx={{mr: "10px"}} />
					<Text label={{ns: "common", value: "general.loadingDataPleaseWait"}} />
				</div>
			);
		}

		if (!placeholder) {
			return null;
		}
		return (
			<MenuItem disabled>
				{placeholder}
			</MenuItem>
		);
	}, [props.showLoading, props.placeholder]);

	return (
		<>
			{PlaceholderItem}
			{options}
		</>
	);
});

SelectorOptionsMemoized.displayName = "SelectorOptionsMemoized";

const SelectorOptions = SelectorOptionsMemoized;
export default SelectorOptions;