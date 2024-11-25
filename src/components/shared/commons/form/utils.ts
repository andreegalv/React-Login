import dayjs from "dayjs";

const isSameDataTypes = (prev:unknown, next:unknown) => {
	return typeof prev === typeof next;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDate = (value:any) => {
	return typeof value?.getMonth === "function";
};

const isEqual = (prev:never, next:never) => {
	if (!isSameDataTypes(prev, next)) {
		return false;
	}

	if (isDate(prev)) {
		return dayjs(prev).isSame(next);
	}

	return prev === next;
};

export const isUpdateHandlerValid = <T>(handler:IUpdateFormHandler<T>) => {
	return Object.keys(handler?.data ?? {}).length > 0 && handler?.inputsTouched?.length > 0;
};

export interface IUpdateFormHandler<T> {
    data: T,
    inputsTouched: string[]
}
export const getOnlyUpdateValues = <T, K extends keyof T>(prev:T, next:T, includeProps?:K[], ignoreProps?:K[]):IUpdateFormHandler<T> => {
	const valueChangedResult:{[key:string]: unknown} = {};
	const inputsTouched:string[] = [];

	Object.keys(next).forEach((key) => {
		if (!ignoreProps || !ignoreProps.includes(key as K)) {
			if (!prev || !isEqual(prev[key] as never, next[key] as never)) {
				inputsTouched.push(key);
				valueChangedResult[key] = next[key];
			}
		}
	});

	if (includeProps?.length > 0) {
		includeProps.forEach((key) => {
			valueChangedResult[key as string] = next?.[key] || prev?.[key];
		});
	}

	return { data: valueChangedResult as T, inputsTouched };
};