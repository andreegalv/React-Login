export interface IName {
    name?:string
}

export interface IDescription {
    description?:string,
}

export const MODEL_MAX_LENGTH = {
	NAME: 80,
	DESCRIPTION: 100,
	ADDRESS: 80,
	PHONE: 20,
	EMAIL: 80,
	OBSERVATION: 500
};