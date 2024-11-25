import { useHttpAsync } from "./http";
import { useMemo } from "react";

export const useTenantApi = () => {
	const baseUrl = `${process.env.ENV_APP_CSHARP_GATEWAY_URL}/api/v1`;
	const http = useHttpAsync(baseUrl);

	return useMemo(() => ({
		project_endpoints: {
			listAsync: () => {
				return http<{name: string}>({
					client: {
						url: "Project",
						method: "get"
					}
				});
			},
			getAsync: (id:string) => {
				return http<{name: string}>({
					client: {
						url: `Project/${id}`,
						method: "get"
					}
				});
			},
		}
	}), [http]);
};