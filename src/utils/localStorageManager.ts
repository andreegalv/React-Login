export const setLocalStorage = (name:string, value:string, global?:boolean):void => {
	const localStorageName = global ? `${getUserLocalStorage()}_${name}` : name;
	window.localStorage.setItem(localStorageName, value);
};

export const getLocalStorage = (name:string, global?:boolean): string | null => {
	const localStorageName = global ? `${getUserLocalStorage()}_${name}` : name;
	return window.localStorage.getItem(localStorageName);
};

///////////////////////////////////////////////////////////////////////////////////////////////

export const USER_LOCAL_STORAGE = "API_USER";
export const getUserLocalStorage = () => {
	return window.localStorage.getItem(USER_LOCAL_STORAGE);
};
export const setUserLocalStorage = (value:string) => {
	return window.localStorage.setItem(USER_LOCAL_STORAGE, value);
};