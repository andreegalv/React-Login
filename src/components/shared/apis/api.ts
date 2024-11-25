import { useMemo } from "react";
import { ICommonModelEndpoints, IEndpointApiProps } from "./interfaces";
import { useInventoryApi } from "./inventoryApi";
import { useDefinitionApi } from "./definitionApi";
import { usePurchaseApi } from "./purchaseApi";

export const useEndpointApi = (props:IEndpointApiProps):ICommonModelEndpoints => {
	const inventoryApi = useInventoryApi();
	const definitionApi = useDefinitionApi();
	const purchaseApi = usePurchaseApi();

	return useMemo(() => {
		switch(props.endpoint) {
			case "warehouse":
				return inventoryApi.warehouse_endpoints;
			case "product":
				return inventoryApi.product_endpoints;
			case "productCategory":
				return inventoryApi.productCategory_endpoints;
			case "regions":
				return definitionApi.regions_endpoints;
			case "country":
				return definitionApi.country_endpoints;
			case "countryCity":
				return definitionApi.countryCity_endpoints;
			case "bank":
				return definitionApi.bank_endpoints;
			case "purchaseOrder":
				return purchaseApi.purchaseOrder_endpoints;
			case "purchaseOrderDetail":
				return purchaseApi.purchaseOrderDetail_endpoints;

			// Fix this endpoint, UpdateAsync
			case "supplier":
				return purchaseApi.supplier_endpoints;
			default:
				return null;
		}
	}, [props.endpoint, inventoryApi, definitionApi, purchaseApi]);
};