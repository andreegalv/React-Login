import React from "react";
import { ITableProps } from "./index.t";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { useTableDefinitions } from "./tabledef";

const Table = <T, >(props:ITableProps<T>) => {
	const { commonTableProps } = useTableDefinitions<T>({...props, enableColumnPinning: false, enableColumnOrdering: false});

	const table = useMaterialReactTable({
		...commonTableProps,
		data: props.items,
		state: {
			isLoading: props.loading
		}
	});

	return (
		<MaterialReactTable table={table} />
	);
};

export default Table;