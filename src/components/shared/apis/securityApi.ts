import { IUser } from "../commons/models/user";
import { useHttpAsync } from "./http";
import { useMemo } from "react";

const SECURITY_URL = `${process.env.ENV_APP_CSHARP_GATEWAY_URL}/gateway/security`;

export const useSecurityApi = () => {
	const http = useHttpAsync(`${SECURITY_URL}/v1`);

	return useMemo(() => ({
		user_endpoints: {
			confirmUserNameAsync: (username:string) => {
				return Promise.resolve<IUser>({
					id: "12345",
					name: "Administrador",
					username
				});
				
				/*return http<IUser>({
					client: {
						url: `SigIn/ConfirmUsername/${username}`
					},
					unAuthorizedClient: true
				});*/
			},
			userSigIn: (username:string, password:string) => {
				return Promise.resolve<{userId: string, token:string, isOk: boolean}>({
					userId: "12345",
					token: "ejYeerq.1234.test",
					isOk: true
				});

				/*return http<{userId:string, token: string, isOk: boolean}>({
					client: {
						url: "SigIn",
						method: "post",
						body: {
							username,
							password
						}
					}
				});*/
			},
		}
	}), [http]);
};