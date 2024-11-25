import { useMemo, useRef } from "react";
import { getCommonModelEndpoints } from "./common";
import { useHttpAsync } from "./http";
import { IProduct, IProductCategory, IWarehouse } from "../commons/models/inventory";

export const useInventoryApi = () => {
	const http = useHttpAsync(`${process.env.ENV_APP_CSHARP_GATEWAY_URL}/api/v1`);

	return useMemo(() => ({
		warehouse_endpoints: {
			...getCommonModelEndpoints({ promise: http, controller: "Warehouse" }),
			getAsync: (warehouseId:string) => {
				return http<IWarehouse>({
					client: {
						url: `Warehouse/${warehouseId}`,
						method: "get",
					}
				});
			},
			createAsync: (body?:IWarehouse) => {
				return http<IWarehouse>({
					client: {
						url: "Warehouse",
						method: "post",
						body: body,
					}
				});
			},
			updateAsync: (updateHandler: { data:IWarehouse, inputsTouched:string[] }, warehouseId:string) => {
				return http<IWarehouse>({
					client: {
						url: `Warehouse/${warehouseId}`,
						method: "put",
						body: updateHandler
					}
				});
			},
			deleteAsync: (warehouseId:string) => {
				return http({
					client: {
						url: `Warehouse/${warehouseId}`,
						method: "delete"
					}
				});
			}
		},
		product_endpoints: {
			...getCommonModelEndpoints({ promise: http, controller: "Product" }),
			getAsync: (productId:string, selectFields?: (keyof IProduct)[]) => {
				return http<IProduct>({
					client: {
						url: `Product/${productId}`,
						method: "get",
						queryParams: {
							selectFields
						}
					}
				});
			},
			createAsync: (body?:IProduct, parentProductId?:string) => {
				return http<IProduct>({
					client: {
						url: "Product",
						method: "post",
						body: body,
						queryParams: {
							parentProductId
						}
					}
				});
			},
			updateAsync: (updateHandler: { data:IProduct, inputsTouched:string[] }, id:string) => {
				return http<IProduct>({
					client: {
						url: `Product/${id}`,
						method: "put",
						body: updateHandler
					}
				});
			},
			deleteAsync: (productId:number) => {
				return http({
					client: {
						url: `Product/${productId}`,
						method: "delete"
					}
				});
			}
		},
		productTree_endpoints: {
			...getCommonModelEndpoints({ promise: http, controller: "ProductTree" }),
		},
		productCategory_endpoints: {
			...getCommonModelEndpoints({ promise: http, controller: "ProductCategory" }),
			listAsync: (selectFields?:string[]) => {
				return http<IProductCategory[]>({
					client: {
						url: "ProductCategory",
						method: "get",
						queryParams: {
							selectFields: selectFields
						}
					}
				});
			},
			getAsync: (id:string) => {
				return http<IProductCategory>({
					client: {
						url: `ProductCategory/${id}`,
						method: "get",
					}
				});
			},
			createAsync: (body?:IProductCategory) => {
				return http<IProductCategory>({
					client: {
						url: "ProductCategory",
						method: "post",
						body: body,
					}
				});
			},
			updateAsync: (updateHandler: { data:IProductCategory, inputsTouched:string[] }, id:string) => {
				return http<IProductCategory>({
					client: {
						url: `ProductCategory/${id}`,
						method: "put",
						body: updateHandler
					}
				});
			},
			deleteAsync: (productCategoryId:number) => {
				return http({
					client: {
						url: `ProductCategory/${productCategoryId}`,
						method: "delete"
					}
				});
			}
		}
	}), [http]);
};

export type IInventoryApiURL = ReturnType<typeof useInventoryApi>;
export const useInventoryUrl = () => {
	const { current: urls } = useRef({
		warehouse_urls: {
			content: "inventario/bodegas/",
			create: "inventario/bodegas/agregar/",
			update: "inventario/bodegas/modificar/:id",
			readonly: "inventario/bodegas/ver/:id"
		},
		productCategory_urls: {
			content: "inventario/productos/categorias/",
			create: "inventario/productos/categorias/agregar/",
			update: "inventario/productos/categorias/modificar/:id",
			readonly: "inventario/productos/categorias/ver/:id"
		},
		product_urls: {
			content: "inventario/productos/",
			create: "inventario/productos/agregar/",
			update: "inventario/productos/modificar/:id",
			readonly: "inventario/productos/ver/:id"
		}
	});

	return urls;
};