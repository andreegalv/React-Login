import { IDescription } from "./common";

export enum WeightUnit {
    Kg = 0
}

export interface IWarehouse extends IDescription {
    id?:string,
    observation?:string,
    address?:string,
    regionId?:string,
    communeId?:string
}

export interface IProduct extends IDescription {
    id?:string,
    observation?:string,
    productCategoryId?:string,
    code?:string,
    type?:number,
    weightUnit?: WeightUnit,
    weight?:number,
}

export interface IProductCategory extends IDescription {
    id?:string,
}