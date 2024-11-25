import { IListPageParameters } from "../../apis/interfaces";
import { IMenuItemProps } from "../../commons/menuellipsis/index.t";
import { IAbstractTableProps } from "../../commons/table/index.t";
import { IDialogConfirmFunction } from "../dialogprovider/index.t";

export interface IDataSource {
    endpoint:(params?:IListPageParameters, options?: { controller?:string }) => Promise<unknown[]>,
}

export type CallbackClickEditButton<T> = (item:T, context?:{url:string}) => void;

export interface IDataTableProps<T = unknown> extends Omit<IAbstractTableProps<T>, "className"> {
    dataSource: IDataSource,
    customToolbarComponent?:React.ReactNode,
    useToolbarButtons?:("filter" | "show-columns")[]
    actionColumnSize?: number,
    onCustomOptions?: (params?: { item:T, deleteRow: () => void }) => IMenuItemProps[],
    onCustomActions?: (params?: { item:T, deleteRow: () => void }) => React.ReactNode,
    grouping?: {
        values: (keyof T)[]
    },
    tableSettings?: {
        rowNumbering?:boolean
    }
}

export interface IDataTableConfiguration {
    onDialogConfirm:IDialogConfirmFunction
}