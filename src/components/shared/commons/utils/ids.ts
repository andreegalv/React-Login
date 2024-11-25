import { useRef } from "react";
import { getRandomId } from "src/utils/utils";

export const useIdRef = (props?: { id?: string }) => {
	const idRef = useRef(`${props?.id ?? "iid-" + getRandomId(10000, 99999)}`);
	return idRef;
};

export const useId = (props?: { value?: string, prefix?: string }) => {
	const id = props?.value ?? props?.prefix ? `${props.prefix}-${getRandomId(111,999)}` : `:rn-${getRandomId(111,999)}`;
	const ref = useRef(id);
	return ref.current;
};

export const generateGUID = () => {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
	  const r = (Math.random() * 16) | 0,
			v = c === "x" ? r : (r & 0x3) | 0x8;
	  return v.toString(16);
	});
};