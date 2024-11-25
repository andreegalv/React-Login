import { useMemo, useRef } from "react";
import { getCommonModelEndpoints } from "./common";
import { useHttpAsync } from "./http";
import { IPurchaseOrder, IPurchaseOrderDetail, IPurchaseOrderDetail_DocumentOrder, ISupplier, ISupplierComboBoxValue, ISupplierContact } from "../commons/models/purchase";
import { IExportDataParameters, JobResponse } from "./interfaces";

export const usePurchaseApi = () => {
	const http = useHttpAsync(`${process.env.ENV_APP_CSHARP_GATEWAY_URL}/api/v1`);

	return useMemo(() => ({
		supplier_endpoints: {
			...getCommonModelEndpoints({ promise: http, controller: "Supplier" }),
			getAsync: (supplierId:string, includeContacts?:boolean) => {
				return http<ISupplier>({
					client: {
						url: `Supplier/${supplierId}`,
						method: "get",
						queryParams: {
							includeContacts: includeContacts ? true : undefined
						}
					}
				});
			},
			createAsync: (body?:ISupplier) => {
				return http<ISupplier>({
					client: {
						url: "Supplier",
						method: "post",
						body: body,
					}
				});
			},
			updateAsync: (updateHandler: { 
				supplierHandler: { data:ISupplier, inputsTouched:string[], isBeingDeleted?:boolean },
				contactHandlers: { data:ISupplierContact, inputsTouched:string[], isBeingDeleted?:boolean }[]
			 }, id:string) => {
				return http<ISupplier>({
					client: {
						url: `Supplier/${id}`,
						method: "put",
						body: updateHandler
					}
				});
			},
			deleteAsync: (supplierId:string) => {
				return http({
					client: {
						url: `Supplier/${supplierId}`,
						method: "delete"
					}
				});
			},
			comboBoxOptionsSelector: () => {
				return http<ISupplierComboBoxValue[]>({
					client: {
						url: "Supplier/ComboBoxOptionsSelector",
						method: "get"
					}
				});
			},
			exportDataAsync: (params?:IExportDataParameters) => {
				return http<JobResponse>({
					client: {
						url: "Supplier/ExportData",
						method: "post",
						body: params ?? {}
					}
				});
			}
		},
		purchaseOrder_endpoints: {
			...getCommonModelEndpoints({ promise: http, controller: "PurchaseOrder" }),
			getAsync: (id:string) => {
				return http<IPurchaseOrder>({
					client: {
						url: `PurchaseOrder/${id}`,
						method: "get"
					}
				});
			},
			createAsync: (body?:IPurchaseOrder) => {
				return http<IPurchaseOrder>({
					client: {
						url: "PurchaseOrder",
						method: "post",
						body: body,
					}
				});
			},
			updateAsync: (updateHandler: { data:IPurchaseOrder, inputsTouched:string[] }, id:string) => {
				return http<IPurchaseOrder>({
					client: {
						url: `PurchaseOrder/${id}`,
						method: "put",
						body: updateHandler
					}
				});
			},
			deleteAsync: (id:string) => {
				return http({
					client: {
						url: `PurchaseOrder/${id}`,
						method: "delete"
					}
				});
			},
			exportDataAsync: (params?:IExportDataParameters) => {
				return http<JobResponse>({
					client: {
						url: "PurchaseOrder/ExportData",
						method: "post",
						body: params ?? {}
					}
				});
			}
		},
		purchaseOrderDetail_endpoints: {
			...getCommonModelEndpoints({ promise: http, controller: "PurchaseOrderDetail" }),
			getAsync: (purchaseOrderId:string, id:string) => {
				return http<IPurchaseOrderDetail>({
					client: {
						url: `PurchaseOrder/${purchaseOrderId}/Detail/${id}`,
						method: "get"
					}
				});
			},
			createAsync: (purchaseOrderId:string, body:IPurchaseOrderDetail) => {
				return http<IPurchaseOrderDetail>({
					client: {
						url: `PurchaseOrder/${purchaseOrderId}/Detail`,
						method: "post",
						body: body,
					}
				});
			},
			updateAsync: (updateHandler: { data:IPurchaseOrder, inputsTouched:string[] }, purchaseOrderId:string, id:string) => {
				return http<IPurchaseOrderDetail>({
					client: {
						url: `PurchaseOrder/${purchaseOrderId}/Detail/${id}`,
						method: "put",
						body: updateHandler
					}
				});
			},
			deleteAsync: (purchaseOrderId:string, id:string) => {
				return http({
					client: {
						url: `PurchaseOrder/${purchaseOrderId}/Detail/${id}`,
						method: "delete"
					}
				});
			},
			getOrderDocument: (purchaseOrderId:string) => {
				return http<IPurchaseOrderDetail_DocumentOrder>({
					client: { 
						url: `PurchaseOrder/${purchaseOrderId}/Detail/OrderDocument`,
						method: "get"
					}
				});
			}
		}
	}), [http]);
};

export type IPurchaseApiURL = ReturnType<typeof usePurchaseApi>;
export const usePurchaseUrl = () => {
	const { current: urls } = useRef({
		supplier_urls: {
			content: "compras/proveedores/",
			create: "compras/proveedores/agregar/",
			update: "compras/proveedores/modificar/:id",
			readonly: "compras/proveedores/ver/:id"
		},
		purchaseOrder_urls: {
			content: "compras/ordenes/",
			create: "compras/ordenes/agregar/",
			update: "compras/ordenes/modificar/:id",
			readonly: "compras/ordenes/ver/:id"
		},
		purchaseOrderDetail_urls: {
			content: "compras/ordenes/:purchaseOrderId/detalle/",
			create: "compras/ordenes/:purchaseOrderId/detalle/agregar/",
			update: "compras/ordenes/:purchaseOrderId/detalle/modificar/:id",
			readonly: "compras/ordenes/:purchaseOrderId/detalle/ver/:id"
		}
	});

	return urls;
};