import React, { createContext, useMemo, useRef, useState } from "react";
import { isArrayNotEmpty, isString, isStringNotEmpty } from "src/utils/utils";
import ListSubheader from "@mui/material/ListSubheader";
import MuiList from "@mui/material/List";
import Typography from "../typography";
import { Collapse, ListItem as MuiListItem, ListItemButton, ListItemText, SxProps, Theme } from "@mui/material";
import Box from "../box";
import CollapseIcon from "../icon/collapseIcon";
import ExpandIcon from "../icon/expandIcon";
import { darken } from "../utils/colors";
import { mergeSx } from "merge-sx";
import { useIdRef } from "../utils/ids";

export const ListContext = createContext({
	dense: false,
	color: "transparent"
});

export interface IListItem {
	// eslint-disable-next-line react/no-unused-prop-types
	id:string,
	
	icon?: React.ReactNode,
    content?:React.ReactNode | string,
    items?:IListItem[],
    onClick?:() => void,
    disableTypography?: boolean,
	sx?: SxProps<Theme>,
}

interface IHeaderListItem {
    title:string | (() => React.ReactNode),
    id?:string,
    component?: "div"
}

interface IListItemProps extends IListItem {
	dense?:boolean,
    disablePadding?:boolean
}

const ListItem = (props:IListItemProps) => {
	const hasChildren = isArrayNotEmpty(props.items);
	
	const [isOpen, setOpen] = useState(false);
	const ListItemTextComponent = <ListItemText disableTypography={props.disableTypography ?? false} primary={props.content} />;

	const ExpandOrCollapseIconComponent = useMemo(() => {
		if (!hasChildren) {
			return null;
		}

		const Icon = isOpen ? <CollapseIcon /> : <ExpandIcon />;
		return (
			<Box sx={{ width: 24, display: "flex", placeContent: "center" }}>
				{Icon}
			</Box>
		);
	}, [hasChildren, isOpen]);

	const CollapseComponent = useMemo(() => {
		if (!hasChildren) return null;

		return (
			<Collapse in={isOpen} timeout="auto" unmountOnExit>
				<ListContext.Consumer>
					{({ dense, color }) => {
						const colorObject = isStringNotEmpty(color) && color !== "transparent" ? { backgroundColor: darken(color, 0.2) } : {};

						return (
							<List
								color={color}
								dense={dense}
								disablePadding={props.disableTypography}
								isInsideList
								items={props.items}
								sx={{ pl: 2, ...colorObject }}
							/>
						);
					}}
				</ListContext.Consumer>
			</Collapse>
		);
	}, [props.items, isOpen, hasChildren]);

	const IconComponent = !props.icon ? null : (
		<Box className="list-item-icon" sx={{ pr: 1 }}>
			{props.icon}
		</Box>
	);

	const className = `list-item ${!hasChildren ? "" : isOpen ? "opened" : "closed"}`.trim();

	if (hasChildren || props.onClick) {
		return (
			<>
				<ListItemButton
					className={className}
					onClick={() => {
						if (hasChildren) {
							setOpen(!isOpen);
						}
						props.onClick?.();
					}}
					sx={props.sx}
				>
					{IconComponent}
					{ListItemTextComponent}
					{ExpandOrCollapseIconComponent}
				</ListItemButton>
				{CollapseComponent}
			</>
		);
	}

	return (
		<>
			<MuiListItem
				className={className}
				dense={props.dense ?? false}
				disablePadding={props.disablePadding ?? false}
				sx={props.sx}
			>
				{IconComponent}
				{ListItemTextComponent}
				{ExpandOrCollapseIconComponent}
			</MuiListItem>
			{CollapseComponent}
		</>
	);
};

export interface IOwnListProps {
    items?:IListItem[],
    dense?: boolean,
    header?: IHeaderListItem,
    disablePadding?:boolean,
    sx?: SxProps<Theme>,
    color?:string
}

interface IListProps extends IOwnListProps {
	isInsideList?:boolean
}

const List = (props:IListProps) => {
	const listIdRef = useIdRef({ id: "list_" });
	const subListHeaderIdRef = useRef(listIdRef.current);
	const SubHeaderComponent = useMemo(() => {
		if (!props.header) {
			return null;
		}

		return (
			<ListSubheader component={props.header.component} id={subListHeaderIdRef.current} sx={{ p: 0 }}>
				<Typography component="span" variant="subtitle1">
					{ isString(props.header.title) ? props.header.title : props.header.title() }
				</Typography>
			</ListSubheader>
		);
	}, [props.header, subListHeaderIdRef]);
	const MuiListComponent = (
		<MuiList
			aria-labelledby={subListHeaderIdRef.current}
			dense={props.dense ?? false}
			disablePadding={props.disablePadding ?? false}
			subheader={SubHeaderComponent}
			sx={mergeSx(props.sx ?? {}, { pt: 0, pb: 0 })}
		>
			{props.items?.map((item) => (
				<ListItem
					key={`${listIdRef.current}_item_${item.id}`}
					{...item}
					dense={props.dense}
					disablePadding={props.disablePadding}
					disableTypography={item.disableTypography}
				/>
			))}
		</MuiList>
	);

	if (props.isInsideList) {
		return MuiListComponent;
	}

	return (
		<ListContext.Provider value={{
			dense: props.dense,
			color: props.color ?? "transparent"
		}}>
			{MuiListComponent}
		</ListContext.Provider>
	);
};

export default List;