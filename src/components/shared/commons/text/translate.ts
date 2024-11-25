import { useTranslation } from "react-i18next";
import { useCallback } from "react";

interface TranslateTextFunctionParams {
    namespace:string,
	value: string,
	interpolation?: {
		[field:string]: unknown
	}
}
export type TranslateTextFunction = (params:TranslateTextFunctionParams) => string

export const useTranslate = ():[TranslateTextFunction, string] => {
	const { i18n } = useTranslation();
	const language = "es";

	const setTranslation  = useCallback<TranslateTextFunction>((params) => {
		const interpolation = params.interpolation ? params.interpolation : {};
		if (!i18n?.t) {
			return params.value;
		}
		
		return i18n.t(params.value, { ns: params.namespace, ...interpolation });
	}, [language]);
    
	return [setTranslation, language];
};