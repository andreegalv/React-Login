import React, { UIEvent, useCallback, useRef } from "react";
import { IDataTableProps } from "./index.t";
import { MRT_Row, MRT_RowVirtualizer, MRT_ShowHideColumnsButton, MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { useDataSource } from "./utils";
import { useTableDefinitions } from "../../commons/table/tabledef";
import MenuEllipsis from "../../commons/menuellipsis";
import KeyboardArrowDown from "../../commons/icon/keyboardarrowright";
import KeyboardArrowRight from "../../commons/icon/keyboardarrowdown";
import GlobalFilterManagerIcon from "./globalFilterManagerIcon";
import Box from "../../commons/box";
import ErrorTableDisplay from "./errorPages/errorTableDisplay";

const DataTable = <T, >(props:IDataTableProps<T>) => {
	const { customToolbarComponent } = props;
	const totalPerPageRef = useRef(100);
	const tableContainerRef = useRef<HTMLDivElement>(null);
  	const rowVirtualizerInstanceRef = useRef<MRT_RowVirtualizer>(null);
	const { columnsVisibility, commonTableProps, defaultSort } = useTableDefinitions<T>(props);

	const { hasMore, isLoading, isRefetching, lastLengthFetched, onNextCallback, rows, errorMessage,
		onSortingHandler, onColumnFilterHandler, sorting, onRemoveRow } = useDataSource(props, totalPerPageRef.current, defaultSort);

	const fetchMoreOnBottomReached  = useCallback((containerRefElement?: HTMLDivElement | null) => {
		if (containerRefElement) {
			const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
			if (hasMore && !(isLoading || isRefetching) && (lastLengthFetched === -1 || lastLengthFetched >= totalPerPageRef.current) && (scrollHeight - scrollTop - clientHeight < 400)) {
				onNextCallback();
			}
		}
	}, [hasMore, isLoading, isRefetching, lastLengthFetched, onNextCallback]);

	const TopActionButtons = (
		<Box className="extra-toolbar-buttons" sx={{ gap: "4px", display: "flex" }}>
			{customToolbarComponent}
		</Box>
	);

	const expandButtonPropsIcon = useCallback(({ row }: {row:MRT_Row<T>}) => {
		return { children: row.getIsExpanded() ? <KeyboardArrowDown color="primary" /> : <KeyboardArrowRight color="primary" /> };
	}, []);

	const table = useMaterialReactTable<T>({
		...commonTableProps,
		data: rows,
		renderToolbarInternalActions: ({ table }) => {
			const showFullToolbarActions = props.useToolbarButtons === undefined || props.useToolbarButtons === null;
			return (
				<Box>
					{showFullToolbarActions || props.useToolbarButtons?.includes("filter") ? <GlobalFilterManagerIcon columns={props.columns} onChangeColumnFilters={onColumnFilterHandler} /> : null}
					{
						showFullToolbarActions || props.useToolbarButtons?.includes("show-columns") ? (
							// eslint-disable-next-line react/jsx-pascal-case
							<MRT_ShowHideColumnsButton table={table} />
						) : null
					}
				</Box>
			);
		},
		enableRowNumbers: props.tableSettings?.rowNumbering,
		columnFilterDisplayMode: "custom",
		enableExpanding: props.hasSubRows,
		enableExpandAll: false,
		enableGrouping: typeof props.grouping === "object",
		groupedColumnMode: typeof props.grouping === "object" ? "remove" : undefined,
		initialState: {
			//@ts-expect-error grouping is an array of string
			grouping: props.grouping?.values ?? undefined,
			expanded: props.hasSubRows ? true : undefined,
			columnVisibility: columnsVisibility,
			density: "compact",
			sorting: defaultSort
		},
		 
		getSubRows: (row) => row[props.subRowFieldName ?? "children"],
		state: {
			sorting,
			isLoading: isLoading,
			showProgressBars: isRefetching,
		},
		enableRowVirtualization: true,
		manualFiltering: true,
    	manualSorting: true,
		onSortingChange: onSortingHandler,
		muiTableContainerProps: {
			...commonTableProps.muiTableContainerProps,
			ref: tableContainerRef,
			onScroll: (event: UIEvent<HTMLDivElement>) => fetchMoreOnBottomReached(event.target as HTMLDivElement),
		},
		muiTableBodyProps: {
			sx: {
				"& tr:nth-of-type(odd) > td": {
					backgroundColor: "grey.100",
				},
			}
		},
		rowVirtualizerInstanceRef,
		rowVirtualizerOptions: { overscan: 4 },
		enableRowActions: props.onCustomActions !== undefined && props.onCustomActions !== null,
		positionActionsColumn: "first",
		renderTopToolbarCustomActions: () => TopActionButtons,
		muiExpandButtonProps: expandButtonPropsIcon,
		displayColumnDefOptions: {
			"mrt-row-actions": {
				header: "",
				minSize: 65,
				size: props.actionColumnSize
			},
			"mrt-row-expand": {
				header: "",
				size: 1
			}
		},
		renderRowActions: ({ row }) => {
			const customOptions = props.onCustomOptions?.({ item: row.original, deleteRow: () => onRemoveRow(row)});

			const MenuEllipsisComponent = customOptions?.length > 0 ? (
				<MenuEllipsis
					options={customOptions}
					tooltip="Mas opciones"
					tooltipPlacement="top"
				/>
			) : null;

			return (
				<Box className="grid-actions" sx={{ display: "flex", gap: "4px", alignItems: "center", placeContent: "start", width: "100%" }}>
					{MenuEllipsisComponent}
					{props.onCustomActions?.({ item: row.original, deleteRow: () => onRemoveRow(row) })}
				</Box>
			);
		}
	});

	if (errorMessage) {
		return <ErrorTableDisplay errorMessage={errorMessage} height={props.maxHeight ?? props.height} />;
	}

	return (
		<MaterialReactTable table={table} />
	);
};

export default DataTable;