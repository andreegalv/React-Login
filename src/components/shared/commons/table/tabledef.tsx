import React, { useMemo, useRef } from "react";
import { IAbstractTableProps, IColumnBase } from "./index.t";
import { isArrayNotEmpty } from "src/utils/utils";
import { MRT_ColumnDef } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import TableViewIcon from "../icon/tableview";
import { Link, useTheme } from "@mui/material";
import { useAppBarHeight } from "../utils/muiHelpers";
import FilterIcon from "../icon/filtericon";
import FilterRemoveIcon from "../icon/filterremoveicon";
import { useNumericStyleSx } from "../field/numeric";
import { trimObject } from "../../utils";
import { FormatLocalDate, FormatLocalDateTime } from "../field/datepicker/utils";

interface CalculateDataTableHeightHelper {
	sum?:number[]
}
export const useCalculateTableHeightHelper = (props?:CalculateDataTableHeightHelper) => {
	const theme = useTheme();

	const appBarHeight = useAppBarHeight() ?? 0;
	const toolbarEnabledHeight = parseInt(theme.spacing(7).replace("px", "")) ?? 0;
	const breadcrumbHeight = parseInt(theme.spacing(7).replace("px", "")) ?? 0;
	const tableHeaderHeight = 10;
	const otherSums = props?.sum?.reduce((partial, a) => partial + a, 0) ?? 0;
	const total = appBarHeight + breadcrumbHeight + tableHeaderHeight + toolbarEnabledHeight + otherSums;

	return `calc(100vh - ${total}px)`;
};

const getInitialColumnVisibility = (columns:IColumnBase[]) => {
	const result: { [key:string]:boolean } = {};
	columns.forEach((col) => {
		result[col.field] = col.defaultColumnVisible ?? true;
	});

	return result;
};

const alignByColumnType = (column:IColumnBase):IColumnBase["align"] => {
	if (column.columnType === "number") {
		return "right";
	}

	return "left";
};

export function useTableDefinitions<T>(props:IAbstractTableProps<T>) {
	const numericSxStyle = useNumericStyleSx();

	const columns = useMemo(() => {
		if (!isArrayNotEmpty(props.columns)) {
			return [];
		}

		return props.columns.map<MRT_ColumnDef<T>>((col) => ({
			header: col.headerName,
			enableHiding: col.enableHiding ?? true,
			enableSorting: col.enableSorting ?? true,
			enableColumnOrdering: col.enableColumnOrdering ?? true,
			accessorKey: col.field,
			filterVariant: col.filterVariant,
			filterSelectOptions: col.filterSelectOptions,
			size: col.size,
			muiTableHeadCellProps: {
				align: col.align ?? alignByColumnType(col)
			},
			muiTableBodyCellProps: {
				align: col.align ?? alignByColumnType(col),
				sx: col.columnType === "number" ? numericSxStyle : undefined
			},
			muiTableFooterCellProps: {
				align: col.align ?? alignByColumnType(col)
			},
			Cell: (cellProps) => {
				let ComponentRendered = col.onCell?.({ item: cellProps.row.original, renderedCell: cellProps.renderedCellValue}) ?? cellProps.renderedCellValue;
				if (!col.onCell) {
					if (col.columnType === "datetime" && typeof ComponentRendered === "string") {
						ComponentRendered = FormatLocalDateTime(ComponentRendered);
					}
					else if (col.columnType === "date" && typeof ComponentRendered === "string") {
						ComponentRendered = FormatLocalDate(ComponentRendered);
					}
				}

				if (col.onClick) {
					return (
						<Link color="info" component="button" onClick={(evt) => {
							col.onClick(cellProps.row.original, evt);
						}} variant="body2">
							{ComponentRendered}
						</Link>
					);
				}

				return ComponentRendered;
			},
		}));
	}, [props.columns]);

	const defaultSort = useMemo(() => {
		const columnFirstDefaultSort = props.columns.find(c => c.defaultSort);
		if (!columnFirstDefaultSort) {
			return null;
		}

		return [{ id: columnFirstDefaultSort.field, desc: columnFirstDefaultSort.defaultSort === "desc"}];
	}, []);
	
	const tableContainerProps = useRef({
		className: "table-container",
		sx: trimObject({ boxSizing: "border-box", pl: 1, pr: 1, pb:1, maxHeight: props.maxHeight, height: props.height })
	});

	const { current: columnsVisibility } = useRef(getInitialColumnVisibility(props.columns));
	const iconsRef = useRef({
		ViewColumnIcon: () => <TableViewIcon color="secondary" />,
		FilterListIcon: () => <FilterIcon />,
		FilterListOffIcon: () => <FilterRemoveIcon />
	});

	const { current: commonTableProps } = useRef({
		localization: MRT_Localization_ES,
		icons: iconsRef.current,
		columns: columns,
		enableColumnDragging: false,
		enableGlobalFilter: false,
		enableColumnOrdering: props.enableColumnOrdering ?? true,
		enableRowSelection: false,
		enableStickyHeader: true,
		enableBottomToolbar: false,
		enablePagination: false,
		enableColumnPinning: props.enableColumnPinning ?? true,
		enableFullScreenToggle: false,
		enableDensityToggle: false,
		muiTableContainerProps: tableContainerProps.current,
		muiTablePaperProps: { elevation: 0 }
	});

	return { columnsVisibility, commonTableProps, defaultSort: defaultSort };
}