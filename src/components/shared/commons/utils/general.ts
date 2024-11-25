import { AxiosError } from "axios";
import { useRef } from "react";

export const usePrevious = <T = unknown>(value?:T) => {
	const previousRef = useRef(value);
	return previousRef.current;
};

interface IConvertedMessage {
	message?:string,
	statusCode?:number
}
export const convertAxiosError = (err:AxiosError) => {
	const convertedMessage:IConvertedMessage = {
		statusCode: err.status,
		//@ts-expect-error "data" could be a custom "errorMessage" or a .NET response message "title"
		message: err.response?.data?.errorMessage || err.response?.data?.title || err.response?.data || err.response?.statusText || err.message
	};
	return convertedMessage;
};