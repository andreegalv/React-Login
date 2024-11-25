import { ICommonModelParameters, IListPageParameters } from "./interfaces";

export const getCommonModelEndpoints = ({ promise, controller }:ICommonModelParameters) => {
	return {
		listPageAsync: <T>(params?:IListPageParameters, options?:{ controller?:string }) => {
			const useDefaultRoute = !options?.controller;
			let url:string = `${controller}/ListPage`;
			if (!useDefaultRoute) {
				url = options?.controller?.replace(":default", "ListPage");
			}

			return promise<T[]>({
				client: {
					url,
					method: "post",
					body: {
						filter: params.filter,
						sort: params.sort,
						limit: params.limit,
						offset: params.offset
					},
				}
			});
		}
	};
};