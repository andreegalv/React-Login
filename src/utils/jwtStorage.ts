export const CONSTANT_JWT_TOKEN = "JWT_TOKEN";

export const deleteJwtToken = () => {
	localStorage.removeItem(CONSTANT_JWT_TOKEN);
};

export const setJwtToken = (token:string) => {
	localStorage.setItem(CONSTANT_JWT_TOKEN, token);
};

export const getJwtToken = () => {
	return localStorage.getItem(CONSTANT_JWT_TOKEN);
};