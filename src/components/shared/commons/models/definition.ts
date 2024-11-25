import { IDescription } from "./common";

export interface ICountry extends IDescription {
    id?: string,
}

export interface ICountryAndCities extends ICountry {
    cities?: ICountryCity[],
}

export interface ICountryCity extends IDescription {
    countryId?: string,
    id?: string,
}

export interface IBank extends IDescription {
    id?: string,
    countryId?: string
}

export interface ICurrency extends IDescription {
    id?:string,
    code?:string,
    symbol?:string
}

export enum TransportType {
    Terrestrial = 1,
    Aquatic = 2
}
export interface ITransport extends IDescription {
    id?:string,
    type?: TransportType
}