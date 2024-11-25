import { IDescription } from "./common";

export interface ICommune extends IDescription {
    id?:string
}

export interface IRegion extends IDescription {
    id?:string,
    communes?: ICommune[]
}