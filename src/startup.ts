import { setLocale } from "yup";
import { useTranslate } from "./components/shared/commons/text/translate";
import { setDayJsConfiguration } from "./components/shared/utils";

export const useStartup = () => {
	Promise.all([useYupLocalization(), useDayjsLocalization()])
		.then(() => undefined)
		.catch(() => undefined);
};

const useYupLocalization = () => {
	const [ setTranslate ] = useTranslate();

	return new Promise((resolve) => {
		setLocale({
			mixed: {
				required: setTranslate({namespace: "errors", value: "fieldRequired"}),
				default: setTranslate({namespace: "errors", value: "invalidValue"})
			},
			string: {
				min: setTranslate({namespace: "errors", value: "minValueError"}),
			},
			number: {
				moreThan: ({ more }) =>  setTranslate({ namespace: "errors", value: "moreThanValueError", interpolation: { moreThan: more } })
			}
		});
		return resolve(true);
	});
};

const useDayjsLocalization = () => {
	return new Promise((resolve) => {
		setDayJsConfiguration();
		return resolve(true);
	});
};