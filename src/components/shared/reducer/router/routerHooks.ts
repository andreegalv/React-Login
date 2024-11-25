import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { setReturnUrlSuccess, setUrlSuccess } from "./reduxActions";

export const DEFAULT_SAVE_HISTORY = true;

interface SetUrlOptions {
	params?: { [key:string]: unknown }
}

export const useReturnUrl = () => {
	const { returnUrl } = useSurvey();
	return returnUrl;
};


export const useSurvey = () => {
	const dispatch = useDispatch();
	const location = useLocation();

	return useMemo(() => {
		const setUrl = (url?:string, saveOnHistory = DEFAULT_SAVE_HISTORY, options?:SetUrlOptions) => {
			if (location.pathname === url) {
				return;
			}

			if (!url.startsWith("/")) {
				url = `/${url}`;
			}

			if (options?.params) {
				const { params } = options;
				Object.keys(params).forEach((key) => {
					url = url.replaceAll(`:${key}`, params[key] as string);
				});
			}
			
			dispatch(setUrlSuccess({next: url, saveOnHistory}));
		};

		return {
			returnUrl: () => {
				dispatch(setReturnUrlSuccess());
			},
			setUrl: setUrl,
			setOneTimeUrl: (url?:string) => {
				setUrl(url, false);
			}
		};
	}, [dispatch, location]);
};