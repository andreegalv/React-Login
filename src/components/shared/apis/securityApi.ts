import { IUser } from "../commons/models/user";
import { useHttpAsync } from "./http";
import { useMemo } from "react";

const SECURITY_URL = `${process.env.ENV_APP_CSHARP_GATEWAY_URL}/gateway/security`;

export const useSecurityApi = () => {
	const http = useHttpAsync(`${SECURITY_URL}/v1`);

	return useMemo(() => ({
		user_endpoints: {
			getUserProfileAsync: () => {
				return http<{name: string}>({
					client: {
						url: "User/Profile",
						method: "get"
					}
				});
			},
			confirmUserNameAsync: (username:string) => {
				return http<IUser>({
					client: {
						url: `SigIn/ConfirmUsername/${username}`
					},
					unAuthorizedClient: true
				});
			},
			userSigIn: (username:string, password:string) => {
				return http<{userId:string, token: string, isOk: boolean}>({
					client: {
						url: "SigIn",
						method: "post",
						body: {
							username,
							password
						}
					}
				});
			},
			validateToken: (token:string) => {
				return http<{userId:string}>({
					client: {
						url: "Token/Validate",
						method: "get"
					},
					options: { authorization: `Bearer ${token}` }
				});
			},
		}
	}), [http]);
};