import { useDefinitionUrl } from "./definitionApi";
import { IEndpointApiProps, IUrlEndpoint } from "./interfaces";
import { useInventoryUrl } from "./inventoryApi";
import { usePurchaseUrl } from "./purchaseApi";

export const useUrls = (props:IEndpointApiProps):IUrlEndpoint => {
	const definitionUrl = useDefinitionUrl();
	const inventoryUrl = useInventoryUrl();
	const purchaseUrl = usePurchaseUrl();

	switch(props.endpoint){
		case "warehouse":
			return inventoryUrl.warehouse_urls;
		case "product":
			return inventoryUrl.product_urls;
		case "productCategory":
			return inventoryUrl.productCategory_urls;
		case "countryCity":
			return definitionUrl.countryCity_urls;
		case "country":
			return definitionUrl.country_urls;
		case "bank":
			return definitionUrl.bank_urls;
		case "supplier":
			return purchaseUrl.supplier_urls;
		case "purchaseOrder":
			return purchaseUrl.purchaseOrder_urls;
		case "purchaseOrderDetail":
			return purchaseUrl.purchaseOrderDetail_urls;
		default: 
			throw new Error("No endpoint found for the given props");
	}
};


export const encodeURLParams = (url:string) => {
	if (url.includes("?")) {
		const [baseUrl, params] = url.split("?");
		return `${baseUrl}?q=${btoa(params)}`;
	}

	return url;
};