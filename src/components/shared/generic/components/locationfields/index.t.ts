import { ICountryAndCities } from "src/components/shared/commons/models/definition";

interface IAddressCommune {
    id?: string,
    description?: string,
}

export interface IAddressRegion {
    id?: string,
    description?: string,
    communes?: IAddressCommune[]
}

export interface ILocationFieldsProps {
    useCountries?: boolean,
    countries?: ICountryAndCities[],
    defaultCountryId?: string,
    defaultCountryCityId?: string,

    useRegions?: boolean,
    regions?:IAddressRegion[],
    defaultRegionId?:string,
    defaultCommuneId?:string
}