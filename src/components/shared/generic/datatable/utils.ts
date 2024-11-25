import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { IDataTableProps } from "./index.t";
import { AxiosError } from "axios";
import { MRT_ColumnFiltersState, MRT_Row, MRT_SortingState, MRT_Updater } from "material-react-table";
import { IFilterValue, IListPageParameters } from "../../apis/interfaces";
import { IColumnBase } from "../../commons/table/index.t";
import { isArrayNotEmpty } from "src/utils/utils";
import { ColumnFilterSearchType } from "./globalFilterManagerIcon";

interface IColumnFilterState {
	id: string,
	value?: unknown,
	operator?: ColumnFilterSearchType,
}

const removeFromTree = <T>(items:T[], propertyChildrenName:string, original:T):T[] => {
	return items.filter(c => c !== original)
		.map(c => {
			if (Array.isArray(c[propertyChildrenName])) {
				return { ...c, [propertyChildrenName]: removeFromTree(c[propertyChildrenName] as T[], propertyChildrenName, original) };
			}

			return c;
		});
};

const tryToRemoveParentOrChildren = <T>(items:T[], row:MRT_Row<T>, propertyChildrenName:string):T[] => {
	if (!row.id.includes(".")) {
		return items.filter(i => i !== row.original);
	}

	return removeFromTree([...items], propertyChildrenName, row.original);
};

const createFilterTree = (filters:IColumnFilterState[], columns:IColumnBase[]):IFilterValue | null => {
	if (filters == null || filters.length <= 0) {
		return null;
	}

	const savedFilterHistory:IFilterValue[] = [];
	let previousFilterValue:IFilterValue | null = null;
	for (const filter of filters) {
		const column = columns.find(c => c.field === filter.id);

		const newFilterValue:IFilterValue = {
			field: filter.id,
			value: filter.value,
			operator: column.filterVariant === "select" ? "eq" : filter.operator ?? "contains",
			filters: []
		};

		if (!previousFilterValue) {
			savedFilterHistory.push(newFilterValue);
			previousFilterValue = newFilterValue;
		}
		else {
			previousFilterValue.filters.push(newFilterValue);
			previousFilterValue = newFilterValue;
		}
	}

	return savedFilterHistory.pop();
};

interface FetchRowsFunctionParams<T> {
	setIsRefetching: (value:boolean) => void,
	setErrorMessage: (value:string) => void,
	setHasMore: (value:boolean) => void,
	setLastLengthFetched: (value:number) => void,
	setRows: Dispatch<SetStateAction<T[]>>,
	setIsLoading: (value:boolean) => void,
	listPageAsync: (params?: IListPageParameters, options?: { controller?:string }) => Promise<T[]>,
	columns:IColumnBase[],
	columnFilters:MRT_ColumnFiltersState,
	sorting:MRT_SortingState,
	appendData?:boolean,
	totalRowsPerPage?:number,
	rowLength?: number,
	suffixController?:string,
	defaultSorting?: {field:string, dir:"asc" | "desc"}[]
}

const fetchRows = <T>({
	setIsRefetching,
	setErrorMessage,
	setHasMore,
	setLastLengthFetched,
	setRows,
	setIsLoading,
	listPageAsync,
	columns,
	columnFilters,
	sorting,
	appendData = false,
	totalRowsPerPage = 0,
	rowLength = 0,
	defaultSorting = undefined
}:FetchRowsFunctionParams<T>) => {
	setIsRefetching(true);
	setErrorMessage(undefined);
	listPageAsync({
		sort: isArrayNotEmpty(sorting) ? sorting?.map(s => ({ field: s.id, dir: s.desc ? "desc" : "asc" })) : defaultSorting,
		filter: createFilterTree(columnFilters, columns),
		limit: totalRowsPerPage,
		offset: rowLength ?? 0
	})
		.then((data:T[]) => {
			setHasMore(false);
			if (!data) {
				setHasMore(false);
				return Promise.reject("data is undefined");
			}
			else if (data.length <= 0 || (data.length < totalRowsPerPage)) {
				setHasMore(false);
			}
				
			setLastLengthFetched(data.length);
			setRows((r) => appendData ? r.concat(data) : data);
		})
		.catch((err:AxiosError<unknown>) => {
			console.error(err);
			
			setErrorMessage(err.message);
			setHasMore(false);
		})
		.finally(() => {
			setIsRefetching(false);
			setIsLoading(false);
		});
};

export const useDataSource = <T>(props:IDataTableProps<T>, totalRowsPerPage?:number, defaultSort?: {id?:string, desc?:boolean}[]) => {
	const [rows, setRows] = useState<T[]>([]);
	const isMountedRef = useRef(false);
	const defaultSortingRef = useRef(defaultSort?.map(s => ({ field: s.id, dir: s.desc ? "desc" : "asc" })) ?? []);

	const [sorting, setSortingHandler] = useState<MRT_SortingState>([]);
	const [columnFilters, setColumnFilter] = useState<IColumnFilterState[]>([]);

	const [lastLengthFetched, setLastLengthFetched] = useState<number>(-1);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isRefetching, setIsRefetching] = useState<boolean>(false);
	const [hasMore, setHasMore] = useState<boolean>(true);
	const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
	const listPageAsync = props.dataSource.endpoint;

	const { columns, subRowFieldName } = props;

	const onRemoveRow = useCallback((row:MRT_Row<T>) => {
		setRows((prevRows) => {
			return tryToRemoveParentOrChildren(prevRows, row, subRowFieldName ?? "children");
		});
	}, [subRowFieldName]);
	
	useEffect(() => {
		// @ts-expect-error IColumnFilterState sometimes is an array and in another case is not an array.
		fetchRows({ setIsRefetching, setErrorMessage, setHasMore, setLastLengthFetched, setRows, setIsLoading, listPageAsync, columns, columnFilters, sorting, totalRowsPerPage, rowLength: 0, defaultSorting: defaultSortingRef.current, appendData: false });
	}, [sorting, columnFilters]);

	const onColumnFilterHandlerCallback = useCallback((columns: IColumnFilterState[]) => {
		setColumnFilter((prev) => {
			if (prev.length === 0 && columns.length === 0) {
				return prev;
			}
			return columns;
		});
	}, [setColumnFilter]);

	const onSortingHandlerCallback = useCallback((updater: MRT_Updater<MRT_SortingState>) => {
		setSortingHandler(updater);
	}, [setSortingHandler]);

	isMountedRef.current = true;

	return { sorting, columnFilters, rows, lastLengthFetched, isLoading, isRefetching,
		hasMore, onRemoveRow, errorMessage,
		// @ts-expect-error IColumnFilterState sometimes is an array and in another case is not an array.
		onNextCallback: () => fetchRows({ setIsRefetching, setErrorMessage, setHasMore, setLastLengthFetched, setRows, setIsLoading, listPageAsync, columns, columnFilters, sorting, totalRowsPerPage, rowLength: rows.length, defaultSorting: defaultSortingRef.current, appendData: true }),
		onSortingHandler: onSortingHandlerCallback,
		onColumnFilterHandler: onColumnFilterHandlerCallback
	};
};