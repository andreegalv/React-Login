import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { setContentTitleDescriptionSuccess } from "./reduxActions";

export const useSurvey = () => {
	const dispatch = useDispatch();

	const actions = useMemo(() => ({
		setContentTitle: (title?:string) => {
			dispatch(setContentTitleDescriptionSuccess({ title }));
		}
	}), [dispatch]);

	return actions;
};