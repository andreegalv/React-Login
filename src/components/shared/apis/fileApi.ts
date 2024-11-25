import { useAxios } from "./http";
import { useMemo } from "react";

const FILE_URL = `${process.env.ENV_APP_CSHARP_GATEWAY_URL}/gateway/file`;

export const useFileApi = () => {
	const axios = useAxios(`${FILE_URL}/api/v1`);

	return useMemo(() => ({
		file_endpoints: {
			downloadFileAsync: (id:string) => {
				return axios({
					client: {
						url: `File/Download/${id}`,
						method: "get",
						reponseType: "blob"
					}
				})
					.then((response) => {
						const disposition = response.headers["content-disposition"];
						let fileName = undefined;
						if (disposition && disposition.indexOf("attachment") !== -1) {
							const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(disposition);
							if (matches != null && matches[1]) {
								fileName = matches[1];
							}
						}

						if (!fileName) {
							return Promise.reject("Filename not found");
						}

						return Promise.resolve({
							fileName,
							data: response.data as Blob
						});
					});
			},
		}
	}), [axios]);
};