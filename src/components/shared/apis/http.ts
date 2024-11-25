import axios, { AxiosHeaders, AxiosInstance, RawAxiosRequestHeaders } from "axios";
import { AxiosResponse } from "axios";
import { useCallback } from "react";
import { getJwtToken } from "src/utils/jwtStorage";

export enum HttpMethod {
    GET = "get",
    POST = "post"
}

export interface IQueryParams {
	selectFields?: string[],
	ids?: unknown[],
	[key:string]: unknown
}

type QueryParams = {
    key:string,
    value:string
}

interface IConnectionOptions {
	authorization?:string,
}

export type SendAsyncParameters = {
    client:ClientOptions,
	options?:IConnectionOptions,
	unAuthorizedClient?: boolean
}

type ClientOptions = {
    url:string,
    queryParams?:IQueryParams,
    method?: "post" | "get" | "delete" | "put",
    body?:unknown,
	reponseType?: "blob" | "json",
	headers?: {
		[key:string]: string
	}
}

export type ISendAsyncImplementation = <T = unknown, R = AxiosResponse<T>>(parameters:SendAsyncParameters) => { read: Promise<R>};

export const appendQueryParams = (baseUrl:string, params:object) => {
	const urlParams:URLSearchParams = new URLSearchParams();
	let newUrl = baseUrl;

	for (const key of Object.keys(params)) {
		let value = params[key as keyof typeof params];
		if (value == null || value === undefined) {
			continue;
		}

		if (Array.isArray(value)) {
			value = (value as never[]).join(",") as never;
		}

		urlParams.append(key, value);
	}

	if (newUrl.includes("?")) {
		newUrl += `&${urlParams.toString()}`;
	}
	else {
		newUrl += `?${urlParams.toString()}`;
	}

	return newUrl;
};

function buildUrl(client:ClientOptions) {
	let urlString:string = client.url;
	if (client.queryParams) {
		const urlParams:URLSearchParams = new URLSearchParams();
		const queryParamsArray:QueryParams[] = [];

		for (const key of Object.keys(client.queryParams)) {
			const value = client.queryParams[key as keyof typeof client.queryParams];
			if (value) {
				queryParamsArray.push({
					key,
					value: Array.isArray(value) ? value.join(",") : value.toString()
				});
			}
		}

		queryParamsArray.forEach(p => urlParams.append(p.key, p.value));

		if (urlString.includes("?")) {
			urlString += `&${urlParams.toString()}`;
		}
		else {
			urlString += `?${urlParams.toString()}`;
		}
	}
	return urlString;
}

const sendAsync = <T, R = AxiosResponse<T>>(parameters:SendAsyncParameters, axiosInstance?:AxiosInstance):Promise<R> => {
	const { client } = parameters;

	const headers:RawAxiosRequestHeaders | AxiosHeaders = {};
	if (parameters.options?.authorization && !parameters.unAuthorizedClient) {
		headers["Authorization"] = parameters.options.authorization;
	}

	if (parameters.client.method === "post") {
		headers["Content-Type"] = "application/json";
	}

	const axiosApi = axiosInstance ?? axios.create();
	const url = buildUrl(client);

	if (url.startsWith("http")) {
		axiosApi.defaults.baseURL = "";
	}

	return axiosApi({
		url: url,
		method: client.method,
		data: client.body,
		headers: headers,
		responseType: client.reponseType
	});
};

const getAuthorization = () => {
	const token = getJwtToken();
	const authorization = token ? `Bearer ${token}` : undefined;
	return authorization;
};

export const useHttpAsync = (baseURL:string) => {
	const sendAsyncCallback = useCallback(<T>(parameters:SendAsyncParameters) => {
		return sendAsync<T>({ options: { authorization: getAuthorization(), ...parameters?.options }, ...parameters }, axios.create({
			baseURL: baseURL,
			timeout: (1000 * 60) * 2,
		}))
			.then((response) => {
				return response.data;
			});
	}, [baseURL]);

	return sendAsyncCallback;
};

export const useAxios = (baseURL:string) => {
	const sendAsyncCallback = useCallback(<T>(parameters:SendAsyncParameters) => {
		return sendAsync<T>({ options: { authorization: getAuthorization(), ...parameters?.options }, ...parameters }, axios.create({
			baseURL: baseURL,
			timeout: (1000 * 60) * 2,
		}));
	}, [baseURL]);

	return sendAsyncCallback;
};