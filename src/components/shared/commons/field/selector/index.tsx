import React from "react";
import { FormControl, InputLabel, OutlinedInput, Select } from "@mui/material";
import { ISelectorProps } from "./index.t";
import { useText } from "../../text";
import { useIdRef } from "../../utils/ids";
import SelectorOptions from "./selectorOptions";

const Selector = (props:ISelectorProps) => {
	const labelIdRef = useIdRef({ id: "labelSelector" });
	const selectorIdRef = useIdRef({ id: "buttonSelector" });
	const LabelComponent = useText({ label: props.title });

	return (
		<FormControl
			className="selector-field-container"
			error={props.isError}
			fullWidth
			margin="normal"
			sx={{
				width: "100%",
				".MuiPaper-root .selector-loading-item": {
					display: "flex",
					placeContent: "center",
					placeItems: "center",
					fontSize: "small",
					"> .MuiCircularProgress-root": {
						width: "26px !important",
						height: "26px !important"
					}
				}
			}}
		>
			<InputLabel id={labelIdRef.current} shrink>
				{LabelComponent}
			</InputLabel>
			<Select
				MenuProps={{
					PaperProps: {
						style: {
						  maxHeight: 48 * 4.5 + 8
						},
					  },
				}}
				defaultValue={props.defaultValue ?? ""}
				displayEmpty={!!props.placeholder}
				id={selectorIdRef.current}
				input={<OutlinedInput />}
				label={LabelComponent}
				labelId={labelIdRef.current}
				onChange={props.onChange}
				renderValue={(selected) => {
					if (!selected) {
						return <em>{props.placeholder}</em>;
					}

					return selected as React.ReactNode;
				}}
			>
				<SelectorOptions options={props.options} placeholder={props.placeholder} showLoading={props.showLoading} />
			</Select>
		</FormControl>
	);
};

export default Selector;

/*
{


const LoadingItem = () => {
	return (
		<MenuItem
			value=""
			disabled>
			<LoadingIcon />
			<Text label={{ns: "common", value: "general.loadingDataPleaseWait"}} />
		</MenuItem>
	);
};


					props.showLoading ? 
						<LoadingItem />
						:
						<>
							<MenuItem
								value="">
								<Text label={{ns: "common", value: "general.comboSelect"}} />
							</MenuItem>
							{options}
						</>
				}


*/