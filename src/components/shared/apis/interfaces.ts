import { SendAsyncParameters } from "./http";

export interface IBaseResult {
	type?: "FormResult" | "ActionResult"
}

export interface IFormControllerResult<T = unknown> extends IBaseResult {
    data?: T,
	errors?: {
		[key:string]: unknown
	}
}

export interface IFilterValue {
	field:string,
	operator?: "eq" | "contains",
	value: unknown,
	logic?: "and",
	filters?: IFilterValue[],
}

export interface ISortItem {
	field?:string,
	dir?: "asc" | "desc",
}

export interface IListPageParameters {
	sort?: ISortItem[],
	filter?: IFilterValue,
	limit?: number,
	offset?: number
}

export interface ICommonModelParameters { 
    promise:<J>(params:SendAsyncParameters) =>  Promise<J>,
    controller:string
}

export interface ICommonModelEndpoints {
	createAsync?: (body:unknown, ...ids: unknown[]) => Promise<unknown>,
	updateAsync?: (updateHandler: { data:unknown, inputsTouched:string[] }, ...ids: unknown[]) => Promise<unknown>,
	deleteAsync?: (...ids: unknown[]) => Promise<unknown>,
	getAsync?: (...ids: unknown[]) => Promise<unknown>,
	listPageAsync?: (params?:IListPageParameters, options?: { controller?:string }) => Promise<unknown[]>
}

export type EndpointName = "regions" | "warehouse" | "product" | "productCategory" | "country" | "countryCity" | "bank" | "supplier" | "purchaseOrder" | "purchaseOrderDetail";
export interface IEndpointApiProps {
    endpoint?: EndpointName
}

export interface IUrlEndpoint {
	content?:string,
	create?:string,
	update?:string,
	readonly?:string,
	[key:string]:string | undefined
}

export interface IExportDataParameters {
	columns?: string[]
}

export interface JobResponse {
	id?:string
}