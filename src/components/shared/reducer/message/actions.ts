import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { setSnackbarMessageSuccess } from "src/components/shared/reducer/message/reduxActions";
import { generateGUID } from "../../commons/utils/ids";

type SnackbarMessageProps = {
    message:string
}

export const useSurvey = () => {
	const dispatch = useDispatch();

	return useMemo(() => ({
		setErrorMessage: (params:SnackbarMessageProps) => {
			dispatch(setSnackbarMessageSuccess({
				id: generateGUID(),
				message: params.message,
				type: "error"
			}));
		},
		setSuccessMessage: (params:SnackbarMessageProps) => {
			dispatch(setSnackbarMessageSuccess({
				id: generateGUID(),
				message: params.message,
				type: "success"
			}));
		},
	}), [dispatch]);
};