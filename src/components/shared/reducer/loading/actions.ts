import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { setBlockingLoadingScreenSuccess } from "./reduxActions";

export const useSurvey = () => {
	const dispatch = useDispatch();

	const actions = useMemo(() => ({
		setBlockingLoading: (type: "+" | "-") => {
			dispatch(setBlockingLoadingScreenSuccess(type));
		}
	}), [dispatch]);
    
	return actions;
};

type BlockLoadingScreenFunctionCallback = () => Promise<unknown>;
export const useLoadingScreen = () => {
	const { setBlockingLoading } = useSurvey();

	const setLoadingScreen = useCallback((promiseFn:BlockLoadingScreenFunctionCallback) => {
		setBlockingLoading("+");
		promiseFn().finally(() => setBlockingLoading("-"));
	}, [setBlockingLoading]);

	return { setLoadingScreen };
};