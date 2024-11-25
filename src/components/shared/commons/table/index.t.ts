export interface IDataItem {
    id?:string
}

export interface IColumnBase {
    headerName:string,
    field:string
    align?: "left" | "right",
    filterVariant?: "select",
    filterSelectOptions?: { label:string, value:unknown }[],
    sortable?:boolean,
    enableHiding?:boolean,
    defaultColumnVisible?:boolean,
    size?: number,
    enableColumnOrdering?:boolean,
    enableSorting?: boolean,
    columnType?: "string" | "number" | "datetime" | "date",
    defaultSort?: "asc" | "desc"
}

export type IColumnOnClickType<T> = (item:T, evt?:React.MouseEvent<HTMLButtonElement>) => void;
export interface IColumn<T> extends IColumnBase {
    onCell?: (props?:{ item?: T, renderedCell?:React.ReactNode }) => React.ReactNode,
    onClick?: IColumnOnClickType<T>
}

export interface IAbstractTableProps<T> {
    className?:string,
    columns?: IColumn<T>[],
    loading?:boolean,
    hasSubRows?:boolean,
    defaultSorting?: { name:string, dir:"asc" | "desc" }[],
    subRowFieldName?:string,
    enableColumnPinning?:boolean,
    enableColumnOrdering?: boolean,
    height: string | number,
    maxHeight?: string | number
}

export interface ITableProps<T> extends IAbstractTableProps<T> {
    items?:T[],
}