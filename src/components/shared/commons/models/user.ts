import { IName } from "./common";

export interface IUser extends IName {
    id?:string,
    username?:string
}