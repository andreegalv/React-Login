import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import IconButton from "../../commons/iconbutton";
import { IColumn } from "../../commons/table/index.t";
import { Popover } from "@mui/material";
import Box from "../../commons/box";
import MemoFilterField from "./filters/memoFilterField";

export type ColumnFilterSearchType = "contains" | "eq";
type ColumnFilters = { id: string, value: unknown, operator:ColumnFilterSearchType }[];
interface IGlobalFilterManagerIconProps {
    columns:IColumn<unknown>[],
    onChangeColumnFilters?: (filters?: {id:string, value:unknown}[]) => void
}
const GlobalFilterManagerIconMemo = memo((props:IGlobalFilterManagerIconProps) => {
	const isMountedRef = useRef(false);
	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
	const [columnFilters, setColumnFilters] = useState<ColumnFilters>([]);

	const { onChangeColumnFilters } = props;
	useEffect(() => {
		if (!onChangeColumnFilters || !isMountedRef.current) {
			return;
		}

		onChangeColumnFilters(columnFilters);
	}, [columnFilters, onChangeColumnFilters]);
	useEffect(() => {
		isMountedRef.current = true;
	}, []);

	const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	}, []);

	const handleClose = useCallback(() => {
		setAnchorEl(null);
	}, []);

	const open = Boolean(anchorEl);
	const id = open ? "globalFilterManagerIcon-button" : undefined;

	const ColumnFieldsComponent = useMemo(() => (
		props.columns?.map((c) => (
			<MemoFilterField
				filterColumnName={c.field}
				filterSelectOptions={c.filterSelectOptions}
				filterTitle={c.headerName}
				filterType={c.columnType}
				filterVariant={c.filterVariant}
				key={`column-filter-${c.field}`}
				onClearFilterValue={() => {
					setColumnFilters((prev) => {
						return prev.filter(p => p.id !== c.field);
					});
				}}
				onSetFilterValue={(params) => {
					setColumnFilters((prev) => {
						const { value, operator } = params;
						if (!prev.some(p => p.id === c.field)) {
							return [...prev, { id: c.field, value, operator }];
						}

						if (!params.value) {
							return prev.filter(p => p.id !== c.field);
						}

						return prev.map(p => p.id === c.field ? { id: c.field, value, operator } : p);
					});
				}}
			/>
		))
	), [props.columns]);

	return (
		<>
			<IconButton
				aria-describedby={id}
				badgeColor="error"
				badgeContent={columnFilters?.length}
				color="secondary"
				name="filter"
				onClick={handleClick}
			/>
			<Popover
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
				id={id}
				onClose={handleClose}
				open={open}
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
			 >
				<Box sx={{ padding: "5px 9px", width: "300px"}}>
					{ColumnFieldsComponent}
				</Box>
			</Popover>
		</>
	);
});

GlobalFilterManagerIconMemo.displayName = "GlobalFilterManagerIconMemo";
const GlobalFilterManagerIcon = GlobalFilterManagerIconMemo;

export default GlobalFilterManagerIcon;