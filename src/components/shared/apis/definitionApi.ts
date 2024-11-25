import { useMemo, useRef } from "react";
import { getCommonModelEndpoints } from "./common";
import { useHttpAsync } from "./http";
import { IBank, ICountry, ICountryAndCities, ICountryCity, ICurrency, ITransport } from "../commons/models/definition";
import { IRegion } from "../commons/models/master";

export const useDefinitionApi = () => {
	const http = useHttpAsync(`${process.env.ENV_APP_CSHARP_GATEWAY_URL}/api/v1`);

	return useMemo(() => ({
		bank_endpoints: {
			...getCommonModelEndpoints({ promise: http, controller: "bank" }),
			getAsync: (bankId:string) => {
				return http<IBank>({
					client: {
						url: `Bank/${bankId}`,
						method: "get",
					}
				});
			},
			createAsync: (body?:IBank) => {
				return http({
					client: {
						url: "Bank",
						method: "post",
						body: body,
					}
				});
			},
			updateAsync: (updateHandler: { data:IBank, inputsTouched:string[] }, bankId:string) => {
				return http<IBank>({
					client: {
						url: `Bank/${bankId}`,
						method: "put",
						body: updateHandler
					}
				});
			},
			deleteAsync: (bankId:string) => {
				return http({
					client: {
						url: `Bank/${bankId}`,
						method: "delete"
					}
				});
			}
		},
		country_endpoints: {
			...getCommonModelEndpoints({ promise: http, controller: "Country" }),
			getAllCountriesAsync: () => {
				return http<ICountry[]>({
					client: {
						url: "Country",
						method: "get",
					}
				});
			},
			getAllCountryAndCitiesAsync: () => {
				return http<ICountryAndCities[]>({
					client: {
						url: "Country",
						method: "get",
						queryParams: {
							includeCities: true
						}
					}
				});
			},
			getAsync: (countryId:string) => {
				return http<ICountry>({
					client: {
						url: `Country/${countryId}`,
						method: "get",
					}
				});
			},
			createAsync: (body?:ICountry) => {
				return http<ICountry>({
					client: {
						url: "Country",
						method: "post",
						body: body,
					}
				});
			},
			updateAsync: (updateHandler: { data:ICountry, inputsTouched:string[] }, countryId:string) => {
				return http<ICountry>({
					client: {
						url: `Country/${countryId}`,
						method: "put",
						body: updateHandler
					}
				});
			},
			deleteAsync: (countryId:string) => {
				return http({
					client: {
						url: `Country/${countryId}`,
						method: "delete"
					}
				});
			}
		},
		countryCity_endpoints: {
			...getCommonModelEndpoints({ promise: http, controller: "CountryCity" }),
			getAsync: (countryId:string, id:string) => {
				return http<ICountryCity>({
					client: {
						url: `Country/${countryId}/City/${id}`,
						method: "get",
					}
				});
			},
			createAsync: (body:ICountryCity, countryId:string) => {
				return http<ICountryCity>({
					client: {
						url: `Country/${countryId}/City`,
						method: "post",
						body: body,
					}
				});
			},
			updateAsync: (updateHandler: { data:ICountryCity, inputsTouched:string[] }, countryId:string, id:string) => {
				return http<ICountryCity>({
					client: {
						url: `Country/${countryId}/City/${id}`,
						method: "put",
						body: updateHandler
					}
				});
			},
			deleteAsync: (countryId:string, countryCityId:string) => {
				return http({
					client: {
						url: `Country/${countryId}/City/${countryCityId}`,
						method: "delete"
					}
				});
			}
		},
		regions_endpoints: {
			...getCommonModelEndpoints({ promise: http, controller: "region" }),
			listRegionsAsync: () => {
				return http<IRegion[]>({
					client: {
						url: "Region",
						method: "get",
						queryParams: {
							includeCommunes: true
						}
					}
				});
			}
		},
		currency_endpoints: {
			listAsync: () => {
				return http<ICurrency[]>({
					client: {
						url: "Currency",
						method: "get",
					}
				});
			}
		},
		transport_endpoints: {
			listAsync: () => {
				return http<ITransport[]>({
					client: { url: "Transport", method: "get" }
				});
			}
		}
	}), [http]);
};

export type IDefinitionApiURL = ReturnType<typeof useDefinitionApi>;
export const useDefinitionUrl = () => {
	const { current: urls } = useRef({
		country_urls: {
			create: "general/paises/agregar/",
			update: "general/paises/modificar/:id",
			readonly: "general/paises/ver/:id"
		},
		countryCity_urls: {
			content: "general/paises-y-ciudades/",
			create: "general/ciudades/agregar/",
			update: "general/ciudades/modificar/:id",
			readonly: "general/ciudades/ver/:id"
		},
		bank_urls: {
			content: "general/bancos/",
			create: "general/bancos/agregar/",
			update: "general/bancos/modificar/:id",
			readonly: "general/bancos/ver/:id"
		}
	});

	return urls;
};