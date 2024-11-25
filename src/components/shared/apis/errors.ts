import { useTranslate } from "../commons/text/translate";

export const useFetchServerErrorMessage = () => {
	const [setTranslate] = useTranslate();
	return setTranslate({namespace: "errors", value: "http.fetchServerError"});
};