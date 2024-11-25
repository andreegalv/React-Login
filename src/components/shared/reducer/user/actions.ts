import { setUserLoggedSuccess, setUserProfileDataSuccess, setWebSocketConnection } from "./reduxActions";
import { setUserLocalStorage } from "src/utils/localStorageManager";
import { deleteJwtToken, setJwtToken } from "src/utils/jwtStorage";
import { useDispatch } from "react-redux";
import { useCallback, useMemo } from "react";
import { useSecurityApi } from "src/components/shared/apis/securityApi";
import { WebSocketStatus } from "./types";

const setUserTokenAndHeaderParameters = async (userId:string, token:string) => {
	setUserLocalStorage(userId);
	setJwtToken(token);
};

export const useSurvey = () => {
	const dispatch = useDispatch();

	const { user_endpoints: { userSigIn, validateToken, getUserProfileAsync } } = useSecurityApi();

	const setUserProfileData = useCallback(async () => {
		const response = await getUserProfileAsync();
		dispatch(setUserProfileDataSuccess(response));
	}, [getUserProfileAsync]);

	return useMemo(() => ({
		setUserLogged: async (username:string, password:string) => {
			const data = await userSigIn(username, password);
		
			if (!data.isOk) {
				throw new Error("Invalid credentials");
			}

			setUserTokenAndHeaderParameters(data.userId, data.token);
		
			dispatch(setUserLoggedSuccess({token: data.token}));
			await setUserProfileData();
		},
		validateTokenUser: async (token:string) => {
			const data = await validateToken(token);
				
			setUserTokenAndHeaderParameters(data.userId, token);

			dispatch(setUserLoggedSuccess({token}));
			await setUserProfileData();
		},
		setWebSocketStatus: async (status?:WebSocketStatus) => {
			dispatch(setWebSocketConnection(status));
		},
		logout: () => {
			deleteJwtToken();
			window.location.reload();
		}
	}), [dispatch, userSigIn, validateToken]);
};