import { isString as isLodashString, isObject as isLodashObject, isEqual } from "lodash";

const getPropAsString = (obj:object, propString:string):object | string | number | null | undefined => {
	if (!propString) {
		return null;
	}

	if (!propString.includes(".")) {
		return obj[propString as keyof typeof obj];
	}
  
	const props = propString.split(".");
  
	let i = 0, iLen = 0;
	for (i = 0, iLen = props.length - 1; i < iLen; i++) {
		const prop = props[i];

		const candidate = obj[prop as keyof typeof obj];
		if (candidate !== undefined) {
			obj = candidate;
		} else {
			break;
		}
	}

	return obj[props[i] as keyof typeof obj];
};

export const getValueFromStringPattern = (object:object, propFind:string) => {
	return getPropAsString(object, propFind);
};

const arePropertiesChanged = (propA:object, propB:object, keys:string[], comparisonType?: "deep" | "shallow"):boolean => {
	for (const key of keys) {
		const propAValue = getPropAsString(propA, key);
		const propBValue = getPropAsString(propB, key);

		if ((!comparisonType || comparisonType === "shallow") && propAValue !== propBValue) {
			return true;
		}

		if(comparisonType === "deep" && !isEqual(propAValue, propBValue)) {
			return true;
		}
	}

	return false;
};

interface MemoizedComponentCheckerOptions {
	include?:string[],
	ignore?:string[],
	comparisonType?: "deep" | "shallow"
}
export const memoizedComponentChecker = <T>(options?:MemoizedComponentCheckerOptions) => (prevProps:T, nextProps:T):boolean => {
	let keys:string[] = [];
	if (isArrayNotEmpty(options?.include)) {
		keys = keys.concat(options.include);
	}
	else if (isNullOrUndefined(options?.include)) {
		keys = Object.keys(nextProps);
	}

	if (isArrayNotEmpty(options?.ignore)) {
		const ignoreKeys = options.ignore.join("//");
		keys = keys.filter(k => !ignoreKeys.indexOf(k));
	}

	return !arePropertiesChanged(prevProps as object, nextProps as object, keys, options?.comparisonType);
};

export const getRandomId = (minVal:number, maxVal:number):number => {
	const randVal = minVal+(Math.random()*(maxVal-minVal));
	return Math.round(randVal);
};

export const isDebugMode = () => {
	return !process.env.NODE_ENV || process.env.NODE_ENV === "development";
};

export const isNullOrUndefined = <T>(param?:T) => {
	return param === undefined || param === null;
};

export const nameOf = <T>(name: keyof T): keyof T  => {
	return name;
};

export const setTitle = (title:string) => {
	document.title = title;
};

export const formDataToJson = (formData:FormData) => {
	const json: {[key:string]: unknown} = {};
  
	for (const [key, value] of formData.entries()) {
		json[key] = value;
	}
  
	return json;
};

export const isArrayNotEmpty = (arr?:unknown[]) => {
	return Array.isArray(arr) && arr.length > 0;
};

export const isString = (value?:unknown) => {
	return isLodashString(value);
};

export const isStringNotEmpty = (value?:unknown) => isLodashString(value) && value.length > 0; 

export const isObject = (value?:unknown) => {
	return isLodashObject(value);
};