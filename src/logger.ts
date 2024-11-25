import { Logger, getLogger as apiGetLogger } from "loglevel";

export interface LoggerProps {
    name:string
}

export const getLogger = (props:LoggerProps):Logger => {
	const logger = apiGetLogger(props.name);
	/*if (!isDebugMode()) {
		logger.setLevel("silent");
	}*/

	return logger;
};