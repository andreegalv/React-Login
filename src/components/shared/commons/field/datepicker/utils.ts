import dayjs from "dayjs";

export const useCurrentDate = () => {
	return dayjs().toDate();
};

export const ParseDate = (dateText:string):Date => {
	return dayjs(dateText).toDate();
};

export const FormatLocalDateTime = (value:string | Date, params?: { removeSameDay?: boolean}):string => {
	if (!value) {
		return "";
	}

	const dateValue = dayjs(value);
	if (params?.removeSameDay && dayjs().isSame(dateValue, "day")) {
		return dateValue.format("LT");
	}
	
	return dateValue.format("L LT");
};

export const FormatLocalDate = (value:string | Date):string => {
	if (!value) {
		return "";
	}
	
	return dayjs(value).format("L");
};

export const SubstractDate = (dateText:string):string => {
	return dateText?.split("T")?.[0];
};