import React, { useCallback, useRef, useState } from "react";
import Box from "src/components/shared/commons/box";
import AggregateItem, { IAggregateItem } from "./item";
import IconButton from "src/components/shared/commons/iconbutton";
import { useTranslate } from "src/components/shared/commons/text/translate";
import { useTheme } from "@mui/material";

const GetAggregateItemCollection = (renderChildren:Render, onRemoveCallback: RemoveCallback, values?:IAggregateItem[]) => {
	return values?.map((item, index) => ({
		itemIndex: index,
		render: (
			<AggregateItem
				index={index}
				item={item} key={`aggregate-item-${index}`}
				onRemove={onRemoveCallback}
				onRender={renderChildren}
			/>
		)
	}));
};

type RemoveCallback = (params: { item: IAggregateItem, index: number, isNew?:boolean }) => void;

type Render = (props: {item:IAggregateItem, index:number}) => React.ReactNode;
interface IAggregateProps {
    initialItems?: IAggregateItem[],
    start?:number,
	max?:number,
    children?: Render,
	onRemove?: (params: { item: IAggregateItem, index: number, isNew?:boolean }) => boolean | undefined,
	onInsert?: () => void
}
const Aggregate = (props: IAggregateProps) => {
	const { initialItems, children, onRemove } = props;
	const theme = useTheme();
	const [setTranslate] = useTranslate();
	const { current: titles } = useRef({
		add: {
			tooltip: setTranslate({ namespace: "common", value: "grid.addNewRegistry" })
		}
	});
	const OnRemoveCallback = useCallback((params: { item: IAggregateItem, index:number, isNew?:boolean }) => {
		const { index, isNew, item } = params;
		const shouldRemoveItem = onRemove?.({ item , index, isNew });
		setAggregateItems((items) => {
			const newItems = shouldRemoveItem ? items.filter(a => a.itemIndex !== index) : [...items];

			if (!shouldRemoveItem) {
				const itemIndex = newItems.findIndex(a => a.itemIndex === index);
				newItems[itemIndex] = {...newItems[itemIndex]};
				newItems[itemIndex].render = (
					<AggregateItem
						index={itemIndex}
						isSoftDeleted
						item={item}
						key={`aggregate-item-${itemIndex}`}
						onRemove={OnRemoveCallback}
						onRender={children}
					/>
				);
			}

			return newItems;
		});
	}, [children, onRemove]);

	const [AggregateItems, setAggregateItems] = useState<{itemIndex:number, render: React.ReactNode}[]>(
		GetAggregateItemCollection(children, OnRemoveCallback, initialItems) ?? 
		(props.start > 0 ? GetAggregateItemCollection(children, OnRemoveCallback, new Array(props.start).fill({})) : [])
	);

	return (
		<Box className="aggregate-container" sx={{position: "relative"}}>
			<Box className="aggregate-body" sx={{
				" > .aggregate-item": {
					":not(:last-child)": {
						marginBottom: "15px"
					}
				}
			}}>
				{AggregateItems.map(a => a.render)}
			</Box>
			<Box sx={{ position: "relative", height: "20px", borderBottom: "1px solid", borderBottomColor: theme.palette.grey["300"]}}>
				{!props.max || props.max <= 0 || props.max > AggregateItems.length ? <IconButton color="secondary" name="add-louped" onClick={() => {
					setAggregateItems((items) => [...items, { itemIndex: items.length, render: (
						<AggregateItem
							index={items.length}
							isNew={true}
							item={{}}
							key={`aggregate-item-${items.length}`}
							onRemove={OnRemoveCallback}
							onRender={children}
						/>
					)}]);
					props.onInsert?.();
				}} sx={{
					top: "4px",
					left: "50%",
					backgroundColor: "white",
					position: "absolute"
				}} tooltip={titles.add.tooltip} /> : null }
			</Box>
		</Box>
	);
};

export default Aggregate;