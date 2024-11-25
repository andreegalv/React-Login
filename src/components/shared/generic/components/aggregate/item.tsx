import { Paper, useTheme } from "@mui/material";
import React from "react";
import Box from "src/components/shared/commons/box";
import IconButton from "src/components/shared/commons/iconbutton";

export type IAggregateItem = unknown;

interface IAggregateItemProps {
    item: IAggregateItem,
    index: number,
	isNew?: boolean,
	isSoftDeleted?:boolean,
    onRender: (params: { item: IAggregateItem, index: number, isNew?:boolean }) => React.ReactNode,
	onRemove: (params: { item: IAggregateItem, index: number, isNew?:boolean }) => void
}
const AggregateItem = (props:IAggregateItemProps) => {
	const { onRender, item, index } = props;
	const theme = useTheme();

	return (
		<Paper className="aggregate-item" elevation={3} sx={{position: "relative", padding: "12px" }}>
			<IconButton
				color="error"
				iconFontSize="small"
				name="cancel"
				onClick={() => props.onRemove({item, index, isNew: props.isNew})}
				sx={{
					position: "absolute",
					left: "-13px",
					top: "-2px",
					backgroundColor: "white",
					border: "1px solid",
					borderColor: theme.palette.grey["300"],
				}}
				tooltip="Eliminar registro"
			/>
			<Box className="render" sx={{opacity: props.isSoftDeleted ? "0.3" : 1}}>
				{onRender({item, index})}
			</Box>
		</Paper>
	);
};

export default AggregateItem;