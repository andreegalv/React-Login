import { IDescription, IName } from "./common";

export enum PurchaseOrderState {
    Draft = 1,
    InProgress = 2,
    Finished = 3
}

export enum PurchaseOrderType {
    National = 1,
    Foreign = 2
}

export interface IPurchaseOrder extends IDescription {
    projectId?:string,
    id?:string,
    issueDate?:Date,
    state?:PurchaseOrderState,
    currencyId?:string,
    maxWeightAllowed?:number,
    maxWeightUnit?:number,
    maxPriceAllowed?:number,
    observation?:string,
    supplierId?:string,
    orderNumber?:string,
    type?:PurchaseOrderType,
    transportId?:string
}

export interface IPurchaseOrderDetail {
    projectId?:string,
    purchaseOrderId?:string,
    id?:string,
    productId?:string,
    quantity?:number,
    price?:number,
    observation?:string
}

export interface ISupplierContact extends IName {
    supplierId?: string,
    id?: string,
    isPrincipal?: boolean,
    phone1?: string,
    phone2?: string,
    phone3?: string,
    email1?: string,
    email2?: string,
    email3?: string,
}

export interface ISupplier extends IDescription {
    id?: string,
    isForeign?: boolean,
    countryId?: string,
    countryCityId?: string,
    address?:string,
    observation?:string,
    contacts?: ISupplierContact[]
}

export interface ISupplierComboBoxValue extends IDescription {
    id?:string,
    countryId?:string,
    countryDescription?:string
}

export interface IPurchaseOrderDetail_DocumentOrder extends IDescription {
    issueDate?:Date,
    type?:PurchaseOrderType,
    state?:PurchaseOrderState,
    maxWeightAllowed?:number,
    maxWeightUnit?:number,
    maxPriceAllowed?:number,
    observation?:string,
    orderNumber?:string,
    supplier?: {
        description?:string,
        countryDescription?:string,
        countryCityDescription?:string
    },
    currency?: {
        description?:string,
        symbol?:string,
        code?:string
    },
    detailSummary?: {
        totalArticles?: number,
        totalWeight?: number,
        subtotal?: number
    }
}