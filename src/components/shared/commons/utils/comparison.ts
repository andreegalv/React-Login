import { isBoolean } from "lodash";

export const areEqualByJson = (a:unknown, b:unknown):boolean => {
	return JSON.stringify(a) === JSON.stringify(b);
};

export const isFalse = (value?:unknown) => {
	return isBoolean(value) && value === false;
};