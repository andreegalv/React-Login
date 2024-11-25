import { useMemo } from "react";

export const NUMERIC_LOCALES = "es-CL";

interface ILocalStringFormatOptions {
    maximumFractionDigits?: number
}
export const useLocalStringFormat = (value:number, options?:ILocalStringFormatOptions) => {
	return useMemo(() => {
		return value?.toLocaleString(NUMERIC_LOCALES, { maximumFractionDigits: options?.maximumFractionDigits ?? 2 });
	}, [value, options?.maximumFractionDigits]);
};